import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Firebase";
import { createTask } from "../Redux/FeatureSlice/taskSlice";

const authFirebase = getAuth();
const db = getFirestore();

async function fetchMyTasks() {
  const user = authFirebase.currentUser;
  if (!user) return []; // Agar user null hai toh empty array
  const q = query(
    collection(db, "tasks"),
    where("uid", "==", user.uid) // Sirf apne UID ke tasks
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export default function TaskModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");
  // const [dueDate, setDueDate] = useState(newDate());
  const [estimatedHours, setEstimatedHours] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const handleSave = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Title aur Description required hain!");
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      Alert.alert("Not signed in", "Please sign in to create tasks.");
      return;
    }

    try {
      const taskData = {
        title,
        description,
        priority,
        category,
        // dueDate,
        estimatedHours: estimatedHours ? parseInt(estimatedHours) : 0,
        tags: tagsInput ? tagsInput.split(",").map((tag) => tag.trim()) : [],
      };

      
      await dispatch(createTask({ userId: auth.currentUser.uid, taskData: taskData })).unwrap();

      Alert.alert("Success", "Task created successfully!");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      Alert.alert("Error", error || "Task create failed!");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setCategory("General");
    // setDueDate("");
    setEstimatedHours("");
    setTagsInput("");
  };

  const handleClose = () => {
    Keyboard.dismiss();
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Create New Task</Text>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={styles.scrollContent}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Task Title *"
                    placeholderTextColor="#999"
                    value={title}
                    onChangeText={setTitle}
                    returnKeyType="next"
                  />

                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Description *"
                    placeholderTextColor="#999"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    returnKeyType="done"
                  />

                  <Text style={styles.label}>Priority</Text>
                  <View style={styles.priorityRow}>
                    {["High", "Medium", "Low"].map((level) => (
                      <TouchableOpacity
                        key={level}
                        style={[
                          styles.priorityBtn,
                          priority === level && styles.activePriority,
                        ]}
                        onPress={() => setPriority(level)}
                      >
                        <Text
                          style={[
                            styles.priorityText,
                            priority === level && styles.activePriorityText,
                          ]}
                        >
                          {level}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <TextInput
                    style={styles.input}
                    placeholder="Category"
                    placeholderTextColor="#999"
                    value={category}
                    onChangeText={setCategory}
                    returnKeyType="next"
                  />

                  {/* <TextInput
                    style={styles.input}
                    placeholder="Due Date (e.g. 2025-12-31)"
                    placeholderTextColor="#999"
                    value={dueDate}
                    onChangeText={setDueDate}
                    returnKeyType="next"
                  /> */}

                  <TextInput
                    style={styles.input}
                    placeholder="Estimated Hours"
                    placeholderTextColor="#999"
                    value={estimatedHours}
                    onChangeText={setEstimatedHours}
                    keyboardType="numeric"
                    returnKeyType="next"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Tags (comma separated)"
                    placeholderTextColor="#999"
                    value={tagsInput}
                    onChangeText={setTagsInput}
                    returnKeyType="done"
                  />
                </ScrollView>

                <View style={styles.btnRow}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={handleClose}
                    disabled={isLoading}
                  >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.saveBtn, isLoading && styles.saveBtnDisabled]}
                    onPress={handleSave}
                    disabled={isLoading}
                  >
                    <Text style={styles.saveBtnText}>
                      {isLoading ? "Saving..." : "Save Task"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
  },
  modalBox: {
    width: "100%",
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
  },
  scrollContent: {
    paddingBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    backgroundColor: "#fafafa",
    fontSize: 15,
    color: "#333",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },
  label: {
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 15,
    color: "#333",
  },
  priorityRow: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 10,
  },
  priorityBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  activePriority: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  priorityText: {
    color: "#666",
    fontWeight: "600",
    fontSize: 14,
  },
  activePriorityText: {
    color: "#fff",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelBtnText: {
    color: "#666",
    fontWeight: "600",
    fontSize: 16,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveBtnDisabled: {
    backgroundColor: "#87BFFF",
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});