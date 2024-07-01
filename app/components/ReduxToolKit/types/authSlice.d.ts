export interface AuthState {
  refresh: string;
  access: string;
}
export const authState: AuthState = {
  token: "",
  access: "",
};

export interface SignUpState {
  username: string;
  email: string;
}
export const signUpState: SignUpState = {
  username: "",
  email: "",
};
