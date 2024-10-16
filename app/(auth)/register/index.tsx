import React, { useState, useEffect } from 'react';
import ImagePattern from "@/components/auth/image-pattern";
import { View, Text } from "@/components/Themed";
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import Input from '@/components/auth/input';
import AuthButton from '@/components/auth/auth-button';
import { useSession } from '@/context/AuthContext';
import { splitName } from '@/utils/splitName';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const { student, studentRegister } = useSession();

    useEffect(() => {
      if(student){
        const {firstName, lastName} = splitName(student.name_student);
        setFirstName(firstName);
        setLastName(lastName);
      }
    }, [student]);
    
    const handleRegister = async () => {
      if(password !== confirmPassword){
        alert('As senhas não conferem');
        return;
      }
      try {
        setIsLoading(true);
        await studentRegister({
          username,
          email,
          first_name: firstName,
          last_name: lastName,
          password
        });
      } catch (error) {
        console.error('Register error:', error);
        alert('Erro ao criar conta');
      } finally {
        setIsLoading(false);
      }
    }

    return (
      <ImagePattern>
        <View style={styles.container}>
          <View
            style={styles.imageContainer}
          >
            <Image
               source={require('../../../assets/images/logo.png')}
              style={styles.image}
            />
          </View>
          <Input
            placeholder="Usuário"
            value={username}
            onChangeText={setUsername}
          />
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                inputMode='email'
            />

            <Input
                placeholder="Nome"
                value={firstName}
                onChangeText={setFirstName}
            />
            <Input
                placeholder="Sobrenome"
                value={lastName}
                onChangeText={setLastName}
            />
            <Input
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Input
                placeholder="Confirme a senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            { isLoading ? (
                <ActivityIndicator/>
            ): (
                <AuthButton 
                  label='Cadastrar'
                  onPress={handleRegister}
                />
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
    title: {
      fontSize: 32,
      marginBottom: 24,
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 16,
      backgroundColor: '#fff',
    },
  
   
  
    imageContainer: {
      marginBottom: 40,
      borderRadius: 50,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50, // Torna a imagem circular
    },
  
    textRegister: {
      marginTop: 16,
      color: '#333',
    },
  
    linkRegister: {
      color: '#007bff',
      fontSize: 16,
      fontWeight: 'bold',
    }
  });
  