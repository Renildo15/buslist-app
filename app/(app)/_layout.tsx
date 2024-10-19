import React from 'react';

import { Redirect, Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useSession } from '@/context/AuthContext';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

export default function AppRootLayout() {
  const { session } = useSession();
  if (!session) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
