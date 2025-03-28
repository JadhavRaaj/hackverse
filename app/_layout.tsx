// app/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from './utils/AuthContext'; // Import AuthProvider

export default function RootLayout() {
  return (    <AuthProvider>
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    <Stack.Screen name="(root)" options={{ headerShown: false }} />
  </Stack>
  </AuthProvider>
  );
}
