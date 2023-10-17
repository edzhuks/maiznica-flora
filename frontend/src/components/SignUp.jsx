import { useNavigate } from 'react-router-dom'
import userService from '../services/user'
import useField from '../hooks/useField'
import { useContext, useState } from 'react'
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
  SubTitle,
} from './styled/base'
import { useSelector } from 'react-redux'

const SignUp = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [, setUser] = useContext(UserContext)

  const navigate = useNavigate()

  const email = useField('email')
  const password = useField('password')

  const [registered, setRegistered] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    const result = await userService.create({
      email: email.value,
      password: password.value,
    })
    console.log(result)
    if (result.status === 201) {
      setRegistered(true)
      const loginResult = await userService.login(email.value, password.value)
      window.localStorage.setItem(
        'maiznicafloraUser',
        JSON.stringify(loginResult)
      )
      setUser(loginResult)
    }
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
            <FullWidthButton type="submit">{lang.sign_up}</FullWidthButton>
          </Form>
        </LoginCard>
      )}
    </Centerer>
  )
}

export default SignUp
