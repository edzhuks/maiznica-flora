import { useNavigate } from 'react-router-dom'
import userService from '../services/user'
import useField from '../hooks/useField'
import UserContext from '../contexts/userContext'
import { useContext } from 'react'
import Input from './basic/Input'
import styled from 'styled-components'
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
  const navigate = useNavigate()

  const [user, setUser] = useContext(UserContext)

  const username = useField('text')
  const password = useField('password')

  const onSubmit = async (event) => {
    event.preventDefault()
    const result = await userService.login(username.value, password.value)
    console.log(result)
    setUser(result)
    window.localStorage.setItem('maiznicafloraUser', JSON.stringify(result))
    navigate('/')
  }

  return (
    <Centerer>
      <LoginCard>
        <BigTitle>Sign In</BigTitle>
        <Form onSubmit={onSubmit}>
          <InputGroup>
            <Label>
              Username
              <StyledInput
                {...username}
                onLight
              />
            </Label>
          </InputGroup>
          <InputGroup>
            <Label>
              Password
              <StyledInput
                {...password}
                onLight
              />
            </Label>
          </InputGroup>

          <FullWidthButton type="submit">Sign In</FullWidthButton>
        </Form>
      </LoginCard>
    </Centerer>
  )
}

export default Login
