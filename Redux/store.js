import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./FeatureSlice/apiSlice";
import authReducer from "./FeatureSlice/authSlice";

export const store = configureStore({
  reducer: {
    // RTK Query reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Auth reducer
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // kabhi kabhi non-serializable values ka warning hata dega
    }).concat(apiSlice.middleware),
  // devTools: process.env.NODE_ENV !== "production", // devtools only in dev mode
});
