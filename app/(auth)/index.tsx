import { StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';
import Input from '@/components/auth/input';
import ImagePattern from '@/components/auth/image-pattern';
import { Link } from 'expo-router';
import AuthButton from '@/components/auth/auth-button';
import { StatusBar } from 'expo-status-bar';
import { useSession } from '@/context/AuthContext';
import AuthErrors from '@/components/errors/auth-erros';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({username: '', password: ''});

  const {signIn} = useSession();

  const validateForm = () => {
    let valid = true;
    const newErrors = {username: '', password: ''};

    if (!username.trim()) {
      newErrors.username = 'Informe o usuário';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Informe a senha';
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = 'A senha deve ter no mínimo 8 caracteres';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  const handleLogin = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    signIn(username, password);
    setIsLoading(false);

    setUsername('');
    setPassword('');
  
  }

  return (
    <>
    <StatusBar backgroundColor='#007bff'/>
      <ImagePattern>
        <View style={styles.container}>
          <View
            style={styles.imageContainer}
          >
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.image}
            />
          </View>
          <View
            style={{backgroundColor:'transparent'}}
          >
            <AuthErrors error={errors.username}/>
            <Input
              placeholder="Usuário"
              value={username}
              onChangeText={setUsername}
              hasError={!!errors.username}
            />
          </View>
          
          <View
            style={{backgroundColor:'transparent'}}
          >
            <AuthErrors error={errors.password}/>
            <Input
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              hasError={!!errors.password}
            />
          </View>
         
          { isLoading ? (
            <ActivityIndicator/>
          ): (
            <AuthButton 
              label='Entrar'
              onPress={handleLogin}
            />
          )}
          <Text style={styles.textRegister}>
            Não tem uma conta?
          </Text>
          <TouchableOpacity>
            <Link href="/matric">
              <Text style={styles.linkRegister}>
                Cadastre-se
              </Text>
            </Link>
          </TouchableOpacity>
        </View>
      </ImagePattern>
    </>
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
  },
});
