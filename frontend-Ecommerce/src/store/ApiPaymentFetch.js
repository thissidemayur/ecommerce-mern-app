import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiRazorpayPayment = createApi({
  reducerPath: "ApiRazorpayPayment",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:2000/api/v1/payment`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // Optionally add authentication token from state
      const token = getState().auth?.token; // Assuming you have an auth slice
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["payment"],

  endpoints: (builder) => ({
    // Create Razorpay order + DB Order
    newCreateOrderUsingRazorpay: builder.mutation({
      query: (orderDetail) => ({
        url: "/create-order",
        body: orderDetail,
        method: "POST",
      }),
      invalidatesTags: ["payment"],
    }),

    // Verify Razorpay Payment
    verifyPaymentOfRazorpay: builder.mutation({
      query: (orderDetail) => ({
        url: "/verify-payment",
        body: orderDetail,
        method: "POST",
      }),
      invalidatesTags: ["payment"],
    }),
  }),
});

export const {
  useNewCreateOrderUsingRazorpayMutation,
  useVerifyPaymentOfRazorpayMutation,
} = ApiRazorpayPayment;
