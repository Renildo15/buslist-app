import React, { useState, useEffect } from 'react';
import AuthButton from '@/components/auth/auth-button';
import Input from '@/components/auth/input';
import { View, Text } from '@/components/Themed';
import { styles } from './styles';
import { useSession } from '@/context/AuthContext';
import SelectBusStop from './select-bus-stop';
import { updateStudent, useBusStops, useWhoAmI } from '@/api/api';
import { ActivityIndicator } from 'react-native';
import { IUserStudentProfileUpdate } from '@/api/interfaces/user';
import Toast from 'react-native-toast-message';
import { IBusStop } from '@/api/interfaces/busstop';

export default function UpdateStudent() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [stop, setStop] = useState('');
  const [busStopId, setBusStopId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { whoAmI, session } = useSession();
  const { mutate: userMutate } = useWhoAmI(session ?? '');
  const currentUser = whoAmI();

  const { data: busStops } = useBusStops(session ?? '');

  const [originalData, setOriginalData] = useState({
    username: '',
    email: '',
    phone_number: '',
    bus_stop: '',
  });

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setEmail(currentUser.email);
      setWhatsapp(currentUser.profile?.phone_number);
      setStop(currentUser.profile?.bus_stop);

      setOriginalData({
        username: currentUser.username,
        email: currentUser.email,
        phone_number: currentUser.profile?.phone_number,
        bus_stop: currentUser.profile?.bus_stop,
      });
    }
  }, [whoAmI]);

  const handleSelectBusStop = (bustop: IBusStop) => {
    setStop(bustop.name);
    setBusStopId(bustop.id);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const data: IUserStudentProfileUpdate = {
        user: {},
      };

      if (username !== originalData.username) {
        data.user = { username };
      }
      if (email !== originalData.email) {
        data.user = { ...data.user, email };
      }
      if (whatsapp !== originalData.phone_number) {
        data.phone_number = whatsapp;
      }
      if (stop !== originalData.bus_stop) {
        data.bus_stop = busStopId;
      }

      if (Object.keys(data).length === 0) {
        Toast.show({
          type: 'info',
          text1: 'Nenhuma alteração feita.',
          position: 'top',
        });
        return;
      }

      const response = await updateStudent(
        session ?? '',
        currentUser?.id ?? '',
        data
      );
      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Dados atualizados',
          position: 'top',
        });
        userMutate();
      }
    } catch (error: any) {
      console.error('Error updating student:', error);
      Toast.show({
        type: 'error',
        text1: error.message,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header_text}>Atualizar informações</Text>
      <Input
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Whatsapp"
        value={whatsapp}
        onChangeText={setWhatsapp}
      />
      <SelectBusStop
        data={busStops?.bus_stop ?? []}
        onSelect={handleSelectBusStop}
        initialSelectedItem={
          busStops && busStops.bus_stop
            ? busStops.bus_stop.find(
                (stop) => stop.name === currentUser?.profile?.bus_stop
              )
            : undefined
        }
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <AuthButton label="Salvar" onPress={handleSave} />
      )}
    </View>
  );
}
