import { TextInput, StyleSheet, TextInputProps, TouchableOpacity, KeyboardTypeOptions } from "react-native";
import React, {useState} from "react";
import Feather from '@expo/vector-icons/Feather';
import { View } from "@/components/Themed";

interface IInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

export default function Input(props: IInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
   <View style={styles.container}>
    <TextInput
      style={styles.input}
      { ...props}
      secureTextEntry={props.secureTextEntry && !isPasswordVisible}
      
    />
    {props.secureTextEntry && (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
            <Feather name={isPasswordVisible ? "eye-off" : "eye"} size={24} />
        </TouchableOpacity>
    )}
   </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
    },
    input: {
      flex: 1,
      height: 50,
    },
    icon: {
      marginLeft: 8,
    },
  });