import { Text } from '@/components/Themed';
import { styles } from './styles';
import { View, FlatList } from 'react-native';
import CardBuslist from '@/components/card-buslist';
import { useBuslistToday } from '@/api/api';
import { useSession } from '@/context/AuthContext';

export function Buslist() {

  const { session } = useSession();
  const dateToday = new Date().toISOString().split('T')[0];
  const date = new Date();
  const today = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const {
    data: buslist
  } = useBuslistToday(session ?? null, dateToday);
  
  return (
    <View style={styles.container}>
      <View style={styles.header_list}>
        <Text style={styles.header_text}>Listas de Hoje</Text>
        <Text>{today}</Text>
      </View>
      <FlatList
        style={{ width: '100%'}}
        data={buslist?.results ?? []}
        renderItem={({ item }) => <CardBuslist buslist={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}
