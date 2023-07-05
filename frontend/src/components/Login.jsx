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
  LoginInput,
  InputGroup,
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
    navigate('/products')
  }

  return (
    <Centerer>
      <LoginCard>
        <BigTitle>Sign In</BigTitle>
        <form onSubmit={onSubmit}>
          <InputGroup>
            <Label>Username</Label>
            <LoginInput {...username} />
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <LoginInput {...password} />
          </InputGroup>

          <FullWidthButton type="submit">Sign In</FullWidthButton>
        </form>
      </LoginCard>
    </Centerer>
  )
}

export default Login
