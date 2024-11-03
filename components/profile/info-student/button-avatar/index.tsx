import { View, Text } from '@/components/Themed';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

interface IButtonAvatarSaveProps {
  onPress: () => void;
  isLoading?: boolean;
  label?: string;
}

export default function ButtonAvatarSave({
  onPress,
  isLoading,
  label = 'Atualizar avatar',
}: IButtonAvatarSaveProps) {
  return (
    <View style={styles.box_update_avatar}>
      <TouchableOpacity
        style={styles.button_update_avatar}
        activeOpacity={0.8}
        onPress={onPress}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={{ color: 'white' }}>{label}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
