import React, { useEffect, useState } from 'react';
import { View, Text } from '@/components/Themed';
import { styles } from './styles';
import { formattedDate } from '@/utils';
import Avatar from '../avatar';
import { useSession } from '@/context/AuthContext';
import { IUserStudent } from '@/api/interfaces/user';

export default function Header() {
  const [user, setUser] = useState<IUserStudent | null>(null);
  const dateNow = formattedDate();
  const { whoAmI } = useSession();
  const currentUser = whoAmI();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [whoAmI]);

  return (
    <View style={styles.header}>
      <View style={styles.header_image}>
        <Avatar
          width={50}
          height={50}
          borderRadius={25}
          uri={user?.profile.avatar ?? ''}
        />
        <Text style={styles.welcome_message}>Olá, {user?.username}</Text>
      </View>
      <Text style={styles.date_now}>{dateNow}</Text>
    </View>
  );
}
