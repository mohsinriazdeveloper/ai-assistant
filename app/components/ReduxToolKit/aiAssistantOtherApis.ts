import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { AgentChatType, AgentState, Organization } from "./types/agents";
// Define your base query function
const baseQuery = fetchBaseQuery({
  // baseUrl: process.env.NEXT_PUBLIC_API_URL,
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  // baseUrl: "https://b8e8-110-39-11-218.ngrok-free.app",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).root?.auth?.access;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
// Create an API using createApi

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["AllPosts"],
  endpoints: (builder) => ({
    //get all agents
    getAllAgents: builder.query<AgentState[], void>({
      query: () => `/accounts/agents/`,

      providesTags: ["AllPosts"],
    }),

    //get organization
    getOrganization: builder.query<Organization, void>({
      query: () => `/accounts/org/my/`,
      providesTags: ["AllPosts"],
    }),

    // create agent endpoint
    createAgent: builder.mutation({
      query: (credentials) => ({
        url: "/accounts/agents/create/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["AllPosts"],
    }),
    //agent voice
    agentVoice: builder.mutation({
      query: (credentials) => ({
        url: "/voice/process_audio/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["AllPosts"],
    }),
    //chat with agent
    agentChat: builder.mutation({
      query: (credentials) => ({
        url: "/voice/process_text/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["AllPosts"],
    }),
    // get whole agent chat
    getAgentChat: builder.query<AgentChatType, number>({
      query: (id) => `/accounts/chats/${id}/`,
      providesTags: ["AllPosts"],
    }),
    // delete agent endpoint
    deleteAgent: builder.mutation({
      query: (id) => ({
        url: `/accounts/agents/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllPosts"],
    }),
    // update agent endpoint
    updateAgent: builder.mutation({
      query: (data) => ({
        url: `/accounts/agents/update/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllPosts"],
    }),
    // delete agent file endpoint /accounts/agents/files/delete/29/
    deleteFile: builder.mutation({
      query: (id) => ({
        url: `/accounts/agents/files/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllPosts"],
    }),
  }),
});
// Export the API endpoints
export const {
  useCreateAgentMutation,
  useLazyGetAllAgentsQuery,
  useGetAllAgentsQuery,
  useGetOrganizationQuery,
  useDeleteAgentMutation,
  useAgentVoiceMutation,
  useAgentChatMutation,
  useGetAgentChatQuery,
  useUpdateAgentMutation,
  useDeleteFileMutation,
} = userApi;
