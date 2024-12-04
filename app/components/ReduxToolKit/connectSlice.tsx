import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ConnectType {
  updateConnectStatus: boolean;
}

const initialState: ConnectType = {
  updateConnectStatus: false,
};

export const connectTypeState = createSlice({
  name: "connect",
  initialState,
  reducers: {
    isConnectSlice: (
      state: ConnectType,
      action: PayloadAction<{
        updateConnectStatus: boolean;
      }>
    ) => {
      state.updateConnectStatus = action.payload.updateConnectStatus;
    },
  },
});

export const { isConnectSlice } = connectTypeState.actions;
export default connectTypeState.reducer;
export const selectIsConnect = (state: RootState) => state.root.connect;

// export const { setChats, deleteChat } = chatSessionState.actions;
// export default chatSessionState.reducer;
// export const selectChats = (state: RootState) => state.root.chatSession.chats;
