import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/userContext'
import { clearCart } from '../../reducers/cartReducer'

const AccountPageSideMenu = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const dispatch = useDispatch()
  const [user, setUser] = useContext(UserContext)
  const navigate = useNavigate()
  const logout = () => {
    dispatch(clearCart())
    window.localStorage.removeItem('maiznicafloraUser')
    navigate('/')
    setUser(null)
  }
  return (
    <div
      className="card column no-gap"
      style={{ flex: '1 1 200px' }}>
      <NavLink
        className="tab side-menu-tab p"
        to="previous_orders">
        {lang.previous_orders}
      </NavLink>
      <div className="card-divider" />
      <NavLink
        className="tab side-menu-tab p"
        to="change_password">
        {lang.change_password}
      </NavLink>
      <div className="card-divider" />
      <NavLink
        className="tab side-menu-tab p"
        to="user_data">
        {lang.account_information}
      </NavLink>
      <div className="card-divider" />
      <NavLink
        className="tab side-menu-tab p"
        to="addresses">
        {lang.addresses}
      </NavLink>
      <div className="card-divider" />
      <NavLink
        className="tab side-menu-tab p"
        to="/"
        onClick={logout}>
        {lang.sign_out}
      </NavLink>
    </div>
  )
}
const AccountPage = () => {
  return (
    <div className="row wrap-reverse">
      <div
        className="center-h"
        style={{ flex: '100 1 200px' }}>
        <Outlet />
      </div>
      <AccountPageSideMenu />
    </div>
  )
}

export default AccountPage
