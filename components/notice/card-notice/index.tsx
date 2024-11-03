import { INotice } from '@/api/interfaces/notice';
import { View } from '@/components/Themed';
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import ModalNotice from '../modal-notice';

interface INoticeProps {
  notice: INotice;
}

export default function CardNotice({ notice }: INoticeProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <TouchableOpacity
      style={[
        styles.content_notice,
        { backgroundColor: notice.viewed ? '#F0F0F0' : '#E6F7FF' },
      ]}
      onPress={handleModal}
      activeOpacity={0.8}
    >
      <View style={{ backgroundColor: 'transparent' }}>
        <Feather name="alert-triangle" size={50} color="#007bff" />
      </View>
      <View style={{ backgroundColor: 'transparent', flex: 1 }}>
        <View style={styles.title_content}>
          <Text style={styles.title}>{notice.title}</Text>
          <Text style={styles.subtitle}>{notice.buslist}</Text>
        </View>
        <Text numberOfLines={1}>
          {notice.description.length > 30
            ? `${notice.description.slice(0, 30)}...`
            : notice.description}
        </Text>
      </View>
      <View
        style={[
          styles.circleIndicator,
          { backgroundColor: notice.viewed ? '#D3D3D3' : '#007bff' }, // Círculo cinza se lido, azul se não lido
        ]}
      />
      {modalVisible && (
        <ModalNotice
          notice={notice}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </TouchableOpacity>
  );
}
