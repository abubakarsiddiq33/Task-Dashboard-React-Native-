// Redux/FeatureSlice/userApi.js
import { apiSlice } from "../FeatureSlice/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Signup endpoint
    signupUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // 🔹 Login endpoint
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

// ✅ Export hooks for both
export const { useSignupUserMutation, useLoginUserMutation } = userApi;
