import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useCartServiceDispatch } from '../../reducers/cartReducer'
import { useSearchParams } from 'react-router-dom'
const CheckStatus = () => {
  const { updatePaymentStatus } = useCartServiceDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updatePaymentStatus(searchParams.get('payment_reference')))
    }, 5000)
    return () => clearInterval(interval)
  }, [])
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
