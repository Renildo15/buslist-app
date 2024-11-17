import { View } from '@/components/Themed';
import { useSession } from '@/context/AuthContext';
import { useBuslist } from '@/api/api';
import HeaderStudentsList from './header-buslist-detail';
import { styles } from './styles';
import { FlatList, RefreshControl } from 'react-native';
import CardStudent from './card-student';
import Empty from '@/components/empty';
import { useState } from 'react';

interface IStudentsListProps {
  buslistUuid: string;
}

export default function StudentsList({ buslistUuid }: IStudentsListProps) {
  const { session } = useSession();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: buslist,
    error: errorBuslist,
    isLoading: isLoadingBuslist,
    mutate: mutateBuslist,
  } = useBuslist(session ?? '', buslistUuid as string);

  const onRefresh = async () => {
    setRefreshing(true);
    await mutateBuslist();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <HeaderStudentsList
        name={buslist?.buslist.name ?? 'Sem Nome'}
        is_enable={buslist?.buslist.is_enable ?? true}
        list_date={buslist?.buslist.list_date ?? 'Sem Data'}
      />

      <FlatList
        data={buslist?.students}
        style={{ width: '100%' }}
        contentContainerStyle={{ flex: 1 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardStudent
            key={item.id}
            student={item.student}
            end_class_time={item.end_class_time}
            is_return={item.is_return}
          />
        )}
        ListEmptyComponent={() => <Empty message="Nenhum aviso encontrada" />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007bff']}
          />
        }
      />
    </View>
  );
}
