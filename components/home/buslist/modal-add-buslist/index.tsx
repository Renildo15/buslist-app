import React, { useState } from 'react';
import { Modal, View, Text, Platform, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

import { useSession } from '@/context/AuthContext';
import { Button } from '@/components/button';
import { createBuslistStudent } from '@/api/api';

interface IModalAddBuslistProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  buslistId: string;
  mutate: () => void;
}

export default function ModalAddBuslist({
  modalVisible,
  setModalVisible,
  buslistId,
  mutate,
}: IModalAddBuslistProps) {
  const { session, whoAmI } = useSession();
  const [endTime, setEndTime] = useState<Date | undefined>(new Date());
  const [isReturn, setIsReturn] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [loading, setLoading] = useState(false);

  const currentUser = whoAmI();

  const formattedTime = endTime
  ? endTime.toLocaleTimeString('pt-BR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
  : '00:00:00';


  const handleSave = async () => {
   
    setLoading(true);
    try {

      const data = {
        end_class_time: formattedTime,
        is_return: isReturn,
      }
      const response = await createBuslistStudent(session ?? "", data, currentUser?.id ?? "", buslistId);

      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Adicionado na lista',
        });
      }

      mutate();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Erro ao adicionar na lista',
      });
    } finally {
      setLoading(false);
      setModalVisible(false);
    }

  }

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndTime(selectedDate);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ width: '100%' }}>
            <Button
              title="Selecione o horário"
              onPress={() => setShowTimePicker(true)}
              color="#007bff"
              width="100%"
            />
            {showTimePicker && (
              <DateTimePicker
                value={endTime || new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={handleTimeChange}
              />
            )}
            {endTime && (
              <Text>Horário selecionado: {endTime.toLocaleTimeString()}</Text>
            )}
            <BouncyCheckbox
              isChecked={isReturn}
              fillColor="#007bff"
              size={25}
              useBuiltInState={false}
              onPress={(checked: boolean) => {
                setIsReturn(!isReturn);
              }}
              textComponent={<Text style={{ marginLeft: 6 }}>Volta</Text>}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 6,
              width: '100%',
              marginTop: 16,
            }}
          >
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              style={{ marginRight: 10 }}
              color="red"
              width="40%"
            />
           {loading ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : (
              <Button
                title="Salvar"
                onPress={handleSave}
                color="#007bff"
                width="40%"
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
