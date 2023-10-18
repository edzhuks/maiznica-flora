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
import styled from 'styled-components'

const PasswordValidation = styled.div`
  color: #bd5757;
  /* font-size: 14px; */
  /* font-weight: bolder; */
  ul {
    font-size: 14px;
    margin: 0;
    list-style: '●  ';
  }
  h3 {
    font-weight: normal;
    margin: 0;
  }
  line-height: 1.5;
  margin-top: -20px;
  margin-bottom: 20px;
`
const ValidPassword = styled(PasswordValidation)`
  color: rgb(69, 148, 30);
`

const SignUp = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [, setUser] = useContext(UserContext)

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
            {password.value.length > 0 && (
              <div>
                {password.value.length > 8 &&
                /\d/.test(password.value) &&
                /[!@#$%^&* ]/.test(password.value) &&
                /[a-zA-Z]/.test(password.value) ? (
                  <ValidPassword>
                    <h3>✔ Valid password</h3>
                  </ValidPassword>
                ) : (
                  <PasswordValidation>
                    <h3>Password must</h3>
                    <ul>
                      {password.value.length < 8 && (
                        <li>Be at least 8 characters long</li>
                      )}
                      {!/\d/.test(password.value) && <li>Contain a digit</li>}
                      {!/[!@#$%^&* ]/.test(password.value) && (
                        <li>Contain at least one of !@#$%^&*</li>
                      )}
                      {!/[a-zA-Z]/.test(password.value) && (
                        <li>Contain a letter</li>
                      )}
                    </ul>
                  </PasswordValidation>
                )}
              </div>
            )}
            <FullWidthButton type="submit">{lang.sign_up}</FullWidthButton>
          </Form>
        </LoginCard>
      )}
    </Centerer>
  )
}

export default SignUp

// if (
//     password.length < 8 ||
//     !/\d/.test(password) ||
//     !/[!@#$%^&* ]/.test(password) ||
//     !/[a-zA-Z]/.test(password)
//   )
