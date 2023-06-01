import { useNavigate } from 'react-router-dom'
import userService from '../services/user'
import useField from '../hooks/useField'
import UserContext from '../contexts/userContext'
import { useContext } from 'react'
import Input from './basic/Input'

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
    navigate('/products')
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={onSubmit}>
        <div>
          username: <Input {...username} />
        </div>
        <div>
          password: <Input {...password} />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
