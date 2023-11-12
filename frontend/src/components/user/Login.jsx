import { Link, useNavigate } from 'react-router-dom'
import useField from '../../hooks/useField'
import UserContext from '../../contexts/userContext'
import { useContext } from 'react'
import { useCartServiceDispatch } from '../../reducers/cartReducer'
import { useDispatch, useSelector } from 'react-redux'
import useUserService from '../../services/user'
import { toast } from 'react-toastify'
import Input from '../basic/Input'

const Login = () => {
  const userService = useUserService()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loadCart } = useCartServiceDispatch()
  const [, setUser] = useContext(UserContext)

  const email = useField('email')
  const password = useField('password')

  const onSubmit = async (event) => {
    event.preventDefault()
    userService
      .login(email.value, password.value)
      .then((result) => {
        console.log(result)
        setUser(result.data)
        window.localStorage.setItem(
          'maiznicafloraUser',
          JSON.stringify(result.data)
        )
        dispatch(loadCart())
        navigate('/')
      })
      .catch((result) => {
        console.log(result)
        if (result.response.status === 401) {
          toast.error(lang.invalid_credentials)
        }
      })
  }

  return (
    <div className="center-h">
      <div className="card p-b">
        <h1 className="big-title">{lang.sign_in}</h1>
        <form onSubmit={onSubmit}>
          <Input
            label={lang.email}
            {...email}
            required
          />
          <Input
            label={lang.password}
            {...password}
            required
          />

          <button
            className="full-width m-t-m"
            type="submit">
            {lang.sign_in}
          </button>
        </form>
        <Link
          className="card-bottom-link m-t-m"
          to="/signup">
          {lang.dont_have_account}
        </Link>
        <Link
          className="card-bottom-link m-t-m"
          to="/forgot_password">
          {lang.forgot_password}
        </Link>
      </div>
    </div>
  )
}

export default Login
