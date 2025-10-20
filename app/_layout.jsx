// app/_layout.js
import { Stack } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../Redux/store";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser, clearUser, setLoading } from "../Redux/FeatureSlice/authSlice";

function AppContent() {
  const dispatch = useDispatch();
  const { loading, currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const auth = getAuth();
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user)); // ✅ User logged in
      } else {
        dispatch(clearUser()); // 🚪 No user
      }
      dispatch(setLoading(false)); // ✅ Stop loading once done
    });

    return unsubscribe;
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#437c8d" />
        <Text style={{ marginTop: 10, fontSize: 16, color: "#666" }}>
          Checking authentication...
        </Text>
      </View>
    );
  }

  return (
    <Stack
      key={currentUser ? "authenticated" : "unauthenticated"}
      screenOptions={{ headerShown: false }}
    >
      {currentUser ? (
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
