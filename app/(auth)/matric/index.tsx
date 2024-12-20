import React, { useState } from 'react';
import ImagePattern from '@/components/auth/image-pattern';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { View, Text } from '@/components/Themed';
import Input from '@/components/auth/input';
import AuthButton from '@/components/auth/auth-button';
import { Link } from 'expo-router';
import { useSession } from '@/context/AuthContext';
import AuthErrors from '@/components/errors/auth-erros';

export default function Matric() {
  const [matric, setMatric] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { studentInfo } = useSession();
  const [errors, setErrors] = useState({ matric: '' });

  const validateForm = () => {
    let valid = true;
    const newErrors = { matric: '' };

    if (!matric.trim()) {
      newErrors.matric = 'Informe a matrícula';
      valid = false;
    } else if (matric.length < 11) {
      newErrors.matric = 'A matrícula deve ter 11 caracteres';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const search = () => {
    if (!validateForm()) return;

    setIsSearching(true);
    studentInfo(matric);
    setIsSearching(false);
  };

  return (
    <ImagePattern>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.message}>
          Para confirmar que você é um estudante universitário, por favor,
          insira o número de matrícula.
        </Text>
        <View style={{ backgroundColor: 'transparent' }}>
          <AuthErrors error={errors.matric} />
          <Input
            placeholder="Matrícula"
            value={matric}
            onChangeText={setMatric}
            keyboardType="numeric"
            hasError={!!errors.matric}
            maxLength={11}
          />
        </View>
        {isSearching ? (
          <ActivityIndicator />
        ) : (
          <AuthButton label="Confirmar" onPress={search} />
        )}

        <TouchableOpacity style={styles.registerContainer}>
          <Text style={styles.textRegister}>Já tem uma conta?</Text>
          <Link href="/">
            <Text style={styles.linkRegister}>Faça login</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </ImagePattern>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 50,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Torna a imagem circular
  },
  message: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textRegister: {
    color: '#333',
    textAlign: 'center',
  },
  linkRegister: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
