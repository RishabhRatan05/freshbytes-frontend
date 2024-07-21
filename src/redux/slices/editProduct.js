import { createSlice } from "@reduxjs/toolkit";

const product = createSlice({
    name:'product',
    initialState:{
        name:"",
        price:0,
    },

    reducers:{
        editProduct:(state,action)=>{
            state.name = action.payload.name
            state.price = action.payload.price
        }
    }
})

export const {editProduct} = product.actions

export default product