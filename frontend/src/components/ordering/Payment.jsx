import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import useField from '../../hooks/useField'
import Input from '../basic/Input'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Payment = ({ order }) => {
  const termsChecked = useField('checkbox')
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const iframe = useSelector((state) => state.cart.iframe)
  const paymentStatus = useSelector((state) => state.cart.paymentStatus)
  useEffect(() => {}, [paymentStatus])

  console.log(iframe)
  const tryAcceptTerms = () => {
    if (!termsChecked.value) {
      toast.error(lang.toast_must_agree)
    } else {
      order()
    }
  }

  return (
    <div>
      {iframe && (
        <button
          className="btn m-d"
          onClick={order}>
          {lang.start_over_payment}
        </button>
      )}
      <div className="card column">
        {iframe ? (
          <iframe
            style={{ height: '800px', border: 'none' }}
            src={iframe}
            title="payment"
          />
        ) : (
          <div
            className="center-vh"
            style={{
              width: '100%',
              height: '800px',
            }}>
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
              <div>
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
                    tryAcceptTerms()
                  }}>
                  {lang.pay}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Payment
