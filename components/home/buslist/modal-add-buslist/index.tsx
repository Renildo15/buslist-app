import React, { useState } from 'react';
import { Modal, View, Text, Platform } from 'react-native';
import { styles } from './styles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePicker from '@react-native-community/datetimepicker';

import { useSession } from '@/context/AuthContext';
import { Button } from '@/components/button';

interface IModalAddBuslistProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  buslistId: string;
}

export default function ModalAddBuslist({
  modalVisible,
  setModalVisible,
}: IModalAddBuslistProps) {
  const { session } = useSession();
  const [endTime, setEndTime] = useState<Date | undefined>(new Date());
  const [isReturn, setIsReturn] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);
  

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
          <View style={{width:'100%'}}>
          <Button
              title="Selecione o horário"
              onPress={() => setShowTimePicker(true)}
              color="#007bff"
              width='100%'
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
                textComponent= {
                    <Text style={{marginLeft:6}}>Volta</Text>
                }
            />
          </View>
          <View style={{flexDirection:'row', justifyContent:"space-between", gap:6, width:"100%", marginTop:16}}>
            <Button
                title='Cancelar'
                onPress={() => setModalVisible(false)}
                style={{marginRight: 10}}
                color='red'
                width='40%'
            />
            <Button
                title='Salvar'
                onPress={() => console.log('Salvar')}
                color='#007bff'
                width='40%'
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
