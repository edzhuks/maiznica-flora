import useUserService from '../../services/user'
import useField from '../../hooks/useField'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useToast from '../../util/promiseToast'
import PasswordWithValidation from '../basic/PasswordValidation'

const ResetPassword = () => {
  const userService = useUserService()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  const password1 = useField('password')
  const password2 = useField('password')
  const validLength = () => {
    return password1.value.length >= 8
  }
  const hasDigit = () => {
    return /\d/.test(password1.value)
  }
  const hasSpecial = () => {
    return /[!@#$%^&* ]/.test(password1.value)
  }
  const hasLetter = () => {
    return /[a-zA-Z]/.test(password1.value)
  }
  const doMatch = () => {
    return password1.value === password2.value
  }
  const [blinkRequirements, setBlinkRequirements] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const { showPromiseToast } = useToast()

  const navigate = useNavigate()
  const onSubmit = async (event) => {
    event.preventDefault()
    if (
      !validLength() ||
      !hasDigit() ||
      !hasLetter() ||
      !hasSpecial() ||
      !doMatch()
    ) {
      setBlinkRequirements(true)
    } else {
      const promise = userService.resetPassword({
        token: searchParams.get('token'),
        password: password1.value,
      })
      showPromiseToast({ promise, successMessage: lang.toast_password_reset })
      promise.then(() => navigate('/login'))
    }
    setTimeout(() => {
      setBlinkRequirements(false)
    }, 3000)
  }
  return (
    <div className="center-h">
      <div className="card">
        <h1 className="big-title m-b">{lang.reset_password}</h1>
        <form
          className="m-b"
          onSubmit={onSubmit}>
          <PasswordWithValidation
            password1={password1}
            password2={password2}
            hasDigit={hasDigit()}
            hasLetter={hasLetter()}
            hasSpecial={hasSpecial()}
            doMatch={doMatch()}
            validLength={validLength()}
            blink={blinkRequirements}
          />
          <button
            className="btn full-width m-t-m"
            type="submit">
            {lang.reset_password}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
