// src/store/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase";

// 🔹 Async thunk: Signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password, displayName,photoURL }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Update user profile with displayName
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL , // default profile pic
      });

      // Return the updated user info to Redux
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Async thunk: Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,  
        photoURL: userCredential.user.photoURL,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Async thunk: Logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
    console.log("Firebase signOut successful");
    return null;
  } catch (error) {
    console.error("Logout error:", error);
    return rejectWithValue(error.message);
  }
});

// 🔹 Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },

  // ✅ Manual reducers (for _layout.js Firebase listener)
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🧩 Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🧩 Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🧩 Logout
      .addCase(logoutUser.pending, (state) => {
        console.log("Logout pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        console.log("Logout fulfilled - setting currentUser to null");
        state.currentUser = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.log("Logout rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });                                                                                    
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
