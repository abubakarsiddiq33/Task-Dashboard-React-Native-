import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Alert, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { logoutUser } from '../../Redux/FeatureSlice/authSlice';

export default function DrawerLayout() {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      // Show confirmation dialog
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Logout",
            style: "destructive",
            onPress: async () => {
              try {
                console.log("Logout button clicked - starting logout...");
                const result = await dispatch(logoutUser()).unwrap();
                console.log("Logout successful, result:", result);
                console.log("Redux state should update automatically");
                // Redux state change will automatically redirect to login
              } catch (error) {
                console.error("Logout error:", error);
                Alert.alert("Error", "Failed to logout. Please try again.");
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#cdd2d6ff",
            width: 250,
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

