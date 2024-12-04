import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define your base query function
const baseQuery = fetchBaseQuery({
  // baseUrl: process.env.NEXT_PUBLIC_API_URL,
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  // baseUrl: "https://b8e8-110-39-11-218.ngrok-free.app",
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState() as RootState).root?.auth?.access;
  //   console.log("here", token);
  //   if (token) {
  //     headers.set("authorization", `Bearer ${token}`);
  //   }

  //   return headers;
  // },
});
// Create an API using createApi

export const authApi = createApi({
  reducerPath: "adminAuth",
  baseQuery,
  endpoints: (builder) => ({
    // login query endpoint
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: "/accounts/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    // signUp query endpoint
    userSignUp: builder.mutation({
      query: (credentials) => ({
        url: "/accounts/register/",
        method: "POST",
        body: credentials,
      }),
    }),
    // forgot password query endpoint
    userForgot: builder.mutation({
      query: (credentials) => ({
        url: "/accounts/forgot_password/",
        method: "POST",
        body: credentials,
      }),
    }),
    // forgot password reset query endpoint
    userPasswordReset: builder.mutation({
      query: (credentials) => ({
        url: "/accounts/reset_password/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
// Export the API endpoints
export const {
  useUserLoginMutation,
  useUserSignUpMutation,
  useUserForgotMutation,
  useUserPasswordResetMutation,
} = authApi;
