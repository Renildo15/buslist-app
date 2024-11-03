import React from 'react';
import { INotice } from '@/api/interfaces/notice';
import { Alert, Modal, Text, Pressable, View } from 'react-native';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { useSession } from '@/context/AuthContext';
import { updateViewed, useNotices } from '@/api/api';

interface IModalNoticeProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  notice: INotice;
}

export default function ModalNotice({
  notice,
  modalVisible,
  setModalVisible,
}: IModalNoticeProps) {
  const { session } = useSession();
  const { mutate: mutateNotices } = useNotices(session ?? null);

  const handleViewed = async () => {
    try {
      await updateViewed(session ?? null, notice.id);
      await mutateNotices();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ backgroundColor: 'transparent' }}>
            <Feather name="alert-triangle" size={50} color="#007bff" />
          </View>
          <Text style={styles.modalText}>{notice.title}</Text>
          <Text>{notice.description}</Text>
          <View style={{ width: '100%', marginTop: 70 }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                if (!notice.viewed) {
                  handleViewed();
                }
                setModalVisible(!modalVisible);
              }}
            >
              {notice && !notice.viewed ? (
                <Text style={styles.textStyle}>OK</Text>
              ) : (
                <Text style={styles.textStyle}>Fechar</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
