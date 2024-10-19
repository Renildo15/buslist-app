import { View } from '@/components/Themed';
import { styles } from './styles';
import Header from '@/components/home/header';
import { Buslist } from '@/components/home/buslist';

export default function TabHome() {
  return (
    <View style={styles.container}>
      <Header />
      <Buslist />
    </View>
  );
}
