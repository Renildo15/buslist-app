import { View, Text } from '@/components/Themed';
import {
  Animated,
  Easing,
  FlatList,
  ListRenderItem,
  RefreshControl,
  SectionListData,
} from 'react-native';
import { styles } from './styles';
import { useSession } from '@/context/AuthContext';
import { useNotices } from '@/api/api';
import Empty from '@/components/empty';
import Error from '@/components/errors/error';
import CardNotice from '../card-notice';
import { JSX, useCallback, useMemo, useRef, useState } from 'react';
import NoticeSkeleton from '../skeleton';
import ButtonIcon from '@/components/button-icon';
import {
  GestureHandlerRootView,
  TextInput,
} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetSectionList,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { RadioButton } from 'react-native-paper';
import { NoticeType, optionsFilters } from '@/utils/data';
import SearchBar from '../searchbar';

export default function NoticeList() {
  const { session } = useSession();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [selectedFilter, setSelectedFilter] = useState<boolean | null>(null);
  const [searchText, setSearchText] = useState('');

  const [searchVisible, setSearchVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  const toggleSearchBar = () => {
    if (searchVisible) {
      // Animar fechamento
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start(() => setSearchVisible(false));
    } else {
      setSearchVisible(true);
      // Animar abertura
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start();
    }
  };

  const searchBarWidth = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '70%'], // Define a largura que a barra deve alcançar
  });

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const {
    data: notices,
    error: errorNotices,
    isLoading: loadingNotices,
    isValidating: validatingNotices,
    mutate: mutateNotices,
  } = useNotices(session ?? null, selectedFilter, searchText);

  const onRefresh = async () => {
    setRefreshing(true);
    await mutateNotices();
    setRefreshing(false);
  };

  const renderBackdrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    []
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionListData<NoticeType> }) => (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.section_title}>{section.title}</Text>
      </View>
    ),
    []
  );

  const renderItem: ListRenderItem<NoticeType> = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <RadioButton
          value={item.id}
          status={selectedId === item.id ? 'checked' : 'unchecked'}
          onPress={() => {
            setSelectedId(item.id);
            setSelectedFilter(item.is_filtereded ?? null);
          }}
          uncheckedColor="white"
          color="white"
        />
        <Text style={{ color: 'white' }}>{item.type}</Text>
      </View>
    ),
    [selectedId]
  );

  // Verifique se o conteúdo condicional está sendo tratado apenas com variáveis e não com hooks.
  const isLoadingOrValidating = loadingNotices || validatingNotices;

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header_list}>
        <Text style={styles.header_text}>Avisos</Text>
        {searchVisible ? (
          <Animated.View
            style={[styles.searchContainer, { width: searchBarWidth }]}
          >
            <SearchBar
              value={searchText}
              onChangeText={setSearchText}
              onClose={toggleSearchBar}
            />
          </Animated.View>
        ) : (
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <ButtonIcon name="search" size={24} onPress={toggleSearchBar} />
            <ButtonIcon
              name="filter"
              size={24}
              onPress={() => {
                bottomSheetRef.current?.expand();
              }}
            />
          </View>
        )}
      </View>

      {errorNotices ? (
        <Error message={errorNotices.message} />
      ) : isLoadingOrValidating ? (
        <NoticeSkeleton />
      ) : (
        <FlatList
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center', flex: 1 }}
          data={notices?.results ?? []}
          renderItem={({ item }) => <CardNotice notice={item} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => <Empty message="Nenhum aviso encontrada" />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007bff']}
            />
          }
        />
      )}

      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableOverDrag={true}
        handleIndicatorStyle={{ backgroundColor: '#007bff' }}
        containerStyle={{ padding: 10 }}
        index={-1}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetSectionList
          sections={optionsFilters ?? []}
          keyExtractor={(i) => i.id}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
