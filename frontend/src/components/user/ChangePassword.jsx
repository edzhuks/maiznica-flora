import { useSelector } from 'react-redux'
import PasswordWithValidation from '../basic/PasswordValidation'
import useField from '../../hooks/useField'
import { useState } from 'react'
import useUserService from '../../services/user'
import useToast from '../../util/promiseToast'
import { useNavigate } from 'react-router-dom'
import Input from '../basic/Input'

const ChangePassword = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const previousPassword = useField('password')
  const password1 = useField('password')
  const password2 = useField('password')
  const userService = useUserService()
  const { showPromiseToast } = useToast()

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

  const onSubmit = (event) => {
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
      const promise = userService.changePassword({
        oldPassword: previousPassword.value,
        newPassword: password1.value,
      })
      showPromiseToast({ promise, successMessage: lang.toast_password_reset })
      promise.then(() => {
        password1.clear()
        password2.clear()
        previousPassword.clear()
      })
    }
    setTimeout(() => {
      setBlinkRequirements(false)
    }, 3000)
  }

  return (
    <div className="card ">
      <h1 className="big-title m-t-b">{lang.change_password}</h1>
      <form
        className="p-h-b"
        onSubmit={onSubmit}>
        <Input
          label={lang.previous_password}
          {...previousPassword}
          required
        />

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
          className="btn full-width m-t-m m-d-b"
          type="submit">
          {lang.change_password}
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
