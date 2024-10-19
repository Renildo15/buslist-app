import React from "react";
import { Text } from "@/components/Themed";
import { styles } from './styles';

interface IAuthErrors {
    error: string
}

export default function AuthErrors({ error }: IAuthErrors) {
    return (
        error ? <Text style={styles.errorText}>{error}</Text> : null
    )
}