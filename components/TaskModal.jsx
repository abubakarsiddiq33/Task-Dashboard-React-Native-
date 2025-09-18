import { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

export default function TaskModal({ visible, onClose }) {
  return (
    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={visible}
    //   onRequestClose={onClose}
    // >
    //   <View style={styles.overlay}>
    //     <View style={styles.modalContainer}>
    //       <Text style={styles.heading}>Add Task</Text>

    //       {/* Title */}
    //       <TextInput
    //         placeholder="Enter Title"
    //         style={styles.input}
    //         value={title}
    //         onChangeText={setTitle}
    //       />

    //       {/* Description */}
    //       <TextInput
    //         placeholder="Enter Description"
    //         style={styles.input}
    //         value={description}
    //         onChangeText={setDescription}
    //         multiline
    //       />

    //       {/* Level */}
    //       <TextInput
    //         placeholder="Enter Level (Easy, Medium, Hard)"
    //         style={styles.input}
    //         value={level}
    //         onChangeText={setLevel}
    //       />

    //       {/* Time */}
    //       <TextInput
    //         placeholder="Enter Time (e.g. 2h, 30m)"
    //         style={styles.input}
    //         value={time}
    //         onChangeText={setTime}
    //       />

    //       {/* Buttons */}
    //       <View style={styles.btnRow}>
    //         <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
    //           <Text style={styles.btnText}>Cancel</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={styles.saveBtn}>
    //           <Text style={styles.btnText}>Save</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </View>
    // </Modal>

    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>New Task</Text>

          <TextInput
            style={styles.input}
            placeholder="Title"
            // value={title}
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            // value={description}

            multiline
          />

          <Text style={styles.label}>Priority:</Text>
          <View style={styles.priorityRow}>
            {["High", "Medium", "Low"].map((level) => (
              <TouchableOpacity key={level} style={[styles.priorityBtn]}>
                <Text style={[styles.priorityText]}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Category"
            // value={category}
          />

          <TextInput
            style={styles.input}
            placeholder="Due Date (e.g. 2025-09-10)"
            // value={dueDate}
          />

          <TextInput
            style={styles.input}
            placeholder="Estimated Hours"
            // value={estHours}

            keyboardType="numeric"
          />

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
         
        </View>
      </View>
    </Modal>
  );
}

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     width: "90%",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//     elevation: 5,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 12,
//   },
//   btnRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   cancelBtn: {
//     flex: 1,
//     backgroundColor: "#999",
//     padding: 12,
//     borderRadius: 8,
//     marginRight: 8,
//   },
//   saveBtn: {
//     flex: 1,
//     backgroundColor: "#437c8d",
//     padding: 12,
//     borderRadius: 8,
//     marginLeft: 8,
//   },
//   btnText: {
//     color: "#fff",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  heading: { fontSize: 22, marginBottom: 20, fontWeight: "bold" },
  resultBox: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
  },
  resultText: { fontWeight: "bold", marginBottom: 5 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: { fontSize: 20, marginBottom: 15, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
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
    marginTop: 10,
  },
});


