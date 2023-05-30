import { useNavigate } from 'react-router-dom'
import userService from '../services/user'
import useField from '../hooks/userField'

const SignUp = () => {
  const navigate = useNavigate()

  const username = useField('text')
  const password = useField('password')

  const onSubmit = (event) => {
    event.preventDefault()
    userService.create({
      username: username.value,
      password: password.value,
    })
    navigate('/products')
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          username: <input {...username} />
        </div>
        <div>
          password: <input {...password} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
