import React, { useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { IUser, IUserStudentCreate, IUserStudentInfo } from "@/api/interfaces/user";
import { getStudentInfo, login, register } from "@/api/api";
import { useStorageState } from "@/hooks/useStorageState";
import Toast from "react-native-toast-message";

const AuthContext = React.createContext<{
    signIn: (username: string, password:string) => void;
    whoAmI: () => void;
    signOut: () => void;
    studentInfo: (matric : string) => void;
    studentRegister: (student: IUserStudentCreate) => void;
    session?: string | null;
    isLoading: boolean;
    user: IUser
    student: IUserStudentInfo
}>({
    signIn: (username: string, password:string) => null,
    whoAmI: () => null,
    signOut: () => null,
    studentInfo: (matric : string) => null,
    studentRegister: (student: IUserStudentCreate) => null,
    session: null,
    isLoading: false,
    user: {} as IUser,
    student: {} as IUserStudentInfo
    
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");
    const [user, setUser] = useState<IUser>({} as IUser);
    const [userStudentInfo, setUserStudentInfo] = useState<IUserStudentInfo>({} as IUserStudentInfo);
    return (
        <AuthContext.Provider
            value={{
                signIn: async (username: string, password: string) => {
                    try {
                        console.info(`Login: ${username}`);
                        const { access, user } = await login(username, password);
                        await SecureStore.setItemAsync("session", access); 
                        setSession(access);
                        setUser(user);
                        console.log(`Session set: ${access}`);
                    } catch (error: any) {
                        console.error("Login error:", error);
                        const errors = error.response.data
                        let  errorMessage = '';
                        if(errors.username){
                            errorMessage += `Usuário: ${errors.username.join(', ')}\n`;
                        }
                        
                        if(errors.password){
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
                    setUser({} as IUser);
                },
                whoAmI: async () => {},
                studentInfo: async (matric: string) => {
                    console.info(`Searching for student: ${matric}`);
                    try {
                        const student = await getStudentInfo(matric);
                        setUserStudentInfo(student);
                        console.log(JSON.stringify(student));
                    } catch (error) {
                        console.error("Student info error:", error);
                    }
                },
                studentRegister: async (student: IUserStudentCreate) => {
                    console.info(`Registering student: ${student.username}`);
                    try {
                      const { access_token } = await register(student);
                      await SecureStore.setItemAsync("session", access_token); 
                      setSession(access_token);
                    } catch (error) {
                        console.error("Register error:", error);
                    }
                },
                session,
                isLoading,
                user,
                student: userStudentInfo
            }}
        >
        {props.children}
        </AuthContext.Provider>
    );
}