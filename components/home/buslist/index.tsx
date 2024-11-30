import { Text } from '@/components/Themed';
import { styles } from './styles';
import { View, FlatList, RefreshControl } from 'react-native';
import CardBuslist from '@/components/card-buslist';
import { useBuslistToday } from '@/api/api';
import { useSession } from '@/context/AuthContext';
import Error from '@/components/errors/error';
import Empty from '@/components/empty';
import { useState } from 'react';
import BusListSkeleton from './buslist-skeleton';

export function Buslist() {
  const { session } = useSession();
  const [refreshing, setRefreshing] = useState(false);
  const dateToday = new Date().toISOString().split('T')[0];
  const date = new Date();
  const today = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const {
    data: buslist,
    error: errorBuslist,
    isLoading: isLoadingBuslist,
    isValidating: isValidatingBuslist,
    mutate: mutateBusList,
  } = useBuslistToday(session ?? null, dateToday);

  const isLoadingOrValidating = isLoadingBuslist || isValidatingBuslist;

  const onRefresh = async () => {
    setRefreshing(true);
    await mutateBusList();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_list}>
        <Text style={styles.header_text}>Listas de Hoje</Text>
        <Text>{today}</Text>
      </View>
      { errorBuslist ? (
        <Error message={errorBuslist.message} />
      ) : isLoadingOrValidating ? (
        <BusListSkeleton />
      ) : (
        <FlatList
          style={{ width: '100%' }}
          contentContainerStyle={{ flex: 1 }}
          data={buslist?.results ?? []}
          renderItem={({ item }) => (
            <CardBuslist buslist={item} mutate={mutateBusList} />
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => <Empty message="Nenhuma lista encontrada" />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007bff']}
            />
          }
       />
      )}
    </View>
  );
}
