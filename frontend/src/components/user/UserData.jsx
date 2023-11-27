import { useDispatch, useSelector } from 'react-redux'
import { useContext } from 'react'
import UserContext from '../../contexts/userContext'
import useField from '../../hooks/useField'
import { useEffect } from 'react'
import { useState } from 'react'
import useUserService from '../../services/user'
import useToast from '../../util/promiseToast'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../../reducers/cartReducer'
import Input from '../basic/Input'

const UserData = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [user, setUser] = useContext(UserContext)
  const [deleteClicked, setDeleteClicked] = useState(false)
  const email = useField('email')
  const password = useField('password')
  const userService = useUserService()
  const { showPromiseToast } = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      email.changeValue(user.email)
    }
  }, [user])

  const deleteAccount = () => {
    if (!deleteClicked) {
      setDeleteClicked(true)
    } else {
      if (window.confirm(lang.confirm_delete_account)) {
        const promise = userService.deleteAccount({
          email: email.value,
          password: password.value,
        })
        showPromiseToast({
          promise,
          successMessage: lang.toast_account_deleted,
        })
        promise.then(() => {
          dispatch(clearCart())
          window.localStorage.removeItem('maiznicafloraUser')
          navigate('/')
          setUser(null)
        })
      }
    }
  }

  return (
    <div className="card">
      <h1 className="big-title m-v-b">{lang.account_information}</h1>
      <form
        className="p-h-b"
        onSubmit={(e) => {
          e.preventDefault()
        }}>
        <Input
          label={lang.email}
          {...email}
          disabled
        />
        {deleteClicked && (
          <Input
            label={lang.password}
            {...password}
            required
            autoComplete="new-password"
          />
        )}
        <button
          className="btn cancel full-width m-d-b  m-t-m"
          onClick={deleteAccount}>
          {lang.delete_account}
        </button>
      </form>
    </div>
  )
}

export default UserData
