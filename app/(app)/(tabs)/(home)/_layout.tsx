import React from 'react';

import { Redirect, Stack } from 'expo-router';
import { useSession } from '@/context/AuthContext';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

export default function HomeRootLayout() {
  const { session } = useSession();
  if (!session) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[uuid]/buslist-detail"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
