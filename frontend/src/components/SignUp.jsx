import useUserService from '../services/user'
import useField from '../hooks/useField'
import { useContext, useState } from 'react'
import UserContext from '../contexts/userContext'
import {
  BigTitle,
  BottomTextLink,
  Centerer,
  Form,
  FullWidthButton,
  InputGroup,
  Label,
  LoginCard,
  StyledInput,
  SubTitle,
} from './styled/base'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ValidationFailed = styled.div`
  color: #bd5757;

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
const ValidPassword = styled(ValidationFailed)`
  color: rgb(69, 148, 30);
`

const SignUp = () => {
  const userService = useUserService()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [, setUser] = useContext(UserContext)

  const email = useField('email')
  const password = useField('password')
  const [registered, setRegistered] = useState(false)

  const [emailRequiredReminderVisisble, setEmailRequiredReminderVisisble] =
    useState(false)
  const [
    passwordRequiredReminderVisisble,
    setPasswordRequiredReminderVisisble,
  ] = useState(false)
  const [emailUsedReminderVisisble, setEmailUsedReminderVisisble] =
    useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    if (email.value.length < 1 || password.value.length < 1) {
      if (email.value.length < 1) {
        setEmailRequiredReminderVisisble(true)
      }
      if (password.value.length < 1) {
        setPasswordRequiredReminderVisisble(true)
      }
    } else {
      userService
        .create({
          email: email.value,
          password: password.value,
        })
        .then(() => {
          setRegistered(true)
          userService.login(email.value, password.value).then((loginResult) => {
            window.localStorage.setItem(
              'maiznicafloraUser',
              JSON.stringify(loginResult.data)
            )
            setUser(loginResult.data)
          })
        })
        .catch((error) => {
          console.log(error)
          if (
            error.response.status === 400 &&
            error.response.data.error === 'This email is already used.'
          ) {
            setEmailUsedReminderVisisble(true)
          }
        })
    }
    setTimeout(() => {
      setEmailRequiredReminderVisisble(false)
      setPasswordRequiredReminderVisisble(false)
      setEmailUsedReminderVisisble(false)
    }, 3000)
  }

  return (
    <Centerer>
      {registered ? (
        <LoginCard>
          <BigTitle>{lang.verify_email}</BigTitle>
          <SubTitle>{lang.verification_instructions}</SubTitle>
        </LoginCard>
      ) : (
        <LoginCard>
          <BigTitle>{lang.sign_up}</BigTitle>
          <Form onSubmit={onSubmit}>
            <InputGroup>
              <Label>
                {lang.email}
                <StyledInput
                  {...email}
                  $isonlightbackground
                />
              </Label>
            </InputGroup>

            <InputGroup style={{ marginBottom: '35px' }}>
              <Label>
                {lang.password}
                <StyledInput
                  {...password}
                  $isonlightbackground
                />
              </Label>
            </InputGroup>
            {password.value.length > 0 && (
              <div>
                {password.value.length > 8 &&
                /\d/.test(password.value) &&
                /[!@#$%^&* ]/.test(password.value) &&
                /[a-zA-Z]/.test(password.value) ? (
                  <ValidPassword>
                    <h3>✔ Valid password</h3>
                  </ValidPassword>
                ) : (
                  <ValidationFailed>
                    <h3>{lang.password_must}</h3>
                    <ul>
                      {password.value.length < 8 && (
                        <li>{lang.password_8_chars}</li>
                      )}
                      {!/\d/.test(password.value) && (
                        <li>{lang.password_contain_digit}</li>
                      )}
                      {!/[!@#$%^&* ]/.test(password.value) && (
                        <li>{lang.password_contain_special}</li>
                      )}
                      {!/[a-zA-Z]/.test(password.value) && (
                        <li>{lang.password_contain_letter}</li>
                      )}
                    </ul>
                  </ValidationFailed>
                )}
              </div>
            )}
            {emailRequiredReminderVisisble && (
              <ValidationFailed>
                <h3>{lang.email_required}</h3>
              </ValidationFailed>
            )}
            {passwordRequiredReminderVisisble && (
              <ValidationFailed>
                <h3>{lang.password_required}</h3>
              </ValidationFailed>
            )}
            {emailUsedReminderVisisble && (
              <ValidationFailed>
                <h3>{lang.email_already_used}</h3>
              </ValidationFailed>
            )}
            <FullWidthButton type="submit">{lang.sign_up}</FullWidthButton>
          </Form>
          <BottomTextLink to="/login">
            {lang.already_have_account}
          </BottomTextLink>
        </LoginCard>
      )}
    </Centerer>
  )
}

export default SignUp
