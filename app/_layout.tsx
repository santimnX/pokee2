import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import '../global.css'; // Importar estilos globales de Tailwind

// Prevenir que el splash screen se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Puedes agregar fuentes personalizadas aquí si las necesitas
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F9FAFB' }
      }}
    >
      <Stack.Screen 
        name="(tabs)" 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="pokemon/[id]" 
        options={{
          headerShown: false,
          presentation: 'card',
          animation: 'slide_from_right'
        }}
      />
    </Stack>
  );
}