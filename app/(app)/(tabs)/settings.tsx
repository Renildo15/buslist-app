import HeaderInfo from '@/components/header-info';
import OptionSettings from '@/components/settings/optionSettings';
import { useSession } from '@/context/AuthContext';
import { router } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function TabSettings() {
  const { signOut, whoAmI } = useSession();
  const currentUser = whoAmI();

  const handleLogout = () => {
    signOut();
    router.replace('/(auth)');
  };

  const options = [
    {
      handle: () => {},
      iconName: 'whatsapp',
      text: 'Grupos do whatsapp',
    },
    {
      handle: () => {},
      iconName: 'book',
      text: 'Temas',
    },
    {
      handle: () => {},
      iconName: 'bell',
      text: 'Notificações',
    },
    {
      handle: handleLogout,
      iconName: 'sign-out',
      text: 'Sair',
    },
  ]

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
       {/* TODO: Criar uma lista de opções de configurações */}
      {options.map((option, index) => (
        <OptionSettings 
          key={index} 
          handle={option.handle} 
          iconName={option.iconName} 
          text={option.text} 
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header_content: {
    flexDirection:'column',
    width: '100%',
    padding: 16,
  },
  header_text: { fontSize: 18, fontWeight: 'bold' },
});
