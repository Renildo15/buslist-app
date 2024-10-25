import AuthButton from '@/components/auth/auth-button';
import Input from '@/components/auth/input';
import { View, Text } from '@/components/Themed';
import { styles } from './styles';

export default function UpdateStudent() {
  return (
    <View style={styles.container}>
      <Text style={styles.header_text}>Atualizar informações</Text>
      <Input placeholder="Usuário" value="" onChangeText={() => {}} />
      <Input placeholder="Email" value="" onChangeText={() => {}} />
      <Input placeholder="Whatsapp" value="" onChangeText={() => {}} />
      <Input placeholder="Parada" value="" onChangeText={() => {}} />

      <AuthButton label="Salvar" />
    </View>
  );
}
