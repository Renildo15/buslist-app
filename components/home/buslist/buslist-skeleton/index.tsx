import { View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import React from 'react';


export default function BusListSkeleton() {
  return (
    <View style={styles.container}> 
      <View style={styles.placeholder} /> 
      <View style={styles.placeholder} /> 
      <View style={styles.placeholder} />
    </View> 
  );
}

  
const styles = StyleSheet.create({ 
  container: { 
    borderRadius: 13, 
    width: '100%'
  }, 
  placeholder: { 
    backgroundColor: '#ccc', 
    height: 190, 
    borderRadius: 20, 
    marginBottom: 8, 
  }
}); 
