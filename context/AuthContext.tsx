import React, { useContext, useState } from "react";
import { createContext } from "react";
import * as SecureStore from "expo-secure-store";
import { IUser } from "@/api/interfaces/user";
import { login } from "@/api/api";

interface IAuthContextProps {
    userToken: string | null;
    logout: () => void;
    authenticateUser: (username: string, password: string) => Promise<void>;
    setUserInfo:(user: IUser | null) => void;
    user: IUser | null;
    isLoading: boolean;
}

const AuthContext = createContext<IAuthContextProps | null>(null);

export function useSession() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useSession must be used within a AuthProvider");
    }
    return context;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<IUser | null>(null);

    const logout = async () => {
        await SecureStore.deleteItemAsync("userToken");
        setUserToken(null);
    };

    const authenticateUser = async (username: string, password: string) => {
        try {
            setIsLoading(true);
            const data = await login(username, password);
 
            setUserToken(data.access);
            setUserInfo(data.user);

            await SecureStore.setItemAsync("userToken", data.access);
            await SecureStore.setItemAsync("refreshToken", data.refresh);
        } catch (error) {
            console.error(`Error: ${error}`);
            setUserInfo(null);
            setUserToken(null);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
     }

    return (
        <AuthContext.Provider value={{ userToken, logout, authenticateUser, setUserInfo, user: userInfo, isLoading: isLoading }}>
            {props.children}
        </AuthContext.Provider>
    );
        
}

