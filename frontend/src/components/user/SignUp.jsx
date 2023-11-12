import useUserService from '../../services/user'
import useField from '../../hooks/useField'
import { useContext, useState } from 'react'
import UserContext from '../../contexts/userContext'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import PasswordWithValidation from '../basic/PasswordValidation'
import { toast } from 'react-toastify'
import Input from '../basic/Input'

const SignUp = () => {
  const userService = useUserService()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [, setUser] = useContext(UserContext)

  const email = useField('email')
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
  const [emailUsedReminderVisible, setEmailUsedReminderVisible] =
    useState(false)
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
      userService
        .create({
          email: email.value,
          password: password1.value,
        })
        .then(() => {
          userService
            .login(email.value, password1.value)
            .then((loginResult) => {
              window.localStorage.setItem(
                'maiznicafloraUser',
                JSON.stringify(loginResult.data)
              )
              setUser(loginResult.data)
            })
          navigate('/info/registered')
        })
        .catch((error) => {
          console.log(error)
          if (
            error.response.status === 400 &&
            error.response.data.error === 'This email is already used.'
          ) {
            setEmailUsedReminderVisible(true)
          } else if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            toast.error(error.response.data.error)
          }
        })
    }
    setTimeout(() => {
      setBlinkRequirements(false)
      setEmailUsedReminderVisible(false)
    }, 3000)
  }

  return (
    <div className="center-h">
      <div className="card p-b">
        <h1 className="big-title">{lang.sign_up}</h1>
        <form onSubmit={onSubmit}>
          <Input
            label={lang.email}
            {...email}
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
          {emailUsedReminderVisible && (
            <ul className="validation blink">
              <li>{lang.email_already_used}</li>
            </ul>
          )}
          <button
            className="full-width m-t-m"
            type="submit">
            {lang.sign_up}
          </button>
        </form>
        <Link
          className="card-bottom-link p-t-m"
          to="/login">
          {lang.already_have_account}
        </Link>
      </div>
    </div>
  )
}

export default SignUp
