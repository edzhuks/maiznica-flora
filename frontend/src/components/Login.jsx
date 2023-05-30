import { useNavigate } from 'react-router-dom'
import userService from '../services/user'
import useField from '../hooks/userField'

const Login = () => {
  const navigate = useNavigate()

  const username = useField('text')
  const password = useField('password')

  const onSubmit = (event) => {
    event.preventDefault()
    userService.login(username.value, password.value)
    navigate('/products')
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={onSubmit}>
        <div>
          username: <input {...username} />
        </div>
        <div>
          password: <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
