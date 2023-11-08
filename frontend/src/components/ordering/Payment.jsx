import { useState } from 'react'
import {
  BigTitle,
  Button,
  Card,
  FullWidthButton,
  Label,
  TextLink,
} from '../styled/base'
import { useSelector } from 'react-redux'
import Checkbox from '../basic/Checkbox'
import { toast } from 'react-toastify'

const Payment = ({ order, iframe }) => {
  const [termsAccepted, acceptTerms] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  const tryAcceptTerms = () => {
    if (!termsChecked) {
      toast.error(lang.toast_must_agree)
    } else {
      order()
    }
  }

  return (
    <Card>
      {iframe ? (
        <iframe
          style={{ height: '800px', border: 'none' }}
          src={iframe}
          title="payment"
        />
      ) : (
        <div
          style={{
            width: '100%',
            aspectRatio: '2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <div>
            <Checkbox
              checked={termsChecked}
              onChange={() => {
                setTermsChecked(!termsChecked)
              }}
              label={
                <div>
                  {lang.agree_terms}
                  <TextLink to="/distance_agreement">
                    {lang.distance_agreement}
                  </TextLink>
                </div>
              }
            />
            <FullWidthButton
              onClick={() => {
                tryAcceptTerms()
              }}>
              {lang.pay}
            </FullWidthButton>
          </div>
        </div>
      )}
    </Card>
  )
}

export default Payment
