import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
  }),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "api/product",
      }),
    }),

    getAdminProducts: builder.query({
      query: () => ({
        url: "/api/product/all",
      }),
    }),

    createProduct: builder.mutation({
      query: (product) => ({
        url: "api/product",
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_SERVER_URL,
        },
        body: product,
      }),
    }),

    editProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/product/${id}`,
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_SERVER_URL,
          "Content-Type": "application/json",
        },
        body: formData,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `api/product/${id}`,
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_SERVER_URL,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useCreateProductMutation,
  useGetAdminProductsQuery,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductsQuery,
} = productApi

export default productApi
