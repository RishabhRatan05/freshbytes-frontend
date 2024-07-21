import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const productApi = createApi({
    reducerPath:'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:8000/'
    }),

    endpoints:(builder)=>({
        getProducts:builder.query({
            query:()=>({
                url:'api/product'
            })
        }),

        getAdminProducts: builder.query({
            query:(()=>({
                url:'/api/product/all'
            }))
        }),

        createProduct:builder.mutation({
            query:(product)=>({
                url:'api/product',
                method:"POST",
                body:product
            })
        }),

        editProduct: builder.mutation({
            query:({id,formData})=>({
                url:`api/product/${id}`,
                method:"PUT",
                body:formData
            })
        }),

        deleteProduct: builder.mutation({
            query:(id)=>({
                url:`api/product/${id}`,
                method:"DELETE"
            })
        })
    })
})


export const {useCreateProductMutation, useGetAdminProductsQuery,useDeleteProductMutation, useEditProductMutation, useGetProductsQuery} = productApi

export default productApi