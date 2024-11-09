import { TouchableOpacity, View } from 'react-native';
import { Text } from '../Themed';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { IBusList } from '@/api/interfaces/buslist';
import { getShiftName } from '@/utils';
import { useState } from 'react';
import ModalAddBuslist from '../home/buslist/modal-add-buslist';

interface CardBuslistProps {
  buslist: IBusList;
}

export default function CardBuslist({ buslist }: CardBuslistProps) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
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
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button_entry}
            onPress={() => setIsVisibleModal(true)}
          >
            <Text style={{ color: 'white' }}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.button_view_list}>
            <Text style={{ color: 'white' }}>Ver lista</Text>
          </TouchableOpacity>
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
        />
      )}
    </View>
  );
}
