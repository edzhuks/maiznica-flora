import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import UserContext from '../../contexts/userContext'
import { clearCart } from '../../reducers/cartReducer'

const SideMenuList = styled.ul`
  list-style: none;
  box-shadow: ${(props) => props.theme.shadow};
  margin: 0;
  padding: 0;
`
const SideMenuItem = styled.li`
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.lighter};
  text-align: right;
  width: 100%;

  height: fit-content;
`
const SideMenuLink = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  color: ${(props) => props.theme.text};
  &:hover {
    color: ${(props) => props.theme.main};
  }
  transition: 0.3s;
  background-color: transparent;
  border: 0;
  font-size: 1rem;
  padding: ${(props) => props.theme.padding};
  letter-spacing: 0.8px;
  &.active {
    background-color: ${(props) => props.theme.main};
    &:hover {
      color: ${(props) => props.theme.white};
    }
  }
`

const ReversibleRow = styled.div`
  display: flex;
  flex-flow: row wrap-reverse;
  width: 100%;
  justify-content: center;
  gap: ${(props) => props.theme.padding};
  row-gap: ${(props) => props.theme.padding};
  align-items: flex-end;
`

const AccountPageSideMenu = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const dispatch = useDispatch()
  const [user, setUser] = useContext(UserContext)
  const logout = () => {
    dispatch(clearCart())
    window.localStorage.removeItem('maiznicafloraUser')
    setUser(null)
  }
  return (
    <SideMenuList>
      <SideMenuItem>
        <SideMenuLink to="previous_orders">{lang.previous_orders}</SideMenuLink>
      </SideMenuItem>
      <SideMenuItem>
        <SideMenuLink to="change_password">{lang.change_password}</SideMenuLink>
      </SideMenuItem>
      <SideMenuItem>
        <SideMenuLink to="account_information">
          {lang.account_information}
        </SideMenuLink>
      </SideMenuItem>
      <SideMenuItem>
        <SideMenuLink to="addresses">{lang.addresses}</SideMenuLink>
      </SideMenuItem>
      <SideMenuItem>
        <SideMenuLink
          as="button"
          onClick={logout}>
          {lang.sign_out}
        </SideMenuLink>
      </SideMenuItem>
    </SideMenuList>
  )
}
const AccountPage = () => {
  return (
    <ReversibleRow>
      <Outlet />
      <AccountPageSideMenu />
    </ReversibleRow>
  )
}

export default AccountPage
