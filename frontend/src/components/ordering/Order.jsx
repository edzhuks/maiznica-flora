import { useDispatch, useSelector } from 'react-redux'
import {
  selectIsBusiness,
  useCartServiceDispatch,
} from '../../reducers/cartReducer'
import { toast } from 'react-toastify'

import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import Cart from './Cart'
import CartSummary from './CartSummary'
import DeliveryMethod from './DeliveryMethod'
import Payment from './Payment'
import Comments from './Comments'
import CheckStatus from './CheckStatus'

const OrderProcess = ({ stages, stage }) => {
  const currentIndex = stages.length - stages.indexOf(stage) - 1
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div className="process-row">
      {stages.reverse().map((s, i) => (
        <Link
          style={{ pointerEvents: currentIndex <= i ? 'unset' : 'none' }}
          to={s}
          key={s}
          className={`process-stage ${currentIndex <= i ? 'active' : ''}`}>
          {lang[s]}
        </Link>
      ))}
    </div>
  )
}

const Order = () => {
  const match = useMatch('/order_process/:stage')
  const stage = match.params.stage
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const isBusiness = useSelector(selectIsBusiness)
  const navigate = useNavigate()
  const { placeOrder, invoice } = useCartServiceDispatch()

  const order = async () => {
    if (checkDeliveryMethod() && checkCartEmpty() && checkBusinessComments()) {
      dispatch(placeOrder())
    }
  }

  const sendInvoice = async () => {
    if (checkDeliveryMethod() && checkCartEmpty() && checkBusinessComments()) {
      dispatch(invoice())
    }
  }

  const checkBusinessComments = () => {
    if (
      cart.businessComments &&
      (cart.businessComments.name ||
        cart.businessComments.address ||
        cart.businessComments.regNo) &&
      !isBusiness
    ) {
      toast.error(lang.toast_incomplete_business_comments)
      return false
    }
    return true
  }

  const checkDeliveryMethod = () => {
    if (!cart.deliveryMethod) {
      toast.error(lang.toast_select_delivery_method)
      return false
    } else if (
      cart.deliveryMethod === 'pickupPoint' &&
      (!cart.pickupPointData || !cart.pickupPointData.id)
    ) {
      toast.error(lang.toast_select_pickup_point)
      return false
    } else if (
      cart.deliveryMethod === 'pickupPoint' &&
      (!cart.pickupPointData.name ||
        !cart.pickupPointData.surname ||
        !cart.pickupPointData.phone)
    ) {
      toast.error(lang.toast_pickup_point_data)
      return false
    } else if (cart.deliveryMethod === 'courrier' && !cart.courrierAddress) {
      toast.error(lang.toast_select_address)
      return false
    } else {
      return true
    }
  }
  const checkCartEmpty = () => {
    if (cart.content.length < 1) {
      toast.error(lang.empty_cart)
      return false
    } else {
      return true
    }
  }
  const runChecksAndNavigate = () => {
    if (stage === 'cart') {
      if (checkCartEmpty()) {
        navigate('delivery')
      }
    } else if (stage === 'delivery') {
      if (checkDeliveryMethod()) {
        navigate('comments')
      }
    } else if (stage === 'comments') {
      if (checkBusinessComments()) {
        navigate('payment')
      }
    }
  }

  const nextStage = () => {
    switch (stage) {
      case 'cart':
        return 'delivery'

      case 'delivery':
        return 'comments'
      case 'comments':
        return 'payment'
      default:
        return undefined
    }
  }
  return (
    <div>
      <OrderProcess
        stage={stage}
        stages={['cart', 'delivery', 'comments', 'payment']}
      />
      <div className="row wrap-reverse m-t">
        <div style={{ flex: '100 1 300px' }}>
          <Routes>
            <Route
              path="cart"
              element={<Cart content={cart.content} />}
            />
            <Route
              path="delivery"
              element={<DeliveryMethod />}
            />
            <Route
              path="payment"
              element={
                <Payment
                  order={order}
                  invoice={sendInvoice}
                />
              }
            />
            <Route
              path="comments"
              element={<Comments />}
            />
            <Route
              path="check_status"
              element={<CheckStatus />}
            />
          </Routes>
        </div>
        <div style={{ flex: '1 0 320px' }}>
          <CartSummary
            stage={stage}
            nextStage={nextStage()}
            runChecksAndNavigate={runChecksAndNavigate}
            checkDeliveryMethod={checkDeliveryMethod}
            checkCartEmpty={checkCartEmpty}
          />
        </div>
      </div>
    </div>
  )
}

export default Order
