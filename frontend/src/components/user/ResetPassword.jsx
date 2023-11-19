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

  const [searchParams, setSearchParams] = useSearchParams()
  const { showPromiseToast } = useToast()
  const [passwordRequiredReminderVisible, setPasswordRequiredReminderVisible] =
    useState(false)
  const navigate = useNavigate()
  const onSubmit = async (event) => {
    event.preventDefault()
    if (password1.value.length < 1 || password2.value.length < 1) {
      setPasswordRequiredReminderVisible(true)
    } else {
      const promise = userService.resetPassword({
        token: searchParams.get('token'),
        password: password1.value,
      })
      showPromiseToast({ promise, successMessage: lang.toast_password_reset })
      promise.then(() => navigate('/login'))
    }
    setTimeout(() => {
      setPasswordRequiredReminderVisible(false)
    }, 3000)
  }
  useEffect(() => {
    console.log(password1.value)
    console.log(password2.value)
    console.log(password1.value === password2.value)
  }, [password1, password2])
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
            passwordRequiredReminderVisible={passwordRequiredReminderVisible}
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
