import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import useField from '../../hooks/useField'
import Input from '../basic/Input'
import { Link, useNavigate } from 'react-router-dom'
import { selectIsBusiness } from '../../reducers/cartReducer'
import { useEffect } from 'react'

const Payment = ({ order, invoice }) => {
  const termsChecked = useField('checkbox')
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const paymentStatus = useSelector((state) => state.cart.paymentStatus)
  const isBusiness = useSelector(selectIsBusiness)
  const navigate = useNavigate()

  useEffect(() => {
    if (paymentStatus === 'invoiced') {
      toast.success(lang.order_invoiced)
      navigate('/info/invoiced')
    }
  }, [paymentStatus])

  const tryOrder = () => {
    if (!termsChecked.value) {
      toast.error(lang.toast_must_agree)
    } else {
      order()
    }
  }

  const tryInvoice = () => {
    if (!termsChecked.value) {
      toast.error(lang.toast_must_agree)
    } else {
      invoice()
    }
  }
  return (
    <div className="row align-cross-stretch center">
      {isBusiness && (
        <div
          className="card column p-b align-cross-center"
          style={{ maxWidth: '600px' }}>
          <h3 className="card-heading m-d-m">{lang.receipt_payment}</h3>
          <p className="card-text wrap-n ">{lang.receipt_instructions}</p>
          <div className="spacer" />
          <div className="row align-cross-end">
            <Input
              {...termsChecked}
              label={<div>{lang.agree_terms}</div>}
            />
            <Link
              className="text-link"
              to="/distance_agreement"
              onClick={(event) => event.stopPropagation()}>
              {lang.to_distance_agreement}
            </Link>
          </div>

          <button
            className="btn full-width m-t"
            onClick={() => {
              tryInvoice()
            }}>
            {lang.receive_receipt}
          </button>
        </div>
      )}
      <div
        className="card column p-b align-cross-center"
        style={{ maxWidth: '600px' }}>
        {paymentStatus === 'failed' ? (
          <div>
            <p className="card-text">{lang.payment_failed}</p>
            <button
              className="btn full-width m-t"
              onClick={order}>
              {lang.start_over_payment}
            </button>
          </div>
        ) : (
          <>
            <h3 className="card-heading m-d-m">{lang.online_payment}</h3>
            <p className="card-text wrap-n ">
              {lang.online_payment_instructions}
            </p>
            <div className="spacer" />
            <div className="row align-cross-end">
              <Input
                {...termsChecked}
                label={<div>{lang.agree_terms}</div>}
              />
              <Link
                className="text-link"
                to="/distance_agreement"
                onClick={(event) => event.stopPropagation()}>
                {lang.to_distance_agreement}
              </Link>
            </div>

            <button
              className="btn full-width m-t"
              onClick={() => {
                tryOrder()
              }}>
              {isBusiness ? lang.pay_now : lang.pay}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Payment
