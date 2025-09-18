import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        {/* Tabs wala Drawer item */}
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: "Dashboard",
            drawerLabel: "Dashboard",
          }}
        />

        {/* Simple Drawer items */}

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
