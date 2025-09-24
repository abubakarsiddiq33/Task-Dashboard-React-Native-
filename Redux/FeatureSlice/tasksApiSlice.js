import { apiSlice } from "./apiSlice";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => "/tasks/find-all-tasks",
      providesTags: ["Tasks"],
    }),

    createTask: builder.mutation({
      query: (taskData) => ({
        url: "/tasks",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["Tasks"], // ✅ Refresh task list after creating
    }),

    getCompletedTasks: builder.query({
      query: () => "/tasks/completed-task",
      providesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useGetCompletedTasksQuery,
} = tasksApiSlice;
