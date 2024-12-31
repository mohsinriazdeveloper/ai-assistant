import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import {
  AgentAllChatType,
  AgentChatType,
  AgentState,
  Organization,
  StateAgent,
  UserProfile,
} from "./types/agents.d";
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
    // 1 create agent endpoint
    createAgent: builder.mutation({
      query: (credentials) => ({
        url: "/accounts/agents/create/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 2 get all agents
    getAllAgents: builder.query<StateAgent[], void>({
      query: () => `/accounts/agents/`,
      providesTags: ["AllPosts"],
    }),

    // 3 get agent by Id
    getAgentById: builder.query<AgentState, number>({
      query: (id) => `/accounts/agents/${id}/`,
      providesTags: ["AllPosts"],
    }),

    // 4 get user profile
    getUserProfile: builder.query<UserProfile, void>({
      query: () => `/accounts/user/profile/`,
      providesTags: ["AllPosts"],
    }),

    // 5 update user profile
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/accounts/user/profile/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 6 update user password
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `/accounts/user/change_password/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 7 get organization
    getOrganization: builder.query<Organization, void>({
      query: () => `/accounts/org/my/`,
      providesTags: ["AllPosts"],
    }),

    // 8 add org image
    updateOrgImg: builder.mutation({
      query: (data) => ({
        url: `/accounts/org/logo/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 9 delete org image
    deleteOrgImg: builder.mutation({
      query: (id) => ({
        url: `/accounts/org/logo/`,
        method: "DELETE",
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
    getAgentChat: builder.query<AgentAllChatType[], number>({
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
    // Train by image
    trainByImage: builder.mutation({
      query: (data) => ({
        url: `/accounts/agents/image_training/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllPosts"],
    }),
    // update Instructions endpoint
    updateInstructions: builder.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/accounts/agents/instructions/update/${id}/`,
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
    // delete agent chat endpoint
    deleteChat: builder.mutation({
      query: (id) => ({
        url: `/accounts/chats/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllPosts"],
    }),
    // get specific chat from session chats by id
    getSpecificChat: builder.query<AgentChatType[], number | null>({
      query: (id) => `/accounts/chat_session_messages/${id}/`,
      providesTags: ["AllPosts"],
    }),
    // update chat session name/title
    renameChatSession: builder.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/accounts/chats/update/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AllPosts"],
    }),
  }),
});
// Export the API endpoints
export const {
  useCreateAgentMutation,
  useLazyGetAllAgentsQuery,
  useGetAgentByIdQuery,
  useGetUserProfileQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useGetOrganizationQuery,
  useUpdateOrgImgMutation,
  useDeleteOrgImgMutation,

  useGetAllAgentsQuery,
  useDeleteAgentMutation,
  useAgentVoiceMutation,
  useAgentChatMutation,
  useGetAgentChatQuery,
  useUpdateAgentMutation,
  useDeleteFileMutation,
  useDeleteChatMutation,
  useUpdateInstructionsMutation,
  useTrainByImageMutation,
  useGetSpecificChatQuery,
  useRenameChatSessionMutation,
} = userApi;
