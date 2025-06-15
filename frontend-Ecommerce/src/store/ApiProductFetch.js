import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiProductAuth = createApi({
  reducerPath: "ApiProductAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:2000/api/v1/product`,
    credentials: "include",
  }),
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    // 🟢 CREATE product
    createProduct: builder.mutation({
      query: (productDetail) => ({
        url: "/createProduct",
        method: "POST",
        body: productDetail,
      }),
      invalidatesTags: ["Product"],
    }),

    // 🟢 GET all user-visible products
    getAllUserProduct: builder.query({
      query: () => `/allProduct`,
      providesTags: ["Product"],
    }),

    // 🟢 GET latest products
    getLatestProduct: builder.query({
      query: () => `/latestProduct`,
      providesTags: ["Product"],
    }),

    // 🟢 GET admin's latest products
    getAdminLatestProduct: builder.query({
      query: () => `/adminLatestProduct`,
      providesTags: ["Product"],
    }),

    // 🟢 GET filtered product
    getFilteredProducts: builder.query({
      query: (queryData) => {
        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, val]) => {
          if (val !== null && val !== undefined && val !== "") {
            params.append(key, val);
          }
        });
        return `/allProduct?${params.toString()}`;
      },
      providesTags: ["Product"],
    }),

    // 🟢 GET all admin products
    getAdminProduct: builder.query({
      query: () => `/allAdminProduct`,
      providesTags: ["Product"],
    }),

    // 🟢 GET featured products
    getFeaturedProduct: builder.query({
      query: () => `/featuredProduct`,
      providesTags: ["Product"],
    }),

    // 🟢 GET single product by ID
    getSingleProduct: builder.query({
      query: (productId) => `/${productId}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // 🟢 GET product by gender and subcategory
    getSubCategoriesWithGender: builder.query({
      query: ({ gender, subCategory }) => ({
        url: `/getProductBySubCategory`,
        method: "POST",
        body: { gender, subCategory },
      }),
      providesTags: ["Product"],
    }),

    // 🟢 GET all subcategories by category
    getAllSubCategories: builder.query({
      query: (category) => ({
        url: `/allSubCategories`,
        method: "POST",
        body: { category },
      }),
      providesTags: ["Product"],
    }),

    // 🔴 DELETE product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // 🟡 UPDATE product
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateProduct/${id}`, // Ensure this matches your backend
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
  }),
});

// Auto-generated hooks
export const {
  useCreateProductMutation,
  useGetAllUserProductQuery,
  useGetLatestProductQuery,
  useGetAdminLatestProductQuery,
  useGetFilteredProductsQuery,
  useGetAdminProductQuery,
  useGetFeaturedProductQuery,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetSubCategoriesWithGenderQuery,
  useGetAllSubCategoriesQuery,
} = ApiProductAuth;

/*
NOTE:
RTK Query allows only one argument to query to use multiple argument use object

invalidatesTags is for mutations (POST/PUT/DELETE) that change data

providesTags, which tells RTK Query what data this query provides (used for caching and refetching logic)
*/
