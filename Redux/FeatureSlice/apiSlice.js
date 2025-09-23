// Redux/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // reducer name
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.100.222:4000", // base URL of your API
  }),
  endpoints: () => ({}),
});
