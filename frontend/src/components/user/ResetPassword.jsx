import useUserService from '../../services/user'
import useField from '../../hooks/useField'
import { useContext, useEffect, useState } from 'react'
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
  Input,
  SubTitle,
  ValidPassword,
  ValidationFailed,
} from '../styled/base'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
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
    <Centerer>
      <LoginCard>
        <BigTitle>{lang.reset_password}</BigTitle>
        <PaddedForm onSubmit={onSubmit}>
          <PasswordWithValidation
            password1={password1}
            password2={password2}
            passwordRequiredReminderVisible={passwordRequiredReminderVisible}
          />
          <FullWidthButton
            type="submit"
            style={{ marginTop: '20px', marginBottom: '-10px' }}>
            {lang.reset_password}
          </FullWidthButton>
        </PaddedForm>
      </LoginCard>
    </Centerer>
  )
}

export default ResetPassword
