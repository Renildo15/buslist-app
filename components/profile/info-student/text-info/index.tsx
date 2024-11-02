import { View, Text } from '@/components/Themed';

interface TextInfoProps {
  label: string;
  value: string;
}

export default function TextInfo({ label, value }: TextInfoProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{label}</Text>
      <Text style={{ fontSize: 12, fontWeight: 'semibold', color: 'gray' }}>
        {value}
      </Text>
    </View>
  );
}
