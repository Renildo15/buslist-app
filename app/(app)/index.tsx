import { View, Text } from "@/components/Themed";
import { Link } from "expo-router";
import React from "react";

export default function Home() {
    return (
        <View>
            <Text>Home</Text>
            <Link href="/(auth)">
                <Text>Auth</Text>
            </Link>
        </View>
    )
}