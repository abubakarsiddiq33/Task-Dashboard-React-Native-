"use client";
import { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useCreateTaskMutation } from "../Redux/FeatureSlice/tasksApiSlice";

export default function TaskModal({ visible, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [category, setCategory] = useState("General");
  const [dueDate, setDueDate] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [assignedUser, setAssignedUser] = useState("");

  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleSave = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Title aur Description required hain!");
      return;
    }

    const newTask = {
      title,
      description,
      priority,
      category,
      dueDate,
      estimatedHours,
      tags: tagsInput.split(",").map((tag) => tag.trim()),
      assignedUser,
    };

    try {
      await createTask(newTask).unwrap();
      Alert.alert("Success", "Task created successfully!");
      // reset fields
      setTitle("");
      setDescription("");
      setPriority("Normal");
      setCategory("General");
      setDueDate("");
      setEstimatedHours("");
      setTagsInput("");
      setAssignedUser("");

      onClose(); // modal close
    } catch (err) {
      console.error("Task create error:", err);
      Alert.alert("Error", err?.data?.message || "Task create failed!");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>New Task</Text>

          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Priority:</Text>
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
                    priority === level && { color: "#fff" },
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
            value={category}
            onChangeText={setCategory}
          />

          <TextInput
            style={styles.input}
            placeholder="Due Date (e.g. 2025-09-10)"
            value={dueDate}
            onChangeText={setDueDate}
          />

          <TextInput
            style={styles.input}
            placeholder="Estimated Hours"
            value={estimatedHours}
            onChangeText={setEstimatedHours}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Tags (comma separated)"
            value={tagsInput}
            onChangeText={setTagsInput}
          />

          <TextInput
            style={styles.input}
            placeholder="Assign to (User ID / Name)"
            value={assignedUser}
            onChangeText={setAssignedUser}
          />

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSave}
              disabled={isLoading}
            >
              <Text style={styles.btnText}>
                {isLoading ? "Saving..." : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  label: { fontWeight: "bold", marginBottom: 5 },
  priorityRow: { flexDirection: "row", marginBottom: 15 },
  priorityBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  activePriority: { backgroundColor: "#007BFF", borderColor: "#007BFF" },
  priorityText: { color: "#000" },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  cancelBtn: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveBtn: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
