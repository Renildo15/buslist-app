import Avatar from '@/components/home/avatar';
import { View, Text } from '@/components/Themed';
import { styles } from './styles';

export default function InfoStudent() {
  return (
    <View style={styles.container}>
      <Text style={styles.header_text}>Informações sobre o estudante</Text>
      <View>
        <View style={styles.avatar_container}>
          <Avatar height={70} width={70} borderRadius={50} uri={''} />
          <View style={styles.student_info_box}>
            <Text>Renildo Rabi Vale Dos Santos</Text>
            <Text style={{fontSize:12, fontWeight: 'semibold', color:'gray'}}>20200080125</Text>
          </View>
        </View>

        <TextInfo
            label='Situação:'
            value='Ativo'
        />
        <TextInfo
            label='Curso:'
            value='Sistemas de Informação - Graduação'
        />
        <TextInfo
            label='Instituição:'
            value='UFRN'
            />
        <TextInfo
            label='Parada:'
            value='Novo horizonte'
        />
      </View>
    </View>
  );
}

function TextInfo({ label, value }: { label: string; value: string }) {
  return (
    <View style={{flexDirection:'row', gap:8, alignItems:'center'}}>
      <Text style={{fontSize:14, fontWeight: 'bold'}}>{label}</Text>
      <Text style={{fontSize:12, fontWeight: 'semibold', color:'gray'}}>{value}</Text>
    </View>
  );
}