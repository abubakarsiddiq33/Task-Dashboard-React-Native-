import  Header  from "../components/Header";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
      {/* Auth flow */}
      <Stack.Screen name="auth/login" options={{ title: "Login" }} />
      <Stack.Screen name="auth/signup" options={{ title: "Signup" }} />

      {/* Drawer (protected area) */}
      {/* <Stack.Screen name="(drawer)" options={{ headerShown: false }} /> */}
    </Stack>
      
    </>
  );
}
