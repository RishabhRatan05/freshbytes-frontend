import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/editCart";
import productApi from './api/product'
import categoryApi from "./api/category";
import authApi from "./api/auth";
import user from "./slices/user";
import product from "./slices/editProduct";

const store = configureStore({
    reducer:{
        cartState:cartReducer,
        [product.name]:product.reducer,
        [user.name]:user.reducer,
        [authApi.reducerPath]:authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer
    },
    middleware:(mid=>
        mid().concat(productApi.middleware).concat(categoryApi.middleware).concat(authApi.middleware)
    )
})

export default store