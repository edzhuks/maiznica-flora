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
  StyledInput,
  SubTitle,
} from '../styled/base'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import useToast from '../../util/promiseToast'

const ValidationFailed = styled.div`
  color: ${(props) => props.theme.error};
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
  color: ${(props) => props.theme.main};
`

const ResetPassword = () => {
  const userService = useUserService()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [, setUser] = useContext(UserContext)

  const password1 = useField('password')
  const password2 = useField('password')

  const [searchParams, setSearchParams] = useSearchParams()
  const { showPromiseToast } = useToast()
  const [
    passwordRequiredReminderVisisble,
    setPasswordRequiredReminderVisisble,
  ] = useState(false)
  const navigate = useNavigate()
  const onSubmit = async (event) => {
    event.preventDefault()
    if (password1.value.length < 1 || password2.value.length < 1) {
      setPasswordRequiredReminderVisisble(true)
    } else {
      const promise = userService.resetPassword({
        token: searchParams.get('token'),
        password: password1.value,
      })
      showPromiseToast({ promise, successMessage: lang.toast_password_reset })
      promise.then(() => navigate('/login'))
    }
    setTimeout(() => {
      setPasswordRequiredReminderVisisble(false)
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
          <InputGroup>
            <Label>
              {lang.password}
              <StyledInput
                {...password1}
                $isonlightbackground
              />
            </Label>
          </InputGroup>
          <InputGroup>
            <Label>
              {lang.confirm_password}
              <StyledInput
                {...password2}
                $isonlightbackground
              />
            </Label>
          </InputGroup>
          {password1.value.length > 0 && (
            <div>
              {password1.value.length >= 8 &&
              /\d/.test(password1.value) &&
              /[!@#$%^&* ]/.test(password1.value) &&
              /[a-zA-Z]/.test(password1.value) &&
              password1.value === password2.value ? (
                <ValidPassword>
                  <h3>✔ Valid password</h3>
                </ValidPassword>
              ) : (
                <ValidationFailed>
                  <h3>{lang.password_must}</h3>
                  <ul>
                    {password1.value.length < 8 && (
                      <li>{lang.password_8_chars}</li>
                    )}
                    {!/\d/.test(password1.value) && (
                      <li>{lang.password_contain_digit}</li>
                    )}
                    {!/[!@#$%^&* ]/.test(password1.value) && (
                      <li>{lang.password_contain_special}</li>
                    )}
                    {!/[a-zA-Z]/.test(password1.value) && (
                      <li>{lang.password_contain_letter}</li>
                    )}
                    {password1.value !== password2.value && (
                      <li>{lang.password_match}</li>
                    )}
                  </ul>
                </ValidationFailed>
              )}
            </div>
          )}

          {passwordRequiredReminderVisisble && (
            <ValidationFailed>
              <h3>{lang.password_required}</h3>
            </ValidationFailed>
          )}

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
