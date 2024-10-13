import React, { useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { IUser } from "@/api/interfaces/user";
import { login } from "@/api/api";
import { useStorageState } from "@/hooks/useStorageState";

const AuthContext = React.createContext<{
    signIn: (username: string, password:string) => void;
    whoAmI: () => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
    user: IUser
}>({
    signIn: (username: string, password:string) => null,
    whoAmI: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
    user: {} as IUser
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");
    const [user, setUser] = useState<IUser>({} as IUser);
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
                    } catch (error) {
                    console.error("Login error:", error);
                    }
                },
                signOut: () => {
                    setSession(null);
                    setUser({} as IUser);
                },
                whoAmI: async () => {},
                session,
                isLoading,
                user
            }}
        >
        {props.children}
        </AuthContext.Provider>
    );
}