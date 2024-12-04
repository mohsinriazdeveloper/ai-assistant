import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { signUpState } from "./types/authSlice.d";

export const authSignUpSlice = createSlice({
  name: "authSignup",
  initialState: signUpState,
  reducers: {},
});

export default authSignUpSlice.reducer;
export const selectAuth = (state: RootState) => state.root.auth;
