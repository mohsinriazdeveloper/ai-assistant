import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ChatSession {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  agent: number;
  user: number;
}

interface ChatSessionState {
  chats: ChatSession[];
}

const initialState: ChatSessionState = {
  chats: [],
};

export const chatSessionState = createSlice({
  name: "chatSession",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<ChatSession[]>) => {
      state.chats = action.payload;
    },
    deleteChat: (state, action: PayloadAction<number>) => {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
    },
  },
});

export const { setChats, deleteChat } = chatSessionState.actions;
export default chatSessionState.reducer;
export const selectChats = (state: RootState) => state.root.chatSession.chats;
