import { useSession } from '@/context/AuthContext';
import { router } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TabSettings() {
  const { signOut } = useSession();
  const handleLogout = () => {
    signOut();
    router.replace('/(auth)');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
