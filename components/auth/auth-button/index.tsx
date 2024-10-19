import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import { Text } from '@/components/Themed';

interface AuthButtonProps extends TouchableOpacityProps {
  label: string;
}

export default function AuthButton(props: AuthButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} {...props}>
      <Text style={styles.buttonLabel}>{props.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
