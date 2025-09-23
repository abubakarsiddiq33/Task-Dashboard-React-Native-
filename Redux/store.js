import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./FeatureSlice/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;