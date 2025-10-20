// src/screens/ProfileScreen.js
import React from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import { logoutUser } from "../../../Redux/FeatureSlice/authSlice"; 

const Profile = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  // get user data from redux or firebase directly
  const currentUser = useSelector((state) => state.auth.currentUser) || auth.currentUser;

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
    <View style={styles.container}>
      {/* Profile Photo */}
      <Image
        source={{
          uri:
            currentUser?.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        }}
        style={styles.avatar}
      />

      {/* Display Name */}
      <Text style={styles.name}>
        {currentUser?.displayName || "Guest User"}
      </Text>

      {/* Email */}
      <Text style={styles.email}>{currentUser?.email || "No email found"}</Text>

      {/* Logout Button */}
      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        buttonColor="#437c8d"
        textColor="#fff"
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 40,
  },
  logoutButton: {
    width: "80%",
    borderRadius: 10,
    paddingVertical: 6,
  },
});

export default Profile;
