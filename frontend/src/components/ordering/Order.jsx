import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { clearCart, selectCartTotal } from '../../reducers/cartReducer'
import { toast } from 'react-toastify'
import useOrderService from '../../services/order'

import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import Cart from './Cart'
import CartSummary from './CartSummary'
import DeliveryMethod from './DeliveryMethod'
import Payment from './Payment'

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
  const match = useMatch('/order/:stage')
  const stage = match.params.stage
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const dispatch = useDispatch()
  const orderService = useOrderService()
  const cart = useSelector((state) => state.cart)
  const deliveryMethod = useSelector((state) => state.cart.deliveryMethod)
  const [iframe, setIframe] = useState()
  const [orderId, setOrderId] = useState()
  const navigate = useNavigate()
  const [orderStatus, setOrderStatus] = useState()
  const [failedPayment, setFailedPayment] = useState()

  const startOver = () => {
    console.log(orderId)
    const promise = orderService.startOver(orderId)
    promise.then((response) => {
      setIframe(response.data.paymentLink)
    })
  }

  useEffect(() => {
    if (orderId) {
      const interval = setInterval(() => {
        orderService.getPaymentStatus(orderId).then((response) => {
          console.log(response.data)
          setOrderStatus(response.data.paymentStatus)
          if (response.data.paymentStatus === 'settled') {
            clearInterval(interval)
            toast.success(lang.toast_order_successful)
            navigate('/info/ordered')
            dispatch(clearCart())
          } else if (response.data.paymentStatus === 'failed') {
            setIframe(undefined)
          }
        })
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [orderId])

  const order = async () => {
    const promise = orderService.placeOrder()
    promise.then((response) => {
      console.log(response)
      setIframe(response.data.paymentLink)
      setOrderId(response.data.orderId)
    })
  }
  const checkDeliveryMethod = () => {
    if (!cart.deliveryMethod) {
      toast.error(lang.toast_select_delivery_method)
    } else if (
      cart.deliveryMethod === 'pickupPoint' &&
      (!cart.pickupPointData || !cart.pickupPointData.id)
    ) {
      toast.error(lang.toast_select_pickup_point)
    } else if (
      cart.deliveryMethod === 'pickupPoint' &&
      (!cart.pickupPointData.name ||
        !cart.pickupPointData.surname ||
        !cart.pickupPointData.phone)
    ) {
      toast.error(lang.toast_pickup_point_data)
    } else if (cart.deliveryMethod === 'courrier' && !cart.courrierAddress) {
      toast.error(lang.toast_select_address)
    } else {
      navigate('payment')
    }
  }
  const checkCartEmpty = () => {
    if (cart.content.length < 1) {
      toast.error(lang.empty_cart)
    } else {
      navigate('delivery')
    }
  }
  const runChecksAndNavigate = () => {
    if (stage === 'cart') {
      checkCartEmpty()
    } else if (stage === 'delivery') {
      checkDeliveryMethod()
    }
  }

  const nextStage = () => {
    switch (stage) {
      case 'cart':
        return 'delivery'
      case 'delivery':
        return 'payment'
      default:
        return undefined
    }
  }
  return (
    <div>
      <OrderProcess
        stage={stage}
        stages={['cart', 'delivery', 'payment']}
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
                  iframe={iframe}
                  startOver={startOver}
                  orderStatus={orderStatus}
                  failedPayment={failedPayment}
                />
              }
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
