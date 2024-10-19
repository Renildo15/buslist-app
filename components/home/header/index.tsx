import { View, Text } from '@/components/Themed';
import { Image } from 'react-native';
import { styles } from './styles';
import { formattedDate } from '@/utils';
import Avatar from '../avatar';

export default function Header() {
  const dateNow = formattedDate();
  return (
    <View style={styles.header}>
      <View style={styles.header_image}>
        <Avatar
          width={50}
          height={50}
          borderRadius={25}
          uri="https://pics.craiyon.com/2023-09-29/cc9c956c1a674b78a0c7e4f11cef1190.webp"
        />
        <Text style={styles.welcome_message}>Olá, Habby</Text>
      </View>
      <Text style={styles.date_now}>{dateNow}</Text>
    </View>
  );
}
