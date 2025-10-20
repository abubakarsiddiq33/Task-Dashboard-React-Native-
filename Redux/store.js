import { configureStore } from '@reduxjs/toolkit';
import authReducer from './FeatureSlice/authSlice';
import taskReducer from './FeatureSlice/taskSlice';

export const store = configureStore({
  reducer: {
    // Yahan saare slices add kiye jaate hain
    auth: authReducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore Firebase Timestamp serialization warnings
        ignoredActions: ["tasks/createTask/fulfilled", "tasks/fetchTasks/fulfilled"],
        ignoredPaths: ["tasks.tasks.createdAt", "tasks.tasks.updatedAt"],
      },
    }),
});
