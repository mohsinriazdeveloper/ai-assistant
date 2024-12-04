import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ForChatType {
  chatId: number | null;
  newChat: boolean | undefined;
}

const initialState: ForChatType = {
  chatId: null,
  newChat: undefined,
};

export const forChatState = createSlice({
  name: "forChat",
  initialState,
  reducers: {
    isNewChat: (
      state: ForChatType,
      action: PayloadAction<{
        chatId: number | null;
        newChat: boolean | undefined;
      }>
    ) => {
      state.chatId = action.payload.chatId;
      state.newChat = action.payload.newChat;
    },
  },
});

export const { isNewChat } = forChatState.actions;
export default forChatState.reducer;
export const selectForChat = (state: RootState) => state.root.forChat;

// export const { setChats, deleteChat } = chatSessionState.actions;
// export default chatSessionState.reducer;
// export const selectChats = (state: RootState) => state.root.chatSession.chats;
