import cartService from '../services/cart'
import { createSlice } from '@reduxjs/toolkit'
const initialState = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart(state, action) {
      return []
    },
    setCart(state, action) {
      return action.payload
    },
  },
})

export const { clearCart, setCart } = cartSlice.actions

export const loadCart = () => {
  return async (dispatch) => {
    const cart = await cartService.getCart()
    dispatch(setCart(cart))
  }
}

export const addItem = (item) => {
  return async (dispatch) => {
    const updatedCart = await cartService.addToCart(item)
    dispatch(setCart(updatedCart))
  }
}

export const removeItem = (item) => {
  return async (dispatch) => {
    const updatedCart = await cartService.removeFromCart(item)
    dispatch(setCart(updatedCart))
  }
}

export const changeQuantityOfItem = (item) => {
  return async (dispatch) => {
    const updatedCart = await cartService.changeQuantity(item)
    dispatch(setCart(updatedCart))
  }
}

export default cartSlice.reducer
