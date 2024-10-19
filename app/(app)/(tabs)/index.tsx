import { useSession } from '@/context/AuthContext';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function TabHome() {
    const { signOut, user } = useSession();

    const handleLogout = () => {
        signOut();
        router.replace('/(auth)');
    }

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
