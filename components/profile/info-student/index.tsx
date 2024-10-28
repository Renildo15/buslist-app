import Avatar from '@/components/home/avatar';
import { View, Text } from '@/components/Themed';
import { styles } from './styles';
import { useSession } from '@/context/AuthContext';
import { getTeachingLevel } from '@/utils';

export default function InfoStudent() {
  const { user } = useSession();
  return (
    <View style={styles.container}>
      <Text style={styles.header_text}>Informações sobre o estudante</Text>
      <View>
        <View style={styles.avatar_container}>
          <Avatar height={70} width={70} borderRadius={50} uri={user?.profile.avatar ?? ''} />
          <View style={styles.student_info_box}>
            <Text>{user?.first_name} {user?.last_name}</Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'semibold', color: 'gray' }}
            >
              {user?.profile.matric_number}
            </Text>
          </View>
        </View>

        <TextInfo label="Situação:" value={user?.profile.status ?? ''} />
        <TextInfo label="Curso:" value={`${user?.profile.course_name} - ${getTeachingLevel(user?.profile.teaching_level)}`} />
        <TextInfo label="Instituição:" value={user?.profile.institution ?? ''} />
        <TextInfo label="Parada:" value={user?.profile.bus_stop ?? 'Sem parada'} />
      </View>
    </View>
  );
}

function TextInfo({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{label}</Text>
      <Text style={{ fontSize: 12, fontWeight: 'semibold', color: 'gray' }}>
        {value}
      </Text>
    </View>
  );
}
