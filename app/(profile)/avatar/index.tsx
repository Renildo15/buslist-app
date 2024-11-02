import ImagePattern from '@/components/auth/image-pattern';
import Avatar from '@/components/home/avatar';
import ButtonAvatarSave from '@/components/profile/info-student/button-avatar';
import { View, Text } from '@/components/Themed';
import { useSession } from '@/context/AuthContext';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../../../components/profile/info-student/styles';
import * as ImagePicker from 'expo-image-picker';
import { uploadAvatar, useWhoAmI } from '@/api/api';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

export default function AvatarUser() {
  const { session } = useSession();
  const [avatarUri, setAvatarUri] = useState<string | null>();
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

      router.replace('/(app)/');
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
    <ImagePattern>
      <View style={styles_avatar.container}>
        <Text style={styles.header_text}>Adicionar foto de perfil</Text>
        <View style={[styles.avatar_container, {backgroundColor: 'rgba(240, 240, 240, 0.8)'}]}>
            <TouchableOpacity
              style={styles.camera_icon}
              onPress={handleSelectImage}
            >
              <Avatar
                height={300}
                width={300}
                borderRadius={50}
                uri={avatarUri ?? ''}
              />
              <Feather
                name="camera"
                size={80}
                color="#007bff"
                style={styles.camera_icon_position}
              />
            </TouchableOpacity>
          </View>
        <View style={styles_avatar.box_buttons}>
          {showButtonAvatar && (
            <ButtonAvatarSave onPress={handleUploadAvatar} isLoading={isLoading} />
          )}
         <ButtonAvatarSave onPress={() => {router.replace('/(app)/')}} label='Pular' />
        </View>
      </View>
    </ImagePattern>
  );
}


const styles_avatar = StyleSheet.create({
  container: {
    flex:1, 
    alignItems:'center', 
    justifyContent:'center', 
    backgroundColor: 'rgba(240, 240, 240, 0.8)', 
    gap:4
  },
  box_buttons: {
    flexDirection:'row', 
    gap:4,
    alignItems:'center', 
    justifyContent:'center', 
    backgroundColor: 'rgba(240, 240, 240, 0.8)'
  }
})