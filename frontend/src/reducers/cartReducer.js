import useCartService from '../services/cart'
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

export const useCartServiceDispatch = () => {
  const cartService = useCartService()
  const loadCart = () => {
    return async (dispatch) => {
      cartService
        .getCart()
        .then((response) => dispatch(setCart(response.data.content)))
        .catch((error) => console.log(error.response.data.error))
    }
  }

  const addItem = (item) => {
    return async (dispatch) => {
      cartService
        .addToCart(item)
        .then((response) => dispatch(setCart(response.data.content)))
        .catch((error) => console.log(error.response.data.error))
    }
  }

  const removeItem = (item) => {
    return async (dispatch) => {
      cartService
        .removeFromCart(item)
        .then((response) => dispatch(setCart(response.data.content)))
        .catch((error) => console.log(error.response.data.error))
    }
  }

  const changeQuantityOfItem = (item) => {
    return async (dispatch) => {
      cartService
        .changeQuantity(item)
        .then((response) => dispatch(setCart(response.data.content)))
        .catch((error) => console.log(error.response.data.error))
    }
  }
  return { loadCart, addItem, removeItem, changeQuantityOfItem }
}

export default cartSlice.reducer
