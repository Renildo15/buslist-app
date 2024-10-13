import { View, Text } from "@/components/Themed";
import { useSession } from "@/context/AuthContext";
import { TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function Home() {
    const { signOut, user } = useSession();

    const handleLogout = () => {
        signOut();
        router.replace('/(auth)');
    }

    return (
        <View>
            <Text>Home - {user.username}</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}