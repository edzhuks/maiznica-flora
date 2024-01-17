import useCartService from '../services/cart'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import useOrderService from '../services/order'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useToast from '../util/promiseToast'
import { calculateItemPrice } from '../util/convert'
const initialState = {
  content: [],
  deliveryMethod: undefined,
  courrierAddress: undefined,
  pickupPointData: undefined,
  deliveryPhone: undefined,
  paid: false,
  animate: false,
  animateTimeout: undefined,
  paymentStatus: undefined,
  paymentReference: undefined,
  businessComments: { name: undefined, regNo: undefined, address: undefined },
  generalComments: undefined,
  deliveryComments: undefined,
  availableLoyaltyMoney: undefined,
  usingLoyaltyMoney: true,
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
    setUsingLoyaltyMoney(state, action) {
      state.usingLoyaltyMoney = action.payload
    },
  },
})
const selectContent = (state) => state.cart.content
const selectDeliveryMethod = (state) => state.cart.deliveryMethod
const selectBusinessComments = (state) => state.cart.businessComments
const selectAvailableLoyaltyMoney = (state) => state.cart.availableLoyaltyMoney
const selectUsingLoyaltyMoney = (state) => state.cart.usingLoyaltyMoney

const selectCartSubtotal = createSelector([selectContent], (content) =>
  content
    .map((i) => calculateItemPrice(i))
    .reduce((acc, cur) => {
      return acc + cur
    }, 0)
)
const selectReceivedLoyaltyMoney = createSelector(
  [selectCartSubtotal],
  (subtotal) => {
    return subtotal * 0.01
  }
)

const deliveryMethods = ['bakery', 'pickupPoint', 'courrier']

const deliveryCosts = {
  bakery: 0,
  pickupPoint: 330,
  courrier: 599,
}
const thresholds = {
  bakery: undefined,
  pickupPoint: 2500,
  courrier: undefined,
}

const selectDeliveryCost = createSelector(
  [selectCartSubtotal, selectDeliveryMethod],
  (total, deliveryMethod) => {
    if (!deliveryMethod) {
      return undefined
    }
    if (thresholds[deliveryMethod]) {
      if (total >= thresholds[deliveryMethod]) {
        return 0
      } else {
        return deliveryCosts[deliveryMethod]
      }
    } else {
      return deliveryCosts[deliveryMethod]
    }
  }
)

const selectAllDeliveryCosts = createSelector([selectCartSubtotal], (total) => {
  return Object.fromEntries(
    deliveryMethods.map((c) => {
      if (thresholds[c]) {
        if (total >= thresholds[c]) {
          return [c, 0]
        } else {
          return [c, deliveryCosts[c]]
        }
      } else {
        return [c, deliveryCosts[c]]
      }
    })
  )
})

const selectCartTotal = createSelector(
  [
    selectContent,
    selectDeliveryCost,
    selectAvailableLoyaltyMoney,
    selectUsingLoyaltyMoney,
  ],
  (content, deliveryCost, availableLoyaltyMoney, usingLoyaltyMoney) => {
    return (
      content
        .map((i) => calculateItemPrice(i))
        .reduce((acc, cur) => {
          return acc + cur
        }, 0) +
      deliveryCost -
      (usingLoyaltyMoney ? availableLoyaltyMoney : 0)
    )
  }
)

const selectIsBusiness = createSelector(
  [selectBusinessComments],
  (businessComments) =>
    businessComments &&
    businessComments.name &&
    businessComments.address &&
    businessComments.regNo
)
export {
  selectCartTotal,
  selectCartSubtotal,
  selectDeliveryCost,
  selectIsBusiness,
  selectAllDeliveryCosts,
  deliveryCosts,
  selectReceivedLoyaltyMoney,
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
  setPaymentStatus,
  setPaymentReference,
  setBusinessComments,
  setDeliveryComments,
  setGeneralComments,
  setUsingLoyaltyMoney,
} = cartSlice.actions

