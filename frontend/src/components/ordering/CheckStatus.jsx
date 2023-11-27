import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCartServiceDispatch } from '../../reducers/cartReducer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const CheckStatus = () => {
  const { updatePaymentStatus, loadCart } = useCartServiceDispatch()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const paymentStatus = useSelector((state) => state.cart.paymentStatus)

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updatePaymentStatus(searchParams.get('payment_reference')))
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    if (paymentStatus === 'failed') {
      navigate('/order_process/payment')
    } else if (paymentStatus === 'settled') {
      toast.success(lang.toast_order_successful)
      navigate('/info/ordered')
      dispatch(loadCart())
    } else if (paymentStatus === 'price_mismatch') {
      toast.error(lang.toast_price_mismatch)
      navigate('/info/price_mismatch')
      dispatch(loadCart())
    }
  }, [paymentStatus])
  return (
    <div className="spinner">
      <div class="container">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
export default CheckStatus
