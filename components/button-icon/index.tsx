import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity } from 'react-native';

interface IButtonIconProps {
  name: keyof typeof Feather.glyphMap;
  size: number;
  onPress?: () => void;
}

export default function ButtonIcon({ name, size, onPress }: IButtonIconProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Feather name={name} size={size} color="#007bff" />
    </TouchableOpacity>
  );
}
