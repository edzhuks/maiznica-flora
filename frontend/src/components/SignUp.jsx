import { useNavigate } from 'react-router-dom'
import userService from '../services/user'
import useField from '../hooks/useField'
import { useContext, useState } from 'react'
import Input from './basic/Input'
import UserContext from '../contexts/userContext'
import {
  BigTitle,
  Centerer,
  Form,
  FullWidthButton,
  InputGroup,
  Label,
  LoginCard,
  StyledInput,
} from './styled/base'
import Checkbox from './basic/Checkbox'
import { useSelector } from 'react-redux'

const SignUp = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
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
    navigate('/')
  }

  return (
    <Centerer>
      <LoginCard>
        <BigTitle>{lang.sign_up}</BigTitle>
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
          {/* <Checkbox
            checked={admin}
            onChange={() => setAdmin(!admin)}
            label="Admin"
          />
          <Checkbox
            checked={maintainer}
            onChange={() => setMaintainer(!maintainer)}
            label="Maintainer"
          /> */}
          <FullWidthButton type="submit">{lang.sign_up}</FullWidthButton>
        </Form>
      </LoginCard>
    </Centerer>
  )
}

export default SignUp
