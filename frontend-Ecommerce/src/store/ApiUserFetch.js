import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ApiUser = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:2000/api/v1/user/`,
    credentials: "include", // include cookies if you're using them
  }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    // ✅ Login
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),

    // ✅ Logout
    logoutUser: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    // ✅ Create account
    createAccount: builder.mutation({
      query: (userData) => ({
        url: 'createAccount',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    // update account
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: 'updateProfile',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    // ✅ Get current user
    getCurrentUser: builder.query({
      query: () => 'getCurrentUser',
      providesTags: ['User'],
    }),

    // ✅ Get all users (admin)
    getAllUser: builder.query({
      query: () => 'allUser',
      providesTags: ['User'],
    }),

    // ✅ Update password
    updatePassword: builder.mutation({
      query: (updatedData) => ({
        url: 'updatePassword',
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['User'],
    }),

    // ✅ Update user profile
    uploadUserImg: builder.mutation({
      query: (formData) => ({
        url: 'uploadUserProfileImg',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),

    updateProfileImg: builder.mutation({
      query: (formData) => ({
        url: 'updateProfileImg',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),

    

    deleteUser: builder.mutation({
      query: (data) => ({
        url: 'deleteUser',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // ✅ Admin: Get user by ID
    getUserByAdmin: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    // ✅ Admin: Delete user by ID
    deleteUserByAdmin: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'User', id }],
    }),
  }),
})


export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useCreateAccountMutation,
  useGetAllUserQuery,
  useGetCurrentUserQuery,
  useUpdatePasswordMutation,
  useUploadUserImgMutation,
  useUpdateProfileImgMutation,
  useUpdateProfileMutation,
  useDeleteUserMutation,
  useGetUserByAdminQuery,
  useDeleteUserByAdminMutation,
} = ApiUser;
