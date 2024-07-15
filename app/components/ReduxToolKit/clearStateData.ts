// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "./store";
// import {
//   AgentState,
//   FileUrl,
//   Organization,
//   agentState,
// } from "./types/agents.d";

// export const clearStateData = createSlice({
//   name: "cleardata",
//   initialState: agentState,
//   reducers: {
//     clearDataSucces: (
//       state: AgentState,
//       action: PayloadAction<{
//         id: number;
//         organization?: Organization | null;
//         file_urls?: FileUrl[] | null;
//         name?: string;
//         text?: string;
//         qa?: string;
//         ran_id?: string;
//         status?: string;
//         model?: string;
//         visibility?: string;
//         temperature?: number;
//         created_at?: string;
//         updated_at?: string;
//         customuser?: number;
//       }>
//     ) => {
//       state.id = action.payload.id;
//       state.organization = action.payload.organization;
//       state.file_urls = action.payload.file_urls;
//       state.name = action.payload.name;
//       state.text = action.payload.text;
//       state.qa = action.payload.qa;
//       state.ran_id = action.payload.ran_id;
//       state.status = action.payload.status;
//       state.model = action.payload.model;
//       state.visibility = action.payload.visibility;
//       state.temperature = action.payload.temperature;
//       state.created_at = action.payload.created_at;
//       state.updated_at = action.payload.updated_at;
//       state.customuser = action.payload.customuser;
//     },
//   },
// });

// export const { clearDataSucces } = clearStateData.actions;
// export default clearStateData.reducer;
// export const selectAuth = (state: RootState) => state.root.auth;