export const useCartServiceDispatch = () => {
  const cartService = useCartService()
  const { showErrorToastNoPromise } = useToast()
  const loadCart = () => {
    return async (dispatch) => {
      cartService
        .getCart()
        .then((response) => dispatch(setCart(response.data)))
        .catch((error) => {
          console.log(error.response.data.error)
          showErrorToastNoPromise(error)
        })
    }
  }

  const addItem = (item) => {
    return async (dispatch) => {
      cartService.addToCart(item).then((response) => {
        dispatch(setContent(response.data.content))
        dispatch(animateCart())
      })
    }
  }

  const removeItem = (item) => {
    return async (dispatch) => {
      cartService.removeFromCart(item).then((response) => {
        dispatch(setContent(response.data.content))
        dispatch(animateCart())
      })
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
      cartService.changeQuantity(item).then((response) => {
        dispatch(setContent(response.data.content))
        dispatch(animateCart())
      })
    }
  }
  const changeDeliveryMethod = (method) => {
    return async (dispatch) => {
      cartService
        .changeDeliveryMethod(method)
        .then((response) => {
          dispatch(setDeliveryMethod(response.data.deliveryMethod))
        })
        .catch((error) => {
          console.log(error.response.data.error)
          showErrorToastNoPromise(error)
        })
    }
  }
  const changeCourrierAddress = (address) => {
    return async (dispatch) => {
      cartService
        .changeCourrierAddress(address)
        .then((response) =>
          dispatch(setCourrierAddress(response.data.courrierAddress))
        )
        .catch((error) => {
          console.log(error.response.data.error)
          showErrorToastNoPromise(error)
        })
    }
  }
  const changePickupPointData = (data) => {
    return async (dispatch) => {
      cartService
        .changePickupPointData(data)
        .then((response) =>
          dispatch(setPickupPointData(response.data.pickupPointData))
        )
        .catch((error) => {
          console.log(error.response.data.error)
          showErrorToastNoPromise(error)
        })
    }
  }
  const changeDeliveryPhone = (phone) => {
    return async (dispatch) => {
      cartService
        .changeDeliveryPhone(phone)
        .then((response) =>
          dispatch(setDeliveryPhone(response.data.deliveryPhone))
        )
        .catch((error) => {
          console.log(error.response.data.error)
          showErrorToastNoPromise(error)
        })
    }
  }
  const changeBusinessComments = (comments) => {
    return async (dispatch) => {
      cartService
        .changeBusinessComments(comments)
        .then((response) =>
          dispatch(setBusinessComments(response.data.businessComments))
        )
        .catch((error) => {
          console.log(error.response.data.error)
          showErrorToastNoPromise(error)
        })
    }
  }
  const changeGeneralComments = (comments) => {
    return async (dispatch) => {
      cartService
        .changeGeneralComments(comments)
        .then((response) =>
          dispatch(setGeneralComments(response.data.generalComments))
        )
        .catch((error) => {
          console.log(error.response.data.error)
          showErrorToastNoPromise(error)
        })
    }
  }
  const changeDeliveryComments = (comments) => {
    return async (dispatch) => {
      cartService
        .changeDeliveryComments(comments)
        .then((response) =>
          dispatch(setDeliveryComments(response.data.deliveryComments))
        )
        .catch((error) => {
          console.log(error.response.data.error)
          showErrorToastNoPromise(error)
        })
    }
  }
  const changeUsingLoyaltyMoney = (usingLoyaltyMoney) => {
    return async (dispatch) => {
      cartService
        .changeUsingLoyaltyMoney(usingLoyaltyMoney)
        .then((response) =>
          dispatch(setUsingLoyaltyMoney(response.data.usingLoyaltyMoney))
        )
        .catch((error) => {
          console.log(error.response.data.error)
          showErrorToastNoPromise(error)
        })
    }
  }

  const placeOrder = () => {
    return async (dispatch) => {
      cartService
        .placeOrder()
        .then((response) => {
          window.location.href = response.data.paymentLink
          dispatch(setPaymentReference(response.data.paymentReference))
        })
        .catch((error) => {
          console.log(error.response.data.error)
          showErrorToastNoPromise(error)
        })
    }
  }
  const invoice = () => {
    return async (dispatch) => {
      cartService
        .invoice()
        .then((response) => {
          dispatch(setPaymentStatus('invoiced'))
          dispatch(loadCart())
        })
        .catch((error) => {
          console.log(error.response.data.error)
        })
    }
  }
  const updatePaymentStatus = (paymentReference) => {
    return async (dispatch) => {
      cartService.getPaymentStatus(paymentReference).then((response) => {
        console.log(response.data)
        dispatch(setPaymentStatus(response.data.paymentStatus))
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
    changeUsingLoyaltyMoney,
    invoice,
  }
}

export default cartSlice.reducer
