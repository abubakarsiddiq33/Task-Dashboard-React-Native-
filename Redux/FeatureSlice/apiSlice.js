import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.100.222:4000", // apna backend ka base URL
    prepareHeaders: async (headers) => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Tasks"], // ✅ yahan sari tag types define karo
  endpoints: () => ({}),
});
