import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CreateAgentType {
  createAgentStatus: boolean;
}

const initialState: CreateAgentType = {
  createAgentStatus: true,
};

export const createAgentState = createSlice({
  name: "createAgent",
  initialState,
  reducers: {
    setCreateAgent: (
      state: CreateAgentType,
      action: PayloadAction<{
        createAgentStatus: boolean;
      }>
    ) => {
      state.createAgentStatus = action.payload.createAgentStatus;
    },
  },
});

export const { setCreateAgent } = createAgentState.actions;
export default createAgentState.reducer;
export const selectCreateAgent = (state: RootState) => state.root.createAgent;
