import { useBuslist } from '@/api/api';
import DefaultLayout from '@/components/defaul-layout';
import { useLocalSearchParams } from 'expo-router';
import StudentsList from '@/components/home/buslist/students-list';

export default function BuslistDetail() {
  const { uuid } = useLocalSearchParams();

  return (
    <DefaultLayout>
      <StudentsList buslistUuid={uuid as string} />
    </DefaultLayout>
  );
}
