import React from "react"

import { Redirect, Stack } from "expo-router"
import { useSession } from "@/context/AuthContext"

export default function AppRootLayout() {
    const { user } = useSession();

    if (user === null) {
        console.info("User is not authenticated, redirecting to auth");
        return <Redirect href="/(auth)" />;
    }
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} /> 
        </Stack>
    )
}