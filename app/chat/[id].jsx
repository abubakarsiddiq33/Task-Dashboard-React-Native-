import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { SafeAreaFrameContext } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-web";

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi!", sender: "me" },
    { id: "2", text: "Hello!", sender: "other" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: input, sender: "me" }]);
      setInput("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Chat with User {id}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.message, item.sender === "me" ? styles.me : styles.other]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        style={{ flex: 1 }}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { fontSize: 18, fontWeight: "bold", margin: 12 },
  message: {
    padding: 10,
    margin: 8,
    borderRadius: 8,
    maxWidth: "70%",
  },
  me: { backgroundColor: "#437c8d", alignSelf: "flex-end" },
  other: { backgroundColor: "#eee", alignSelf: "flex-start" },
  messageText: { color: "#222" },
  inputRow: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 8,
    backgroundColor: "#f9f9f9",
  },
  sendBtn: {
    backgroundColor: "#437c8d",
    borderRadius: 20,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});