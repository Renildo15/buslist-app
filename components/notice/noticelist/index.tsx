import { View, Text } from '@/components/Themed';
import { FlatList, RefreshControl } from 'react-native';
import { styles } from './styles';
import { useSession } from '@/context/AuthContext';
import { useNotices } from '@/api/api';
import Empty from '@/components/empty';
import Error from '@/components/errors/error';
import CardNotice from '../card-notice';
import { useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import NoticeSkeleton from '../skeleton';

export default function NoticeList() {
  const { session } = useSession();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: notices,
    error: errorNotices,
    isLoading: loadingNotices,
    isValidating: validatingNotices,
    mutate: mutateNotices,
  } = useNotices(session ?? null);

  if (errorNotices) {
    return <Error message={errorNotices.message} />;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await mutateNotices(); // Recarrega os dados usando o mutate
    setRefreshing(false);
  };

  if (loadingNotices || validatingNotices) {
    //TODO: Criar um skeleton
    <NoticeSkeleton />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_list}>
        <Text style={styles.header_text}>Avisos</Text>
      </View>
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
    </View>
  );
}
