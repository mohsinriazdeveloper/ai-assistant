import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { authState, AuthState } from "./types/voiceResSlice";
import { RootState } from "./store";
import { VoiceRes, voiceRes } from "./types/agents.d";

export const voiceResSlice = createSlice({
  name: "voice",
  initialState: voiceRes,
  reducers: {
    voiceResponce: (
      state: VoiceRes,
      action: PayloadAction<{
        inText: string;
        stopAudioPlaying: boolean;
      }>
    ) => {
      state.inText = action.payload.inText;
      state.stopAudioPlaying = action.payload.stopAudioPlaying;
    },
  },
});

export const { voiceResponce } = voiceResSlice.actions;
export default voiceResSlice.reducer;
export const selectAuth = (state: RootState) => state.root.auth;
export const selectVoiceResponse = (state: RootState) =>
  state.root.voice.inText;
