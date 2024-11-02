import React, { useState } from 'react';
import ImagePattern from '@/components/auth/image-pattern';
import { View,Text } from '@/components/Themed';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import Input from '@/components/auth/input';
import AuthButton from '@/components/auth/auth-button';
import { useSession } from '@/context/AuthContext';
import AuthErrors from '@/components/errors/auth-erros';
import { getTeachingLevelKey, validateField } from '@/utils';
import { Redirect } from 'expo-router';
import SelectBusStop from '@/components/profile/update-student/select-bus-stop';
import { createStudent, useBusStops, useWhoAmI } from '@/api/api';
import { IBusStop } from '@/api/interfaces/busstop';
import { IUserStudentProfileCreate, IUserStudentProfileUpdate } from '@/api/interfaces/user';
import Toast from 'react-native-toast-message';
import { TeachingLevelEnum } from '@/api/enums/user';
import { router } from 'expo-router';

export default function Profile() {
  const { whoAmI, session, student } = useSession();
  const { mutate: userMutate } = useWhoAmI(session ?? '');
 
  const currentUser = whoAmI();
  const { data: busStops } = useBusStops(session ?? '');
  const [whatsapp, setWhatsapp] = useState('');
  const [busStopId, setBusStopId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    whatsapp: '',
    busStop: '',
  })

  const validateForm = () => {
    const newErrors = {
      whatsapp: validateField('whatsapp', whatsapp),
      busStop: validateField('busStop', busStopId),
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSelectBusStop = (bustop: IBusStop) => {
    setBusStopId(bustop.id);
  };

  const handleSave = async () => {

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const data: IUserStudentProfileCreate = {
        user:currentUser?.id ?? '',
        bus_stop: busStopId,
        phone_number: whatsapp,
        course_name: student.course_student,
        matric_number: student.matriculation_student,
        sex: student.sex_student,
        status: student.status_student,
        teaching_level: getTeachingLevelKey(student.teaching_level_student) as TeachingLevelEnum,
        institution: student.institution_student,
      };
      
      const response = await createStudent(
        session ?? '',
        data
      );

      if (response) {
        userMutate();
        Toast.show({
          type: 'success',
          text1: 'Perfil atualizado',
          text2: 'Seu perfil foi atualizado com sucesso',
        });
        router.replace('/(profile)/avatar');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao atualizar perfil',
        text2: 'Ocorreu um erro ao atualizar seu perfil, tente novamente',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleTextChange = (text: string) => {
    // Remove todos os caracteres que não sejam dígitos
    let formattedText = text.replace(/\D/g, '');

    // Adiciona a formatação para (xx) xxxx-xxxx ou (xx) xxxxx-xxxx
    if (formattedText.length <= 10) {
      formattedText = formattedText.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else {
      formattedText = formattedText.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
    }

    setWhatsapp(formattedText);
  };

  return (
    <ImagePattern>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.message}>
          Complete seu perfil para ter uma melhor experiência
        </Text>
        <View style={{ backgroundColor: 'transparent' }}>
          <AuthErrors error={errors.whatsapp} />
          <Input
            placeholder="Whatsapp"
            value={whatsapp}
            onChangeText={handleTextChange}
            keyboardType="phone-pad"
            maxLength={15}
          />
        </View>

       <View style={{ backgroundColor: 'transparent' }}>
          <AuthErrors error={errors.busStop} />
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
        </View>

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <AuthButton label="Salvar" onPress={handleSave} />
        )}
      </View>
    </ImagePattern>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
  },
  imageContainer: {
    marginBottom: 40,
    borderRadius: 50,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  message: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
