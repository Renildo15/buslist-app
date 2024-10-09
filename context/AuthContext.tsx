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
}

export const AuthContext = createContext<IAuthContextProps>({
    userToken: null,
    logout: () => {},
    authenticateUser: async () => {},
    setUserInfo: () => {},
    user: null,
})

interface IAuthProviderProps {
    children: React.ReactNode;
    userTokenState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
    userInfoState: [IUser | null, React.Dispatch<React.SetStateAction<IUser | null>>];
}

export const AuthProvider = (props: IAuthProviderProps) => {
    const [userToken, setUserToken] = props.userTokenState;
    const [userInfo, setUserInfo] = props.userInfoState;

    const logout = async () => {
        setUserToken(null);
        await SecureStore.deleteItemAsync("userToken");
    }

    const authenticateUser = async (username: string, password: string) => {
       const data = await login(username, password);

       setUserToken(data.access);
       setUserInfo(data.user);

       await SecureStore.setItemAsync("userToken", data.access);
       await SecureStore.setItemAsync("refreshToken", data.refresh);
    }


    return (
        <AuthContext.Provider value={{ userToken, logout, authenticateUser, setUserInfo, user: userInfo }}>
            {props.children}
        </AuthContext.Provider>
    )
}