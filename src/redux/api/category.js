import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.SERVER_URL,
  }),

  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "api/category",
      }),
    }),
    getCategoryProducts: builder.query({
      query: (name) => ({
        url: `api/category/${name}`,
      }),
    }),
  }),
})

export const {useGetCategoriesQuery, useGetCategoryProductsQuery} = categoryApi

export default categoryApi