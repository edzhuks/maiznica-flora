import { useDispatch, useSelector } from 'react-redux'
import {
  BigTitle,
  CancelButton,
  FullWidthCancelButton,
  InputGroup,
  Label,
  LoginCard,
  PaddedForm,
} from '../styled/base'
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
    <LoginCard>
      <BigTitle>{lang.account_information}</BigTitle>
      <PaddedForm>
        <Input
          label={lang.email}
          {...email}
          disabled
          style={{ color: 'gray' }}
        />
        {deleteClicked && (
          <Input
            label={lang.password}
            {...password}
          />
        )}
      </PaddedForm>
      <CancelButton onClick={deleteAccount}>{lang.delete_account}</CancelButton>
    </LoginCard>
  )
}

export default UserData
