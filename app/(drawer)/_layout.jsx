import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";

const userName = "John Doe";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#b7bbbeff",
          },
          drawerActiveTintColor: "#eff7ffff",
          drawerActiveBackgroundColor: "#437c8d",
          drawerInactiveTintColor: "#333",
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
        }}
        drawerContent={(props) => (
          <View style={{ flex: 1 }}>
            {/* Drawer Items */}
            <DrawerContentScrollView
              {...props}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
            {/* Logout Button at Bottom */}
            <View style={styles.logoutContainer}>
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => {
                  router.replace("/auth/login");
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: "Dashboard",
            drawerLabel: "Dashboard",
          }}
        />
        <Drawer.Screen
          name="today"
          options={{
            title: "Today",
            drawerLabel: "Today",
          }}
        />
        <Drawer.Screen
          name="pending"
          options={{
            title: "Pending",
            drawerLabel: "Pending",
          }}
        />
        <Drawer.Screen
          name="completed"
          options={{
            title: "Completed",
            drawerLabel: "Completed",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    padding: 20,
    borderColor: "#e0e0e0",
    backgroundColor: "#b7bbbeff",
    marginBottom: 30,
  },
  logoutBtn: {
    backgroundColor: "#437c8d",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: "center",
    elevation: 2,
  },
});
