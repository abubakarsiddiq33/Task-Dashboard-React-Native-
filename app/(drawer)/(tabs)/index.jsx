import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import TaskModal from "../../../components/TaskModal";
import { Provider, useSelector } from "react-redux";
import store from "../../../Redux/store";

export default function HomeScreen() {
  const [isChecked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
 

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          placeholder="Search..."
          style={styles.searchBar}
          placeholderTextColor="#888"
        />

        {/* Task Card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.titleRow}
            onPress={() => setChecked(!isChecked)}
            activeOpacity={0.7}
          >
            {/* Custom checkbox box */}
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
              {isChecked && <Text style={styles.checkmark}>✓</Text>}
            </View>

            <Text style={styles.title}>
              Design responsive layout components
            </Text>
          </TouchableOpacity>

          {/* Description */}
          <Text style={styles.description}>
            Create mobile-first responsive components with Flexbox and CSS Grid
          </Text>

          {/* Badges Row */}
          <View style={styles.badgesRow}>
            <View style={[styles.badge, { backgroundColor: "#ffe4b3" }]}>
              <Text style={{ color: "#d9822b", fontSize: 10 }}>MEDIUM</Text>
            </View>
            <Text style={styles.meta}>✅ Completed</Text>
            <Text style={styles.meta}>⏱️ 3h spent</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>css</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>responsive</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>ui</Text>
            </View>
          </View>
        </View>

        {/* Floating Plus Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>

        {/* Task Modal */}
        <TaskModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  card: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#437c8d",
    borderColor: "#437c8d",
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  meta: {
    fontSize: 12,
    color: "#444",
    marginRight: 10,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#eef2f7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    color: "#555",
  },

  // Floating Action Button
  fab: {
  position: "absolute",
  bottom: 5, // tab ke upar overlap
  alignSelf: "center", // center align karega
  backgroundColor: "#437c8d",
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: "center",
  alignItems: "center",
  elevation: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
},

  fabText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
});
