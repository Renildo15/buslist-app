import Avatar from '@/components/home/avatar';
import { View, Text } from '@/components/Themed';
import { styles } from './styles';
import { useSession } from '@/context/AuthContext';
import { getTeachingLevel } from '@/utils';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { uploadAvatar, useWhoAmI } from '@/api/api';
import Toast from 'react-native-toast-message';
import TextInfo from './text-info';
import ButtonAvatarSave from './button-avatar';

export default function InfoStudent() {
  const { user, session } = useSession();
  const [avatarUri, setAvatarUri] = useState<string | null>(
    user?.profile.avatar ?? null
  );
  const [showButtonAvatar, setShowButtonAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: userInfoMutate } = useWhoAmI(session ?? '');

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
      setShowButtonAvatar(true);
    }
  };

  const handleUploadAvatar = async () => {
    const data = new FormData();
    const response = await fetch(avatarUri ?? '');
    const blob = await response.blob();
    //@ts-ignore
    data.append('avatar', {
      uri: avatarUri,
      name: 'avatar.jpg',
      type: blob.type,
    });

    try {
      setIsLoading(true);
      await uploadAvatar(session ?? '', data);
      userInfoMutate();
      setShowButtonAvatar(false);

      Toast.show({
        type: 'success',
        text1: 'Avatar atualizado',
        text2: 'Seu avatar foi atualizado com sucesso',
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);

      Toast.show({
        type: 'error',
        text1: 'Erro ao atualizar avatar',
        text2: 'Ocorreu um erro ao atualizar seu avatar, tente novamente',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header_text}>Informações sobre o estudante</Text>
      <View>
        <View style={styles.avatar_container}>
          <TouchableOpacity
            style={styles.camera_icon}
            onPress={handleSelectImage}
          >
            <Avatar
              height={70}
              width={70}
              borderRadius={50}
              uri={avatarUri ?? ''}
            />
            <Feather
              name="camera"
              size={20}
              color="#007bff"
              style={styles.camera_icon_position}
            />
          </TouchableOpacity>
          <View style={styles.student_info_box}>
            <Text>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'semibold', color: 'gray' }}
            >
              {user?.profile.matric_number}
            </Text>
          </View>
        </View>

        <TextInfo label="Situação:" value={user?.profile.status ?? ''} />
        <TextInfo
          label="Curso:"
          value={`${user?.profile.course_name} - ${getTeachingLevel(user?.profile.teaching_level)}`}
        />
        <TextInfo
          label="Instituição:"
          value={user?.profile.institution ?? ''}
        />
        <TextInfo
          label="Parada:"
          value={user?.profile.bus_stop ?? 'Sem parada'}
        />
      </View>
      {showButtonAvatar && (
        <ButtonAvatarSave onPress={handleUploadAvatar} isLoading={isLoading} />
      )}
    </View>
  );
}
