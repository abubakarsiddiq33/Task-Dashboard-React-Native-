// src/store/slices/taskSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase";

const auth = getAuth();

// Fetch tasks for current user
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) return rejectWithValue("User not authenticated");

      const tasksQuery = query(
        collection(db, "tasks"),
        where("ownerUid", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(tasksQuery);
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Create new task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ userId, taskData }, { rejectWithValue }) => {
    try {
      const newTask = {
        ...taskData,
        ownerUid: userId,
        completed: false,
        // createdAt: serverTimestamp(),
        // updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "tasks"), newTask);
      
      return {
        id: docRef.id,
        ...newTask,
        // createdAt: new Date().toISOString(),
        // updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error creating task:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updates }, { rejectWithValue }) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, {
        ...updates,
        // updatedAt: serverTimestamp(),
      });

      return { taskId, updates };
    } catch (error) {
      console.error("Error updating task:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Toggle task completion
export const toggleTaskCompletion = createAsyncThunk(
  "tasks/toggleTaskCompletion",
  async ({ taskId, completed }, { rejectWithValue }) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, {
        completed: !completed,
        // updatedAt: serverTimestamp(),
      });

      return { taskId, completed: !completed };
    } catch (error) {
      console.error("Error toggling task:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      return taskId;
    } catch (error) {
      console.error("Error deleting task:", error);
      return rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isLoading: false,
    error: null,
    searchQuery: "",
    filterPriority: "All",
    filterStatus: "All",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterPriority: (state, action) => {
      state.filterPriority = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create Task
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Task
      .addCase(updateTask.fulfilled, (state, action) => {
        const { taskId, updates } = action.payload;
        const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = {
            ...state.tasks[taskIndex],
            ...updates,
          };
        }
      })

      // Toggle Task Completion
      .addCase(toggleTaskCompletion.fulfilled, (state, action) => {
        const { taskId, completed } = action.payload;
        const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          state.tasks[taskIndex].completed = completed;
        }
      })

      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const { setSearchQuery, setFilterPriority, setFilterStatus, clearError } =
  taskSlice.actions;

// Selectors
export const selectAllTasks = (state) => state.tasks.tasks;
export const selectIsLoading = (state) => state.tasks.isLoading;
export const selectError = (state) => state.tasks.error;
export const selectCompletedTasks = (state) => {
  return state.tasks.tasks.filter((task) => task.completed === true);
};
export const selectPendingTasks = (state) => {
 return state.tasks.tasks.filter((task) => task.completed === false);

};

export const selectFilteredTasks = (state) => {
  const { tasks, searchQuery, filterPriority, filterStatus } = state.tasks;

  return tasks.filter((task) => {
    // Search filter
    const matchesSearch =
      task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());

    // Priority filter
    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority;

    // Status filter
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Completed" && task.completed) ||
      (filterStatus === "Pending" && !task.completed);


      

    return matchesSearch && matchesPriority && matchesStatus;
  });
};

export default taskSlice.reducer;