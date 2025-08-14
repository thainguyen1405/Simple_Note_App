import { useThemeConfig } from '@/core/theme/use-theme-config';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';

// Root layout for Expo Router. Only Stack.Screen elements may be direct children of <Stack />.
export default function RootLayout() {
  const theme = useThemeConfig();
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Global UI providers/components go here (not inside <Stack />) */}
      <Toaster />
      {/* The Stack must contain only Screen children. */}
      <ThemeProvider value={theme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});