import { useNavigate } from 'react-router-dom'
import userService from '../services/user'
import useField from '../hooks/useField'
import { useState } from 'react'
import Input from './basic/Input'

const SignUp = () => {
  const navigate = useNavigate()

  const username = useField('text')
  const email = useField('email')
  const password = useField('password')

  const [admin, setAdmin] = useState(false)
  const [maintainer, setMaintainer] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault()
    userService.create({
      username: username.value,
      email: email.value,
      password: password.value,
      admin,
      maintainer,
    })
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
