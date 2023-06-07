import { useNavigate } from 'react-router-dom'
import userService from '../services/user'
import useField from '../hooks/useField'
import { useContext, useState } from 'react'
import Input from './basic/Input'
import UserContext from '../contexts/userContext'

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
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          username: <Input {...username} />
        </div>
        <div>
          email: <Input {...email} />
        </div>
        <div>
          password: <Input {...password} />
        </div>
        <div>
          <Input
            type="checkbox"
            checked={admin}
            onChange={() => setAdmin(!admin)}
          />
          admin
        </div>
        <div>
          <Input
            type="checkbox"
            checked={maintainer}
            onChange={() => setMaintainer(!maintainer)}
          />
          maintainer
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
