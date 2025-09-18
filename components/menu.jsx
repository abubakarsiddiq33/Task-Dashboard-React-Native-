import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";

// Dummy data
const navigationItems = [
  { id: "today", title: "Today", icon: "📅", badge: 2 },
  { id: "important", title: "Important", icon: "⭐", badge: null },
  { id: "analytics", title: "Analytics", icon: "📊", badge: 5 },
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState("today");

  const renderItem = ({ item }) => {
    const isActive = activeTab === item.id;

    return (
      <Pressable
        onPress={() => setActiveTab(item.id)}
        style={[
          styles.item,
          isActive ? styles.activeItem : styles.inactiveItem,
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text
            style={[
              styles.icon,
              isActive
                ? { color: "#fff" }
                : item.id === "important"
                ? { color: "#facc15" } // yellow
                : item.id === "today"
                ? { color: "#22c55e" } // green
                : item.id === "analytics"
                ? { color: "#f97316" } // orange
                : { color: "#374151" }, // gray
            ]}
          >
            {item.icon}
          </Text>
          <Text
            style={[
              styles.title,
              isActive ? { color: "#fff" } : { color: "#374151" },
            ]}
          >
            {item.title}
          </Text>
        </View>

        {item.badge !== null && (
          <View style={styles.badge}>
            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>
              {item.badge}
            </Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      <FlatList
        data={navigationItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activeItem: {
    backgroundColor: "#6366f1", // indigo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inactiveItem: {
    backgroundColor: "#f9fafb", // light gray
  },
  icon: {
    fontSize: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  badge: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
  },
});
