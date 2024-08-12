import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
    total: 0,
    shippingInfo: {
      address: "",
      pincode: "",
      city: "",
      mobile: "",
    },
  },
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload.id
      state.total = state.total + action.payload.price
      const found = state.cart.find((item) => item.id === itemId)
      if (found) {
        state.cart = state.cart.map((item) =>
          item.id === itemId ? { ...item, qty: item.qty + 1 } : item
        )
      } else {
        state.cart.push(action.payload)
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload.id
      state.total = state.total - action.payload.price * action.payload.newQty
      state.cart = state.cart.filter((item) => item.id !== itemId)
    },
    incrementItem: (state, action) => {
      const itemId = action.payload.id
      state.total = state.total + action.payload.price
      state.cart = state.cart.map((item) =>
        item.id === itemId ? { ...item, qty: item.qty + 1 } : item
      )
    },
    decrementItem: (state, action) => {
      const itemId = action.payload.id
      state.total = Number(state.total) - Number(action.payload.price)
      state.cart = state.cart.map((item) =>
        item.id === itemId ? { ...item, qty: item.qty - 1 } : item
      )
      state.cart = state.cart.filter((item) => item.qty !== 0)
    },
    addShippingInfo: (state, action) => {
      state.shippingInfo.address = action.payload.address
      state.shippingInfo.pincode = action.payload.pincode
      state.shippingInfo.city = action.payload.city
      state.shippingInfo.mobile = action.payload.mobile
    },
  },
})
export const {
  addToCart,
  removeFromCart,
  incrementItem,
  decrementItem,
  addShippingInfo,
} = cartSlice.actions

export default cartSlice.reducer
