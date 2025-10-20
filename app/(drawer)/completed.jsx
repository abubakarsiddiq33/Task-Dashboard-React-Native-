import React from "react";
import { useSelector } from "react-redux";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { selectCompletedTasks } from "../../Redux/FeatureSlice/taskSlice";

export default function CompleteTask() {
  const completedTasks = useSelector(selectCompletedTasks);

  if (completedTasks.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No completed tasks found.</Text>
      </View>
    );
  }

  const renderTask = ({ item }) => (
    <View style={styles.card}>
      {/* ✅ Title Row */}
      <View style={styles.titleRow}>
        <View style={[styles.checkbox, styles.checkboxChecked]}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        <Text style={[styles.title, styles.completedTitle]}>{item.title}</Text>
      </View>

      {/* ✅ Description */}
      <Text style={[styles.description, styles.completedDescription]}>{item.description}</Text>

      {/* ✅ Badges Row */}
      <View style={styles.badgesRow}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                item.priority === "High"
                  ? "#ffebee"
                  : item.priority === "Medium"
                  ? "#fff3e0"
                  : "#e8f5e8",
            },
          ]}
        >
          <Text
            style={{
              color:
                item.priority === "High"
                  ? "#d32f2f"
                  : item.priority === "Medium"
                  ? "#f57c00"
                  : "#388e3c",
              fontSize: 10,
              fontWeight: "600",
            }}
          >
            {item.priority?.toUpperCase()}
          </Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✅ Completed</Text>
        </View>
        {item.estimatedHours > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⏱️ {item.estimatedHours}h</Text>
          </View>
        )}
      </View>

      {/* ✅ Tags */}
      {item.tags && item.tags.length > 0 && (
        <View style={styles.tagsRow}>
          {item.tags.map((tag, idx) => (
            <View style={styles.tag} key={idx}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      {/* ✅ Due Date */}
      {item.dueDate && <Text style={styles.dueDate}>📅 Due: {item.dueDate}</Text>}
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  container: { flex: 1, padding: 16 },
  listContent: { paddingBottom: 100, gap: 12 },
  card: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 4,
  },
  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#437c8d",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxChecked: { backgroundColor: "#437c8d", borderColor: "#437c8d" },
  checkmark: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  title: { fontSize: 17, fontWeight: "600", color: "#333", flex: 1 },
  completedTitle: { textDecorationLine: "line-through", opacity: 0.6 },
  description: { fontSize: 14, color: "#666", marginBottom: 12, lineHeight: 20 },
  completedDescription: { opacity: 0.6 },
  badgesRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 8 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
  },
  badgeText: { fontSize: 12, color: "#555", fontWeight: "500" },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 8 },
  tag: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: { fontSize: 12, color: "#1976d2", fontWeight: "500" },
  dueDate: { fontSize: 13, color: "#666", marginTop: 4 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: { fontSize: 16, color: "#999", textAlign: "center", paddingHorizontal: 40 },
});
