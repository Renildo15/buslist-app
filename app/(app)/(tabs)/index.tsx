import { useSession } from '@/context/AuthContext';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { styles } from './styles';
import Header from '@/components/home/header';

export default function TabHome() {
    const { signOut } = useSession();
    const handleLogout = () => {
        signOut();
        router.replace('/(auth)');
    }

    return (
        <View style={styles.container}>
           <Header />
            <Text>Home</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}

