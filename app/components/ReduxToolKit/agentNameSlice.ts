import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface AgentNameType {
  agentName: string;
}

const initialState: AgentNameType = {
  agentName: "",
};

export const agentNameState = createSlice({
  name: "agentName",
  initialState,
  reducers: {
    setAgentName: (
      state: AgentNameType,
      action: PayloadAction<{
        agentName: string;
      }>
    ) => {
      state.agentName = action.payload.agentName;
    },
  },
});

export const { setAgentName } = agentNameState.actions;
export default agentNameState.reducer;
export const selectAgentName = (state: RootState) => state.root.agentName;
