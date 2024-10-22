import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  IUser,
  IUserStudent,
  IUserStudentCreate,
  IUserStudentInfo,
} from '@/api/interfaces/user';
import { getStudentInfo, login, register, useWhoAmI } from '@/api/api';
import { useStorageState } from '@/hooks/useStorageState';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

const AuthContext = React.createContext<{
  signIn: (username: string, password: string) => void;
  whoAmI: () => IUserStudent | undefined;
  signOut: () => void;
  studentInfo: (matric: string) => void;
  studentRegister: (student: IUserStudentCreate, matric: string) => void;
  session?: string | null;
  isLoading: boolean;
  user: IUserStudent | undefined;
  student: IUserStudentInfo;
}>({
  signIn: (username: string, password: string) => null,
  whoAmI: () => undefined,
  signOut: () => null,
  studentInfo: (matric: string) => null,
  studentRegister: (student: IUserStudentCreate) => null,
  session: null,
  isLoading: false,
  user: {} as IUserStudent | undefined,
  student: {} as IUserStudentInfo,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [user, setUser] = useState<IUserStudent>();
  const [userStudentInfo, setUserStudentInfo] = useState<IUserStudentInfo>(
    {} as IUserStudentInfo
  );
  return (
    <AuthContext.Provider
      value={{
        signIn: async (username: string, password: string) => {
          try {
            console.info(`Login: ${username}`);
            const { access } = await login(username, password);
            await SecureStore.setItemAsync('session', access);
            setSession(access);
            console.log(`Session set: ${access}`);
          } catch (error: any) {
            console.error('Login error:', error);
            const errors = error.response.data;
            let errorMessage = '';
            if (errors.username) {
              errorMessage += `Usuário: ${errors.username.join(', ')}\n`;
            }

            if (errors.password) {
              errorMessage += `Senha: ${errors.password.join(', ')}\n`;
            }

            Toast.show({
              type: 'error',
              text1: 'Erro ao entrar',
              text2: errorMessage,
              position: 'top',
            });
          }
        },
        signOut: () => {
          setSession(null);
          setUser({} as IUserStudent);
        },
        whoAmI: () => {
          console.info('Checking user session');
          try {
            const { data } = useWhoAmI(session ?? null);
            setUser(data?.user);

            return data?.user;
          } catch (error: any) {
            console.error('WhoAmI error:', error);
            setSession(null);
          }
        },
        studentInfo: async (matric: string) => {
          console.info(`Searching for student: ${matric}`);
          try {
            const student = await getStudentInfo(matric);
            setUserStudentInfo(student);
            router.push('/(auth)/register');
          } catch (error: any) {
            console.debug('Student info error:', error);
            Toast.show({
              type: 'error',
              text1: 'Erro ao buscar estudante',
              text2: error.response.data.error,
              position: 'top',
            });
          }
        },
        studentRegister: async (
          student: IUserStudentCreate,
          matric: string
        ) => {
          console.info(`Registering student: ${student.username}`);
          try {
            const { access_token } = await register(student, matric);
            await SecureStore.setItemAsync('session', access_token);
            setSession(access_token);
          } catch (error: any) {
            console.error('Register error:', error);

            Toast.show({
              type: 'error',
              text1: 'Erro ao criar conta',
              text2: error.response.data.error,
              position: 'top',
            });
          }
        },
        session,
        isLoading,
        user,
        student: userStudentInfo,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
