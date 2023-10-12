import { useNavigate } from 'react-router-dom'
import userService from '../services/user'
import useField from '../hooks/useField'
import UserContext from '../contexts/userContext'
import { useContext } from 'react'
import { loadCart } from '../reducers/cartReducer'
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
} from './styled/base'

const Login = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [, setUser] = useContext(UserContext)

  const username = useField('text')
  const password = useField('password')

  const onSubmit = async (event) => {
    event.preventDefault()
    const result = await userService.login(username.value, password.value)
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
              {lang.username}
              <StyledInput
                {...username}
                $isonlightbackground
              />
            </Label>
          </InputGroup>
          <InputGroup>
            <Label>
              {lang.password}
              <StyledInput
                {...password}
                $isonlightbackground
              />
            </Label>
          </InputGroup>

          <FullWidthButton
            style={{ marginTop: '40px' }}
            type="submit">
            {lang.sign_in}
          </FullWidthButton>
        </Form>
      </LoginCard>
    </Centerer>
  )
}

export default Login
