import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TaskModal from "../../../components/TaskModal";
import { auth } from "../../../Firebase";
import {
  fetchTasks,
  toggleTaskCompletion,
  setSearchQuery,
  selectFilteredTasks,
  selectIsLoading,
} from "../../../Redux/FeatureSlice/taskSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const tasks = useSelector(selectFilteredTasks);
  const isLoading = useSelector(selectIsLoading);
  const searchQuery = useSelector((state) => state.tasks.searchQuery);

  // Load tasks when component mounts
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      async function fetchMyTasks() {
        const user = auth.currentUser;
        const q = query(collection(db, "tasks"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      }
      dispatch(fetchTasks(user.uid));
    }
  }, [dispatch]);

  // Refresh tasks
  const handleRefresh = () => {
    const user = auth.currentUser;
    if (user) {
      dispatch(fetchTasks(user.uid));
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalVisible(false);
  };

  // Handle search
  const handleSearch = (text) => {
    dispatch(setSearchQuery(text));
  };

  // Handle checkbox toggle
  const handleToggleComplete = (taskId, completed) => {
    dispatch(toggleTaskCompletion({ taskId, completed }));
  };

  const renderTask = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.titleRow}
        onPress={() => handleToggleComplete(item.id, item.completed)}
        activeOpacity={0.7}
      >
        {/* Custom checkbox */}
        <View
          style={[styles.checkbox, item.completed && styles.checkboxChecked]}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>

        <Text style={[styles.title, item.completed && styles.completedTitle]}>
          {item.title}
        </Text>
      </TouchableOpacity>

      <Text
        style={[
          styles.description,
          item.completed && styles.completedDescription,
        ]}
      >
        {item.description}
      </Text>

      {/* Badges Row */}
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
          <Text style={styles.badgeText}>
            {item.completed ? "✅ Done" : "⏳ Pending"}
          </Text>
        </View>
        {item.estimatedHours > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⏱️ {item.estimatedHours}h</Text>
          </View>
        )}
      </View>

      {/* Category */}
      {/* {item.category && (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>📁 {item.category}</Text>
        </View>
      )} */}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <View style={styles.tagsRow}>
          {item.tags.map((tag, idx) => (
            <View style={styles.tag} key={idx}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Due Date */}
      {item.dueDate && (
        <Text style={styles.dueDate}>📅 Due: {item.dueDate}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        {/* Search Bar */}
        <TextInput
          placeholder="Search tasks..."
          style={styles.searchBar}
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {/* Loading and Error States */}
        {isLoading && tasks.length === 0 && (
          <View style={styles.centerContainer}>
            <Text style={styles.loadingText}>Loading tasks...</Text>
          </View>
        )}

        {!isLoading && tasks.length === 0 && (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>
              {searchQuery
                ? "No tasks found matching your search"
                : "No tasks yet. Create your first task!"}
            </Text>
          </View>
        )}

        {/* Tasks List */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              colors={["#437c8d"]}
            />
          }
          showsVerticalScrollIndicator={false}
        />

        {/* Floating Plus Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>

        {/* Task Modal */}
        <TaskModal visible={modalVisible} onClose={handleModalClose} />
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
    height: 48,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 15,
  },
  listContent: {
    paddingBottom: 100,
    gap: 12,
  },
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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#437c8d",
    borderColor: "#437c8d",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
  },
  badgeText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "500",
  },
  categoryContainer: {
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 13,
    color: "#666",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: "#1976d2",
    fontWeight: "500",
  },
  dueDate: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  completedTitle: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
  completedDescription: {
    opacity: 0.5,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#437c8d",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "300",
  },
});
