import { useNavigate } from 'react-router-dom'
import useField from '../hooks/useField'
import UserContext from '../contexts/userContext'
import { useContext } from 'react'
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
    const result = await userService.login(email.value, password.value)
    console.log(result)
    setUser(result)
    window.localStorage.setItem('maiznicafloraUser', JSON.stringify(result))
    dispatch(loadCart())
    navigate('/')
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
