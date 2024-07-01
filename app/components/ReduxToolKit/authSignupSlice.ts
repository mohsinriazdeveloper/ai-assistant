import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, SignUpState, signUpState } from "./types/authSlice.d";
import { RootState } from "./store";

export const authSignUpSlice = createSlice({
  name: "authSignup",
  initialState: signUpState,
  reducers: {},
});

// export const { userLoginSuccess, userLogoutSuccess } = authSignUpSlice.actions;
export default authSignUpSlice.reducer;
export const selectAuth = (state: RootState) => state.root.auth;
