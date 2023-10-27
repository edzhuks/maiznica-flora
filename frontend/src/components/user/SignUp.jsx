import useUserService from '../../services/user'
import useField from '../../hooks/useField'
import { useContext, useState } from 'react'
import UserContext from '../../contexts/userContext'
import {
  BigTitle,
  BottomTextLink,
  Centerer,
  Form,
  FullWidthButton,
  InputGroup,
  Label,
  LoginCard,
  PaddedForm,
  StyledInput,
  SubTitle,
  ValidPassword,
  ValidationFailed,
} from '../styled/base'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PasswordWithValidation from '../basic/PasswordValidation'

const SignUp = () => {
  const userService = useUserService()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [, setUser] = useContext(UserContext)

  const email = useField('email')
  const password1 = useField('password')
  const password2 = useField('password')
  const [registered, setRegistered] = useState(false)

  const [emailRequiredReminderVisible, setEmailRequiredReminderVisible] =
    useState(false)
  const [passwordRequiredReminderVisible, setPasswordRequiredReminderVisible] =
    useState(false)
  const [emailUsedReminderVisible, setEmailUsedReminderVisible] =
    useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    if (email.value.length < 1 || password1.value.length < 1) {
      if (email.value.length < 1) {
        setEmailRequiredReminderVisible(true)
      }
      if (password1.value.length < 1 || password2.value.length < 1) {
        setPasswordRequiredReminderVisible(true)
      }
    } else {
      userService
        .create({
          email: email.value,
          password: password1.value,
        })
        .then(() => {
          setRegistered(true)
          userService
            .login(email.value, password1.value)
            .then((loginResult) => {
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
            setEmailUsedReminderVisible(true)
          }
        })
    }
    setTimeout(() => {
      setEmailRequiredReminderVisible(false)
      setPasswordRequiredReminderVisible(false)
      setEmailUsedReminderVisible(false)
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
          <PaddedForm onSubmit={onSubmit}>
            <InputGroup>
              <Label>
                {lang.email}
                <StyledInput
                  {...email}
                  $isonlightbackground
                />
              </Label>
            </InputGroup>

            <PasswordWithValidation
              password1={password1}
              password2={password2}
              passwordRequiredReminderVisible={passwordRequiredReminderVisible}
            />
            {emailRequiredReminderVisible && (
              <ValidationFailed>
                <h3>{lang.email_required}</h3>
              </ValidationFailed>
            )}
            {emailUsedReminderVisible && (
              <ValidationFailed>
                <h3>{lang.email_already_used}</h3>
              </ValidationFailed>
            )}
            <FullWidthButton type="submit">{lang.sign_up}</FullWidthButton>
          </PaddedForm>
          <BottomTextLink to="/login">
            {lang.already_have_account}
          </BottomTextLink>
        </LoginCard>
      )}
    </Centerer>
  )
}

export default SignUp
