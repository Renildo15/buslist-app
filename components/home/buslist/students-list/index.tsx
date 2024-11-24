import { View } from '@/components/Themed';
import { useSession } from '@/context/AuthContext';
import { useBuslist, useStudents } from '@/api/api';
import { styles } from './styles';
import { FlatList, RefreshControl } from 'react-native';
import CardStudent from './card-student';
import Empty from '@/components/empty';
import { useState } from 'react';
import SearchBar from '@/components/notice/searchbar';
import ButtonIcon from '@/components/button-icon';
import HeaderStudentsList from './header-buslist-detail';

interface IStudentsListProps {
  buslistUuid: string;
}

export default function StudentsList({ buslistUuid }: IStudentsListProps) {
  const { session, whoAmI } = useSession();
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const currentUser = whoAmI();

  const {
    data: students,
    error: errorStudents,
    isLoading: isLoadingStudents,
    mutate: mutateBuslist,
  } = useStudents(session ?? '', buslistUuid as string, searchText);

  const {
    data: buslist,
    error: buslistError,
    isLoading: buslistIsLoading,
    isValidating: buslistIsValidating,
    mutate: buslistMutate
  } = useBuslist(session ?? '', buslistUuid as string)


  const onRefresh = async () => {
    setRefreshing(true);
    await mutateBuslist();
    setRefreshing(false);
  };


  return (
    <View style={styles.container}>
      <HeaderStudentsList
        name={buslist?.name ?? 'Sem Nome'}
        is_enable={buslist?.is_enable ?? true}
        list_date={buslist?.list_date ?? 'Sem Data'}
      />
     <View style={{paddingHorizontal:16, width: '100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between', gap:8, marginBottom:8}}>
      <View style={{width: '90%'}}>
        <SearchBar
            value={searchText}
            onChangeText={setSearchText}
        />
      </View>
      <ButtonIcon
        name="filter"
        size={24}
        onPress={() => {
          // bottomSheetRef.current?.expand();
        }}
      />
     </View>

      <FlatList
        data={students?.students}
        style={{ width: '100%' }}
        contentContainerStyle={{ flex: 1 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardStudent
            key={item.id}
            buslistStudentId={item.id}
            student={item.student}
            end_class_time={item.end_class_time}
            is_return={item.is_return}
            currentUserId={currentUser?.id ?? ""}
            mutate={mutateBuslist}
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
