import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useSignupUserMutation } from "../../Redux/FeatureSlice/authSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  // RTK Query signup hook
  // const [signupUser, { isLoading, isError, error }] = useSignupUserMutation();

  const handleSignup = async () => {

    const auth = getAuth();   
  createUserWithEmailAndPassword(auth,username, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      router.push("/auth/login");
      console.log("User signed up:", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during signup:", errorCode, errorMessage);
    });
    // try {
    //   // backend ko call
    //   const result = await signupUser({ username, email, password }).unwrap();
    //   console.log("Signed up:", result);

    //   // success alert
    //   Alert.alert("Success", `Account created for ${username}! Please login.`);

    //   // login page par redirect
    //   router.push("/auth/login");
    // } catch (err) {
    //   console.error("Signup failed:", err);
    //   Alert.alert("Error", err?.data?.message || "Signup failed!");
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
        // disabled={isLoading}
      >
        {/* <Text style={styles.buttonText}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Text> */}
      </TouchableOpacity>

      {/* {isError && (
        <Text style={{ color: "red", marginTop: 10 }}>
          {error?.data?.message || "Something went wrong"}
        </Text>
      )} */}

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.link}>
          <Link href="/auth/login">Login</Link>
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    backgroundColor: "#437c8d",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 14,
    color: "#555",
  },
  link: {
    color: "#007bff",
    fontWeight: "bold",
  },
});
