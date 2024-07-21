import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name:'user',

    initialState:{
        name:"",
        email:"",
        role:'user',
        id:'',
    },

    reducers:{
        userUpdate:(state,action)=>{
            state.name = action.payload.name
            state.email = action.payload.email
            state.role = action.payload.role
            state.id = action.payload._id
        }
    }
})

export const {userUpdate} = user.actions

export default user