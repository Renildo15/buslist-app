import { View } from '@/components/Themed';
import { useSession } from '@/context/AuthContext';
import { useBuslist, useInstituitions, useStudents } from '@/api/api';
import { styles } from './styles';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import CardStudent from './card-student';
import Empty from '@/components/empty';
import { useCallback, useEffect, useRef, useState } from 'react';
import SearchBar from '@/components/notice/searchbar';
import ButtonIcon from '@/components/button-icon';
import HeaderStudentsList from './header-buslist-detail';
import BottomSheet from '@gorhom/bottom-sheet';
import { OptionType } from '@/utils/data';
import RadioButtonComponent from '@/components/radio-button-component';
import Sheet from '@/components/sheet';
import { optionsFilterStudent } from '@/utils/data/options-filter';
import DropDownPicker from 'react-native-dropdown-picker';
import { IInstitution } from '@/api/interfaces/institution';

interface IStudentsListProps {
  buslistUuid: string;
}

interface IItem {
  label: string;
  value: string;
}

export default function StudentsList({ buslistUuid }: IStudentsListProps) {
  const { session, whoAmI } = useSession();
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<boolean | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<IItem[]>([]);

  const currentUser = whoAmI();

  const {
    data: students,
    error: errorStudents,
    isLoading: isLoadingStudents,
    mutate: mutateBuslist,
  } = useStudents(session ?? '', buslistUuid as string, searchText, selectedFilter, value);

  const {
    data: instituitions
  } = useInstituitions(session ?? '');
  const {
    data: buslist,
    error: buslistError,
    isLoading: buslistIsLoading,
    isValidating: buslistIsValidating,
    mutate: buslistMutate
  } = useBuslist(session ?? '', buslistUuid as string)

  useEffect(() => {
    if (instituitions) {
      const formattedItems = instituitions.institutions.map((item: IInstitution) => ({
        label: item.name,
        value: item.id,
      }));
      const selectAll = {label: "Todas", value:""}
      formattedItems.unshift(selectAll)
      setItems(formattedItems)
    }
  }, [instituitions])

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


  const onRefresh = async () => {
    setRefreshing(true);
    await mutateBuslist();
    setRefreshing(false);
  };

  const handlePress = (itemId: string, isFiltered: boolean | null) => {
    setSelectedId(itemId);
    setSelectedFilter(isFiltered ?? null);
    bottomSheetRef.current?.close();
  };
  
  const renderItem: ListRenderItem<OptionType> = useCallback(
    ({ item }) => (
     <RadioButtonComponent
        handleSelect={handlePress}
        item={item}
        status={selectedId === item.id ? 'checked' : 'unchecked'}
     />
    ),
    [selectedId]
  );


  return (
    <Sheet
      bottomSheetRef={bottomSheetRef}
      list={optionsFilterStudent}
      onSheetChange={handleSheetChanges}
      renderItem={renderItem}
    >
      <View style={styles.container}>
        <HeaderStudentsList
          name={buslist?.name ?? 'Sem Nome'}
          is_enable={buslist?.is_enable ?? true}
          list_date={buslist?.list_date ?? 'Sem Data'}
        />
          <View style={styles.searchbar_content}>
            <View style={{width: '90%'}}>
              <SearchBar
                  value={searchText}
                  onChangeText={setSearchText}
                  buttonIsVissible={false}
              />
            </View>
            <ButtonIcon
              name="filter"
              size={24}
              onPress={() => {
                bottomSheetRef.current?.expand();
              }}
            />
        
          </View>
          <View style={{width: '100%'}}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderRadius: 10,
                marginBottom:8
              }}
              dropDownContainerStyle={{
                backgroundColor: '#f8f9fa',
                borderColor: '#007bff',
                borderRadius: 10,
              }}
              labelStyle={{
                color: '#333',
                fontSize: 16,
              }}
              selectedItemContainerStyle={{
                backgroundColor: '#007bff',
              }}
              selectedItemLabelStyle={{
                color: '#fff',
                fontWeight: 'bold',
              }}
              placeholder="Selecionar Instituição"
              placeholderStyle={{
                color: '#666',
                fontSize: 16,
              }}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
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
    </Sheet>
  );
}
