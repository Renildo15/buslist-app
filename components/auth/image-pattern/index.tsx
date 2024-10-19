import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

interface ImagePatternProps {
  children: React.ReactNode;
}

export default function ImagePattern(props: ImagePatternProps) {
  return (
    <ImageBackground
      source={require('../../../assets/images/pattern.jpg')}
      style={styles.background}
    >
      {props.children}
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});
