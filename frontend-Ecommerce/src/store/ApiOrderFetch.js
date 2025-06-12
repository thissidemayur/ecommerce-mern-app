import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiOrder = createApi({
  reducerPath: "ApiOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:2000/api/v1/order`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // Optionally add authentication token from state
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Order"],

  endpoints: (builder) => ({
    // New order mutation
    newOrder: builder.mutation({
      query: (orderDetail) => ({
        url: "/newOrder",
        body: orderDetail,
        method: "POST",
      }),
      invalidatesTags: ["Order"],
    }),

    // Get order by ID query
    getOrderById: builder.query({
      query: (orderId) => `/getOrder/${orderId}`,
      providesTags: ["Order"],
    }),
  }),
});

export const { useNewOrderMutation, useGetOrderByIdQuery } = ApiOrder;
