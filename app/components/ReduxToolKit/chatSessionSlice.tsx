import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { agentAllChatType, AgentAllChatType } from "./types/agents.d";
import { RootState } from "./store";

export const chatSessionState = createSlice({
  name: "chatSession",
  initialState: agentAllChatType,
  reducers: {
    userResult: (
      state: AgentAllChatType,
      action: PayloadAction<{
        id: number;
        title: string;
        created_at: string;
        updated_at: string;
        agent: number;
        user: number;
      }>
    ) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.created_at = action.payload.created_at;
      state.updated_at = action.payload.updated_at;
      state.agent = action.payload.agent;
      state.user = action.payload.user;
    },
  },
});

export const { userResult } = chatSessionState.actions;
export default chatSessionState.reducer;
// export const selectAuth = (state: RootState) => state.root.auth;
export const selectResult = (state: RootState) => state.root.chatSession;
