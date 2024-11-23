import { IUserStudent } from '@/api/interfaces/user';
import Avatar from '@/components/home/avatar';
import { View, Text } from '@/components/Themed';
import { styles } from './styles';
import Badge from '@/components/badge';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import ModalUpdateBuslist from '../../modal-update-buslist';

interface ICardStudentProps {
  buslistStudentId: string
  student: IUserStudent;
  end_class_time: string;
  is_return: boolean;
  currentUserId: string;
  mutate: () => void;
}

export default function CardStudent(props: ICardStudentProps) {
  const isCurrentUser = props.currentUserId === props.student?.id;
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleOpenModal = () => {
     setIsVisibleModal(true);
  };

  return (
    <TouchableOpacity 
      style={styles.card_container}
      activeOpacity={isCurrentUser ? 0.3 : 1}
      disabled={!isCurrentUser}
      onPress={handleOpenModal}
    >
      <View style={styles.card_content}>
        <View style={styles.card_content_info}>
          <Avatar
            borderRadius={20}
            width={40}
            height={40}
            uri={props.student?.profile.avatar}
          />
          <Text>{props.student?.first_name}</Text>
          {props.is_return ? (
            <Badge color='#007bff' text={props.end_class_time}/>
          ) : (
            <Badge color='red' text='Não volta'/>
          )}
        </View>
        <View>
          <Text style={{fontWeight:"bold"}}>{props.student?.profile.institution}</Text>
        </View>
      </View>

      {isVisibleModal && (
          <ModalUpdateBuslist
            buslistStudentId={props.buslistStudentId}
            modalVisible={isVisibleModal}
            setModalVisible={setIsVisibleModal}
            mutate={props.mutate}
          />
      )}
    </TouchableOpacity>
  );
}
