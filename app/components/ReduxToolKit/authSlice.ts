import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { authState, AuthState } from "./types/authSlice.d";

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    userLoginSuccess: (
      state: AuthState,
      action: PayloadAction<{
        refresh: string;
        access: string;
      }>
    ) => {
      state.refresh = action.payload.refresh;
      state.access = action.payload.access;
    },
    userLogoutSuccess: (
      state: AuthState,
      action: PayloadAction<{
        refresh: string;
        access: string;
      }>
    ) => {
      state.refresh = action.payload.refresh;
      state.access = action.payload.access;
    },
  },
});

export const { userLoginSuccess, userLogoutSuccess } = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.root.auth;
