import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (profile) => ({
        url: "login",
        method: "POST",
        body: profile,
      }),
    }),
    signup: builder.mutation({
      query: (profile) => ({
        url: "signup",
        method: "POST",
        body: profile,
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: "logout",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "api/user",
      }),
    }),
  }),
})

export const {useLoginMutation,useSignupMutation, useGetUserQuery, useLogoutQuery} = authApi

export default authApi