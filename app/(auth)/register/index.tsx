import React, { useState, useEffect } from 'react';
import ImagePattern from '@/components/auth/image-pattern';
import { View, Text } from '@/components/Themed';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import Input from '@/components/auth/input';
import AuthButton from '@/components/auth/auth-button';
import { useSession } from '@/context/AuthContext';
import AuthErrors from '@/components/errors/auth-erros';
import { validateField, splitName } from '@/utils';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const { student, studentRegister } = useSession();

  const validateForm = () => {
    const newErrors = {
      username: validateField('username', username),
      email: validateField('email', email),
      firstName: validateField('firstName', firstName),
      lastName: validateField(lastName, 'lastName'),
      password: validateField('senha', password),
      confirmPassword: validateField('confirmação de senha', confirmPassword),
    };
    console.log(newErrors);
    if (password.length < 8) {
      newErrors.password = 'A senha deve ter no mínimo 8 caracteres';
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'As senhas não conferem';
    }

    setErrors(newErrors);

    // Verifica se todos os campos estão sem erro
    return Object.values(newErrors).every((error) => !error);
  };

  useEffect(() => {
    if (student) {
      const { firstName, lastName } = splitName(student.name_student);
      setFirstName(firstName);
      setLastName(lastName);
    }
  }, [student]);

  const handleRegister = () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      studentRegister(
        {
          username,
          email,
          first_name: firstName,
          last_name: lastName,
          password,
        },
        student.matriculation_student
      );
    } catch (error) {
      console.error('Register error:', error);
      alert('Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
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

        <View style={{ backgroundColor: 'transparent' }}>
          <AuthErrors error={errors.username} />
          <Input
            placeholder="Usuário"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={{ backgroundColor: 'transparent' }}>
          <AuthErrors error={errors.email} />
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            inputMode="email"
          />
        </View>

        <View style={{ backgroundColor: 'transparent' }}>
          <AuthErrors error={errors.firstName} />
          <Input
            placeholder="Nome"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={{ backgroundColor: 'transparent' }}>
          <AuthErrors error={errors.lastName} />
          <Input
            placeholder="Sobrenome"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={{ backgroundColor: 'transparent' }}>
          <AuthErrors error={errors.password} />
          <Input
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={{ backgroundColor: 'transparent' }}>
          <AuthErrors error={errors.confirmPassword} />
          <Input
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <AuthButton label="Cadastrar" onPress={handleRegister} />
        )}
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
    marginBottom: 40,
    borderRadius: 50,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
