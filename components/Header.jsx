// components/Header.js
import { View, Text, Image, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      {/* Left Side Title */}
      <Text style={styles.title}>DashBoard</Text>

      {/* Right Side Profile Pic */}
      <Image
        source={{ uri: "https://i.pravatar.cc/100" }}
        style={styles.profile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    backgroundColor: "#437c8d", 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginTop : 40
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
});
