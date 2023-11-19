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
  const navigate = useNavigate()
  const [passwordRequiredReminderVisible, setPasswordRequiredReminderVisible] =
    useState(false)
  const [
    previousPasswordRequiredReminderVisible,
    setPreviousPasswordRequiredReminderVisible,
  ] = useState(false)
  const [
    previousPasswordIncorrectReminderVisible,
    setPreviousPasswordIncorrectReminderVisible,
  ] = useState(false)
  const onSubmit = (event) => {
    event.preventDefault()
    if (password1.value.length < 1 || password2.value.length < 1) {
      setPasswordRequiredReminderVisible(true)
    } else if (previousPassword.length < 1) {
      setPasswordRequiredReminderVisible(true)
    } else {
      const promise = userService.changePassword({
        oldPassword: previousPassword.value,
        newPassword: password1.value,
      })
      showPromiseToast({ promise, successMessage: lang.toast_password_reset })
      promise
        .then(() => {
          password1.clear()
          password2.clear()
          previousPassword.clear()
        })
        .catch((error) => {
          console.log(error)
          if (
            error.response.status === 400 &&
            error.response.data.error === 'Previous password incorrect.'
          ) {
            setPreviousPasswordIncorrectReminderVisible(true)
          }
        })
    }
    setTimeout(() => {
      setPasswordRequiredReminderVisible(false)
      setPreviousPasswordIncorrectReminderVisible(false)
      setPreviousPasswordRequiredReminderVisible(false)
    }, 5000)
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
          passwordRequiredReminderVisible={passwordRequiredReminderVisible}
        />
        {previousPasswordIncorrectReminderVisible && (
          <ul className="validation blink">
            <li>{lang.previous_password_incorrect}</li>
          </ul>
        )}

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
