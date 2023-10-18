import { useNavigate } from 'react-router-dom'
import useField from '../hooks/useField'
import UserContext from '../contexts/userContext'
import { useContext, useState } from 'react'
import { useCartServiceDispatch } from '../reducers/cartReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  FullWidthButton,
  Label,
  StyledInput,
  BigTitle,
  Centerer,
  LoginCard,
  InputGroup,
  Form,
  BottomTextLink,
} from './styled/base'
import useUserService from '../services/user'
import { toast } from 'react-toastify'

const Login = () => {
  const userService = useUserService()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loadCart } = useCartServiceDispatch()
  const [, setUser] = useContext(UserContext)

  const email = useField('email')
  const password = useField('password')

  const onSubmit = async (event) => {
    event.preventDefault()
    userService
      .login(email.value, password.value)
      .then((result) => {
        console.log(result)
        setUser(result.data)
        window.localStorage.setItem(
          'maiznicafloraUser',
          JSON.stringify(result.data)
        )
        dispatch(loadCart())
        navigate('/')
      })
      .catch((result) => {
        console.log(result)
        if (result.response.status === 401) {
          toast.error(lang.invalid_credentials)
        }
      })
  }

  return (
    <Centerer>
      <LoginCard>
        <BigTitle>{lang.sign_in}</BigTitle>
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

          <FullWidthButton type="submit">{lang.sign_in}</FullWidthButton>
        </Form>
        <BottomTextLink to="/signup">{lang.dont_have_account}</BottomTextLink>
      </LoginCard>
    </Centerer>
  )
}

export default Login
