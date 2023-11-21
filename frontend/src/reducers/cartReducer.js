import useCartService from '../services/cart'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import useOrderService from '../services/order'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
  paymentStatus: undefined,
  paymentReference: undefined,
  businessComments: undefined,
  generalComments: undefined,
  deliveryComments: undefined,
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
    clearIframe(state, action) {
      state.iframe = ''
    },
    setPaymentStatus(state, action) {
      state.paymentStatus = action.payload
    },
    setPaymentReference(state, action) {
      state.paymentReference = action.payload
    },
    setBusinessComments(state, action) {
      state.businessComments = action.payload
    },
    setGeneralComments(state, action) {
      state.generalComments = action.payload
    },
    setDeliveryComments(state, action) {
      state.deliveryComments = action.payload
    },
  },
})
const selectContent = (state) => state.cart.content
const selectDeliveryMethod = (state) => state.cart.deliveryMethod
const selectCartTotal = createSelector([selectContent], (content) =>
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

const selectCartOverThreshold = createSelector([selectCartTotal], (total) => {
  console.log(total)
  return total > DELIVERY_THRESHOLD
})

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
  clearIframe,
  setPaymentStatus,
  setPaymentReference,
  setBusinessComments,
  setDeliveryComments,
  setGeneralComments,
} = cartSlice.actions

export const useCartServiceDispatch = () => {
  const cartService = useCartService()
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
          dispatch(clearIframe())
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
          dispatch(clearIframe())
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
          dispatch(clearIframe())
        })
        .catch((error) => console.log(error.response.data.error))
    }
  }
  const changeDeliveryMethod = (method) => {
    return async (dispatch) => {
      cartService
        .changeDeliveryMethod(method)
        .then((response) => {
          dispatch(setDeliveryMethod(response.data.deliveryMethod))
          dispatch(clearIframe())
        })
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
  const changeBusinessComments = (comments) => {
    return async (dispatch) => {
      cartService
        .changeBusinessComments(comments)
        .then((response) =>
          dispatch(setBusinessComments(response.data.businessComments))
        )
        .catch((error) => console.log(error.response.data.error))
    }
  }
  const changeGeneralComments = (comments) => {
    return async (dispatch) => {
      cartService
        .changeGeneralComments(comments)
        .then((response) =>
          dispatch(setGeneralComments(response.data.generalComments))
        )
        .catch((error) => console.log(error.response.data.error))
    }
  }
  const changeDeliveryComments = (comments) => {
    return async (dispatch) => {
      cartService
        .changeDeliveryComments(comments)
        .then((response) =>
          dispatch(setDeliveryComments(response.data.deliveryComments))
        )
        .catch((error) => console.log(error.response.data.error))
    }
  }

  const placeOrder = () => {
    return async (dispatch) => {
      cartService
        .placeOrder()
        .then((response) => {
          dispatch(setIframe(response.data.paymentLink))
          dispatch(setPaymentReference(response.data.paymentReference))
        })
        .catch((error) => console.log(error.response.data.error))
    }
  }
  const updatePaymentStatus = (paymentReference) => {
    return async (dispatch) => {
      cartService.getPaymentStatus(paymentReference).then((response) => {
        console.log(response.data)
        dispatch(setPaymentStatus(response.data.paymentStatus))
        if (response.data.paymentStatus === 'failed') {
          dispatch(clearIframe())
        }
      })
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
    updatePaymentStatus,
    changeBusinessComments,
    changeDeliveryComments,
    changeGeneralComments,
  }
}

export default cartSlice.reducer
