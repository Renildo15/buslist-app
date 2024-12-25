import HeaderInfo from '@/components/header-info';
import Avatar from '@/components/home/avatar';
import { useSession } from '@/context/AuthContext';
import { router } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TabSettings() {
  const { signOut, whoAmI } = useSession();
  const currentUser = whoAmI();

  const handleLogout = () => {
    signOut();
    router.replace('/(auth)');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header_content}>
        <Text style={styles.header_text}>Configurações</Text>
        <HeaderInfo 
          user={currentUser} 
          avatarUri={currentUser?.profile?.avatar ?? ''} 
          iconIsVisible={false}
        />
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  header_content: {
    flexDirection:'column',
    width: '100%',
    padding: 16,
  },
  header_text: { fontSize: 18, fontWeight: 'bold' },
});
