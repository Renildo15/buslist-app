import ButtonIcon from '@/components/button-icon';
import { View } from '@/components/Themed';
import { TextInput, TextInputProps } from 'react-native';

interface SearchBarProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClose?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  onClose,
  ...props
}: SearchBarProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth:1, borderColor: '#007bff' }}>
      <TextInput
        placeholder="Pesquisar"
        value={value}
        onChangeText={onChangeText}
        style={{ flex: 1, paddingHorizontal: 8 }}
        {...props}
      />
      <ButtonIcon name="x-square" onPress={onClose} size={24} />
    </View>
  );
}
