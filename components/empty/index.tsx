import React from 'react';
import { Image } from 'react-native';
import { View, Text } from 'react-native';
import { styles } from './styles';


interface IError {
  message: string;
}

export default function Empty({ message }: IError) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/empty.png')}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
