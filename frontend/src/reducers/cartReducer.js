import useCartService from '../services/cart'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import useOrderService from '../services/order'
const initialState = {
  content: [],
  deliveryMethod: undefined,
  courrierAddress: undefined,
  pickupPointData: undefined,
  deliveryPhone: undefined,
  paid: false,
  animate: false,
  animateTimeout: undefined,
  iframe: undefined,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart(state, action) {
      return initialState
    },
    setContent(state, action) {
      state.content = action.payload
    },
    startAnimate(state, action) {
      state.animate = true
    },
    setAnimateTimeout(state, action) {
      state.animateTimeout = action.payload
    },
    stopAnimate(state, action) {
      state.animate = false
    },
    clearAnimationTimeout(state, action) {
      clearTimeout(state.animateTimeout)
    },
    setCart(state, action) {
      return action.payload
    },
    setDeliveryMethod(state, action) {
      state.deliveryMethod = action.payload
    },
    setCourrierAddress(state, action) {
      state.courrierAddress = action.payload
    },
    setPickupPointData(state, action) {
      state.pickupPointData = action.payload
    },
    setDeliveryPhone(state, action) {
      state.deliveryPhone = action.payload
    },
    setPaid(state, action) {
      state.paid = action.payload
    },
    setIframe(state, action) {
      state.iframe = action.payload
    },
  },
})
const selectContent = (state) => state.cart.content
const selectDeliveryMethod = (state) => state.cart.deliveryMethod
const selectCartTotal = createSelector(selectContent, (content) =>
  content
    .map((i) => {
      if (
        i.product.discount &&
        Date.parse(i.product.discount.startDate) <= new Date() &&
        Date.parse(i.product.discount.endDate) >= new Date()
      ) {
        return i.product.discount.discountPrice * i.quantity
      } else if (
        i.product.bulkThreshold &&
        i.product.bulkThreshold <= i.quantity
      ) {
        return i.product.bulkPrice * i.quantity
      }
      return i.product.price * i.quantity
    })
    .reduce((acc, cur) => {
      return acc + cur
    }, 0)
)

const DELIVERY_THRESHOLD = 6000

const selectCartOverThreshold = createSelector(
  (selectCartTotal, (total) => total > DELIVERY_THRESHOLD)
)

const getDeliveryCost = (method) => {
  switch (method) {
    case 'bakery':
      return [0]
    case 'pickupPoint':
      return [399]
    case 'courrier':
      return [599]
    default:
      return [0, 599]
  }
}

const selectDeliveryCost = createSelector(
  [selectCartOverThreshold, selectDeliveryMethod],
  (over, deliveryMethod) => {
    if (!over) {
      return getDeliveryCost(deliveryMethod)
    } else {
      return [0]
    }
  }
)
export {
  selectCartTotal,
  selectCartOverThreshold,
  DELIVERY_THRESHOLD,
  selectDeliveryCost,
  getDeliveryCost,
}

export const {
  setContent,
  setCart,
  setCourrierAddress,
  setDeliveryMethod,
  setDeliveryPhone,
  setPickupPointData,
  setPaid,
  clearCart,
  startAnimate,
  setAnimateTimeout,
  stopAnimate,
  clearAnimationTimeout,
  setIframe,
} = cartSlice.actions

export const useCartServiceDispatch = () => {
  const cartService = useCartService()
  const orderService = useOrderService()
  const loadCart = () => {
    return async (dispatch) => {
      cartService
        .getCart()
        .then((response) => dispatch(setCart(response.data)))
        .catch((error) => console.log(error.response.data.error))
    }
  }

  const addItem = (item) => {
    return async (dispatch) => {
      cartService
        .addToCart(item)
        .then((response) => {
          dispatch(setContent(response.data.content))
          dispatch(animateCart())
        })
        .catch((error) => console.log(error.response.data.error))
    }
  }

  const removeItem = (item) => {
    return async (dispatch) => {
      cartService
        .removeFromCart(item)
        .then((response) => {
          dispatch(setContent(response.data.content))
          dispatch(animateCart())
        })
        .catch((error) => console.log(error.response.data.error))
    }
  }

  const animateCart = () => {
    return async (dispatch) => {
      dispatch(clearAnimationTimeout())
      dispatch(startAnimate())
      dispatch(
        setAnimateTimeout(
          setTimeout(() => {
            dispatch(stopAnimate())
          }, 700)
        )
      )
    }
  }

  const changeQuantityOfItem = (item) => {
    return async (dispatch) => {
      cartService
        .changeQuantity(item)
        .then((response) => {
          dispatch(setContent(response.data.content))
          dispatch(animateCart())
        })
        .catch((error) => console.log(error.response.data.error))
    }
  }
  const changeDeliveryMethod = (method) => {
    return async (dispatch) => {
      cartService
        .changeDeliveryMethod(method)
        .then((response) =>
          dispatch(setDeliveryMethod(response.data.deliveryMethod))
        )
        .catch((error) => console.log(error.response.data.error))
    }
  }
  const changeCourrierAddress = (address) => {
    return async (dispatch) => {
      cartService
        .changeCourrierAddress(address)
        .then((response) =>
          dispatch(setCourrierAddress(response.data.courrierAddress))
        )
        .catch((error) => console.log(error.response.data.error))
    }
  }
  const changePickupPointData = (data) => {
    return async (dispatch) => {
      cartService
        .changePickupPointData(data)
        .then((response) =>
          dispatch(setPickupPointData(response.data.pickupPointData))
        )
        .catch((error) => console.log(error.response.data.error))
    }
  }
  const changeDeliveryPhone = (phone) => {
    return async (dispatch) => {
      cartService
        .changeDeliveryPhone(phone)
        .then((response) =>
          dispatch(setDeliveryPhone(response.data.deliveryPhone))
        )
        .catch((error) => console.log(error.response.data.error))
    }
  }

  const placeOrder = () => {
    return async (dispatch) => {
      orderService
        .placeOrder()
        .then((response) => dispatch(setIframe(response.data.paymentLink)))
        .catch((error) => console.log(error.response.data.error))
    }
  }

  return {
    loadCart,
    addItem,
    removeItem,
    changeQuantityOfItem,
    changeCourrierAddress,
    changeDeliveryPhone,
    changePickupPointData,
    changeDeliveryMethod,
    placeOrder,
  }
}

export default cartSlice.reducer
