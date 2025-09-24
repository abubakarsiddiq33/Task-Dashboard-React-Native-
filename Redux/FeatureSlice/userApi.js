import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getAllUsers: builder.query({
      query: () => "/users/find-all",
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
} = userApi;
