import React from 'react';

import { Redirect, Stack } from 'expo-router';

import { useSession } from '@/context/AuthContext';
import { Text } from '@/components/Themed';

export default function AuhtRootLayout() {
  const { session } = useSession();

  if (session) {
    return <Redirect href="/(app)" />;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="matric/index" options={{ headerShown: false }} />
      <Stack.Screen name="register/index" options={{ headerShown: false }} />
    </Stack>
  );
}
