import React from 'react';

import { Stack } from 'expo-router';

export default function ProfileRootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="avatar/index" options={{ headerShown: false }} />
    </Stack>
  );
}
