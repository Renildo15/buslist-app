import DefaultLayout from '@/components/defaul-layout';
import InfoStudent from '@/components/profile/info-student';
import UpdateStudent from '@/components/profile/update-student';

export default function TabProfile() {
  return (
    <DefaultLayout isHeaderVisible={false}>
      <InfoStudent />
      <UpdateStudent />
    </DefaultLayout>
  );
}
