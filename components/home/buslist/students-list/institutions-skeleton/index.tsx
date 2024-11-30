import { View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import React from 'react';


export default function InstitutionSkeleton() {
  return (
    <View style={styles.container}> 
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
    height: 50, 
    borderRadius: 4, 
    marginBottom: 8, 
  }
}); 
