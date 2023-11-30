import useField from '../../hooks/useField'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import useUserService from '../../services/user'
import styled from 'styled-components'
import useToast from '../../util/promiseToast'
import Input from '../basic/Input'
const ValidationFailed = styled.div`
  color: var(--bad);
  ul {
    font-size: 14px;
    margin: 0;
    list-style: '●  ';
  }
  h3 {
    font-weight: normal;
    margin: 0;
    margin-bottom: 5px;
    width: 100%;
  }
  line-height: 1.5;
  margin-top: -20px;
  margin-bottom: 20px;
`
const ForgotPassword = () => {
  const userService = useUserService()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  const { showPromiseToast } = useToast()

  const email = useField('email')
  const [
    emailUnregisteredReminderVisisble,
    setEmailUnregisteredReminderVisisble,
  ] = useState(false)
  const onSubmit = async (event) => {
    event.preventDefault()
    const promise = userService.forgotPassword(email.value)
    showPromiseToast({ promise, successMessage: lang.toast_reset_email_sent })
    promise.catch((error) => {
      console.log(error)
      if (
        error.response.status === 404 &&
        error.response.data.error === 'This email is not registered.'
      ) {
        setEmailUnregisteredReminderVisisble(true)
      }
    })
    setTimeout(() => {
      setEmailUnregisteredReminderVisisble(false)
    }, 3000)
  }

  return (
    <div className="center-h">
      <div className="card">
        <h1 className="big-title m-b">{lang.reset_password}</h1>
        <form
          className="m-b"
          onSubmit={onSubmit}>
          <Input
            label={lang.email}
            {...email}
            required
          />

          <button
            className="btn full-width m-t-m"
            type="submit">
            {lang.send_reset_instructions}
            {emailUnregisteredReminderVisisble && (
              <ValidationFailed>
                <h3>{lang.email_not_registered}</h3>
              </ValidationFailed>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
