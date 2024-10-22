import { View, Text } from '@/components/Themed';
import { Image } from 'react-native';
import { styles } from './styles';
import { formattedDate } from '@/utils';
import Avatar from '../avatar';
import { useSession } from '@/context/AuthContext';

export default function Header() {
  const dateNow = formattedDate();
  const { whoAmI } = useSession();
  const user = whoAmI();

  return (
    <View style={styles.header}>
      <View style={styles.header_image}>
        <Avatar
          width={50}
          height={50}
          borderRadius={25}
          uri={user?.profile.avatar ?? ''}
        />
        <Text style={styles.welcome_message}>Olá, {user?.username}</Text>
      </View>
      <Text style={styles.date_now}>{dateNow}</Text>
    </View>
  );
}
