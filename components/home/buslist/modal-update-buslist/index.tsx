import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Platform, ActivityIndicator } from 'react-native';
import { styles } from '../modal-add-buslist/styles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

import { useSession } from '@/context/AuthContext';
import { Button } from '@/components/button';
import { updateBuslistStudent, useBuslistStudent } from '@/api/api';

interface IModalUpdateBuslistProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  buslistStudentId: string;
  mutate: () => void;
}

interface OriginalDataProps {
    end_class_time: string | Date;
    is_return: boolean | null;
}

export default function ModalUpdateBuslist({
  modalVisible,
  setModalVisible,
  buslistStudentId,
  mutate,
}: IModalUpdateBuslistProps) {
  const { session, whoAmI } = useSession();
  const [endTime, setEndTime] = useState<Date | undefined>(new Date());
  const [isReturn, setIsReturn] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  const [loading, setLoading] = useState(false);

 const {
    data: buslistStudent,
    error: buslistStudentError,
    isLoading: buslistStudentIsLoading,
    isValidating: buslistStudentIsValidating,
    mutate: buslistStudentMutate
 } = useBuslistStudent(session ?? '', buslistStudentId)


 function parseTimeToTodayDate(timeString: string): Date | undefined {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return undefined;
  
    const today = new Date();
    today.setHours(hours, minutes, seconds, 0);
    return today;
  }

 useEffect(() => {
    if (buslistStudent) {
        const endClassTime = buslistStudent.end_class_time;
    
        // Tenta criar a data a partir do formato recebido
        const parsedEndTime = endClassTime
          ? parseTimeToTodayDate(endClassTime) // Conversão para incluir a data atual
          : undefined;
    
        setEndTime(parsedEndTime); // Atualiza o estado com o valor convertido
        setIsReturn(buslistStudent.is_return);
      }
    
 },[buslistStudent])

  const formattedTime = endTime
    ? endTime.toLocaleTimeString('pt-BR', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : '00:00:00';


    const handleSave = async () => {
        setLoading(true);
        try {
          const data = {
            end_class_time: formattedTime,
            is_return: isReturn,
          };
          const response = await updateBuslistStudent(
            session ?? '',
            buslistStudentId,
            data,
          );
    
          if (response) {
            Toast.show({
              type: 'success',
              text1: 'Sucesso',
              text2: 'Informaçoes atualizadas',
            });
          }
    
          mutate();
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: 'Erro ao atualizar informações',
          });
        } finally {
          setLoading(false);
          setModalVisible(false);
        }
      };


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
                color="#007bff"
                width="40%"
                onPress={handleSave}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
