import { View, ActivityIndicator } from 'react-native';
import { Text } from '../Themed';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { IBusList } from '@/api/interfaces/buslist';
import { getShiftName } from '@/utils';
import { useState, useEffect } from 'react';
import ModalAddBuslist from '../home/buslist/modal-add-buslist';
import { useSession } from '@/context/AuthContext';
import { Button } from '../button';
import Toast from 'react-native-toast-message';
import { deleteBuslistStudent } from '@/api/api';

interface CardBuslistProps {
  buslist: IBusList;
  mutate: () => void;
}

export default function CardBuslist({ buslist, mutate }: CardBuslistProps) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState(buslist.students);
  const { whoAmI, session } = useSession();

  function formatDate(date: string) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  function formatTime(dateString: string): string {
    const time = new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return time;
  }

  const currentUser = whoAmI();

  const isStudentInBuslist = students.some(
    (student) => student.username === currentUser?.username
  );

  useEffect(() => {
    setStudents(buslist.students);
  }, [buslist]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteBuslistStudent(session ?? "", currentUser?.id ?? "", buslist.id);
      mutate();
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Removido da lista',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Erro ao remover da lista',
      });
    } finally {
      setLoading(false)
    }
  }

  const handleAddAndRemove = () => {
    if (isStudentInBuslist) {
      handleDelete();
    } else {
      setIsVisibleModal(true)
    }
  }
  
  return (
    <View style={styles.card_buslist}>
      <View style={styles.status_content}>
        <View style={styles.status_box}>
          <View
            style={buslist ? styles.status_enable : styles.status_not_enable}
          ></View>
          {buslist.is_enable ? (
            <Text style={styles.enable}>Disponível</Text>
          ) : (
            <Text style={styles.not_enable}>Indisponível</Text>
          )}
        </View>
        <Text style={styles.shift_text}>{getShiftName(buslist.shift)}</Text>
      </View>
      <View style={styles.buslist_info_I}>
        <Text style={styles.buslist_name}>{buslist.name}</Text>
        <Text style={styles.buslist_date}>{formatDate(buslist.list_date)}</Text>
      </View>
      <View style={styles.buslist_info_II}>
        <View style={{ gap: 4 }}>
          <Text style={styles.buslist_hours_init}>
            Inicio - {formatTime(buslist.list_time_initial)}
          </Text>
          <Text style={styles.buslist_hours_end}>
            Término - {formatTime(buslist.list_time_final)}
          </Text>
        </View>
        <View style={{ gap: 4 }}>
         
          { loading ? (
            <ActivityIndicator size="small" color="#007bff" />
          ) : (
            <Button
              title={isStudentInBuslist ? 'Remover' : 'Add'}
              color={isStudentInBuslist ? 'red' : 'green'}
              onPress={handleAddAndRemove}
              activeOpacity={0.8}
            />
            )  
          }

          <Button
            title='Ver lista'
            color='#007bff'
            onPress={() => {}}
            activeOpacity={0.8}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}>
        <Feather name="users" size={16} color="black" />
        <Text>25 pessoas</Text>
      </View>

      {isVisibleModal && (
        <ModalAddBuslist
          modalVisible={isVisibleModal}
          setModalVisible={setIsVisibleModal}
          buslistId={buslist.id}
          mutate={mutate}
        />
      )}
    </View>
  );
}
