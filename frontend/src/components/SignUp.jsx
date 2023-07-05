import { useNavigate } from 'react-router-dom'
import userService from '../services/user'
import useField from '../hooks/useField'
import { useContext, useState } from 'react'
import Input from './basic/Input'
import UserContext from '../contexts/userContext'
import {
  BigTitle,
  Centerer,
  CheckBox,
  FullWidthButton,
  InputGroup,
  Label,
  LoginCard,
  LoginInput,
} from './styled/base'

const SignUp = () => {
  const [user, setUser] = useContext(UserContext)

  const navigate = useNavigate()

  const username = useField('text')
  const email = useField('email')
  const password = useField('password')

  const [admin, setAdmin] = useState(false)
  const [maintainer, setMaintainer] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    await userService.create({
      username: username.value,
      email: email.value,
      password: password.value,
      admin,
      maintainer,
    })
    const result = await userService.login(username.value, password.value)
    console.log(result)
    setUser(result)
    window.localStorage.setItem('maiznicafloraUser', JSON.stringify(result))
    navigate('/products')
  }

  return (
    <Centerer>
      <LoginCard>
        <BigTitle>Register</BigTitle>
        <form onSubmit={onSubmit}>
          <InputGroup>
            <Label>Username</Label> <LoginInput {...username} />
          </InputGroup>
          <InputGroup>
            <Label>Email</Label> <LoginInput {...email} />
          </InputGroup>
          <InputGroup>
            <Label>Password</Label> <LoginInput {...password} />
          </InputGroup>
          <CheckBox>
            <Input
              type="checkbox"
              checked={admin}
              onChange={() => setAdmin(!admin)}
            />
            <span></span>
            <p>Admin</p>
          </CheckBox>
          <CheckBox>
            <Input
              type="checkbox"
              checked={maintainer}
              onChange={() => setMaintainer(!maintainer)}
            />
            <span></span>
            <p>Maintainer</p>
          </CheckBox>
          <FullWidthButton type="submit">Sign Up</FullWidthButton>
        </form>
      </LoginCard>
    </Centerer>
  )
}

export default SignUp
