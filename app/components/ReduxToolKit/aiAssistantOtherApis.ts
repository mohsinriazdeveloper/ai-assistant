import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Ids } from "../Connect/ConnectionRawData";
import { RootState } from "./store";
import {
  AgentAllChatType,
  AgentChatType,
  AgentState,
  ApiConnection,
  GetExchangeRate,
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

    // 10 post files/images and get character count
    fileCharCount: builder.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/accounts/agents/${id}/sources/character_counter/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 11 train agent by files
    trainByFiles: builder.mutation({
      query: (data) => ({
        url: `/accounts/agents/train_files/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 12 train agent by images
    trainByImages: builder.mutation({
      query: (data) => ({
        url: `/accounts/agents/train_images/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 13 train agent by website
    trainByWebsite: builder.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/accounts/agents/${id}/train_websites/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 14 update agent text, QA and other
    updateAgent: builder.mutation({
      query: (data) => ({
        url: `/accounts/agents/update/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 15 get source api connections
    getSourceApiConnections: builder.query<ApiConnection[], number>({
      query: (id) => `/accounts/agents/${id}/source_api_connections/`,
      providesTags: ["AllPosts"],
    }),

    // 16 delete source api connections
    disconnectApiConnection: builder.mutation({
      query: ({ id, agentId }: { id: number; agentId: number }) => ({
        url: `/accounts/agents/${agentId}/source_api_connections/${id}/disconnect/`,
        method: "POST",
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 17 connect source api connections
    apiConnection: builder.mutation({
      query: ({ id, agentId }: { id: number; agentId: number }) => ({
        url: `/accounts/agents/${agentId}/source_api_connections/${id}/connect/`,
        method: "POST",
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 18 get recent exhange rates
    getExchangeRate: builder.query<GetExchangeRate, Ids>({
      query: (ids) =>
        `/accounts/agents/${ids.agentId}/source_api_connections/${ids.id}/exchange_rates/`,
      providesTags: ["AllPosts"],
    }),

    // 19 update exchange rate by id
    updateExchangeRateById: builder.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/accounts/agents/source_api_connections/exchange_rates/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 20 reset exchange rate
    resetExchangeRate: builder.mutation({
      query: ({ id, agentId }: { id: number; agentId: number }) => ({
        url: `/accounts/agents/${agentId}/source_api_connections/${id}/exchange_rates/reset/`,
        method: "POST",
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 21 get all graphs
    getAllGraphs: builder.query<ApiConnection[], number>({
      query: (id) =>
        `/accounts/agents/${id}/tools/dashboard/graph_api_connections/`,
      providesTags: ["AllPosts"],
    }),

    // 22 connect graph
    connectGraph: builder.mutation({
      query: ({
        id,
        agentId,
        data,
      }: {
        id: number;
        agentId: number;
        data: any;
      }) => ({
        url: `/accounts/agents/${agentId}/tools/dashboard/graph_api_connections/${id}/connect/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 23 get graph data by id
    getGraphData: builder.query<GetExchangeRate, Ids>({
      query: (ids) =>
        `/accounts/agents/${ids.agentId}/tools/dashboard/graph_api_connections/data/${ids.id}/`,
      providesTags: ["AllPosts"],
    }),

    // 24 disconnect graph
    disConnectGraph: builder.mutation({
      query: ({ id, agentId }: { id: number; agentId: number }) => ({
        url: `/accounts/agents/${agentId}/tools/dashboard/graph_api_connections/${id}/disconnect/`,
        method: "POST",
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // 25 reset graph data
    resetGraph: builder.mutation({
      query: ({ id, agentId }: { id: number; agentId: number }) => ({
        url: `/accounts/agents/${agentId}/tools/dashboard/graph_api_connections/${id}/reset/`,
        method: "POST",
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
  useFileCharCountMutation,
  useTrainByFilesMutation,
  useTrainByImagesMutation,
  useTrainByWebsiteMutation,
  useUpdateAgentMutation,
  useGetSourceApiConnectionsQuery,
  useDisconnectApiConnectionMutation,
  useApiConnectionMutation,
  useGetExchangeRateQuery,
  useUpdateExchangeRateByIdMutation,
  useResetExchangeRateMutation,
  useGetAllGraphsQuery,
  useConnectGraphMutation,
  useGetGraphDataQuery,
  useDisConnectGraphMutation,
  useResetGraphMutation,

  useGetAllAgentsQuery,
  useDeleteAgentMutation,
  useAgentVoiceMutation,
  useAgentChatMutation,
  useGetAgentChatQuery,
  useDeleteFileMutation,
  useDeleteChatMutation,
  useUpdateInstructionsMutation,
  useTrainByImageMutation,
  useGetSpecificChatQuery,
  useRenameChatSessionMutation,
} = userApi;
