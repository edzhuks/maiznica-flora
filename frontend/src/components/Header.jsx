import styled, { css, keyframes } from 'styled-components'
import {
  Button,
  Card,
  Container,
  InvertedButton,
  Row,
  ShadowInput,
  StyledInput,
} from './styled/base'
import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/userContext'
import { ShoppingCart } from '@styled-icons/entypo/ShoppingCart'
import { Menu } from '@styled-icons/evaicons-solid/Menu'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { clearCart } from '../reducers/cartReducer'
import MobileContext from '../contexts/mobileContext'
import { changeLanguage } from '../reducers/languageReducer'
import { ScrewdriverWrench } from '@styled-icons/fa-solid/ScrewdriverWrench'
import { DocumentBulletListClock } from '@styled-icons/fluentui-system-filled/DocumentBulletListClock'
import { Exit } from '@styled-icons/icomoon/Exit'
import { Enter } from '@styled-icons/icomoon/Enter'
import { AccountCircle } from '@styled-icons/material/AccountCircle'
import Search from './basic/Search'

const HeaderSpacer = styled.div`
  height: calc(
    ${(props) => props.theme.headerHeight} + ${(props) => props.theme.padding}
  );
`
const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
`

const DesktopHeader = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  width: 100vw;
  height: ${(props) => props.theme.headerHeight};
  position: fixed;
  top: 0;
  /* padding-top: 18px; */
  background-color: #fffdfd;
  z-index: 4;
`

const MobileHeader = styled(DesktopHeader)`
  padding: 10px 10px;
  display: flex;
  align-items: center;
`

const HeaderTab = styled(Link)`
  padding: 0 12px;
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  font-size: 22px;
  background-color: transparent;
  flex: 0 1 auto;
  display: flex;
  align-items: center;
  border: 0;
  white-space: nowrap;
  cursor: pointer;
  justify-content: center;
  transition: 0.3s;
  &:hover {
    color: ${(props) => props.theme.main};
  }
`

const pop = keyframes`
  0% {
    transform: scale(100%);
  }
  10%{
    transform: scale(80%);
  }
  20%{
    color: ${(props) => props.theme.main};

  }
  50%{
    transform: scale(200%);
  }
  80%{
    color: ${(props) => props.theme.main};

  }90%{
    transform: scale(90%);
  }
  100% {
    transform: scale(100%);
  }
`
const AnimatedShoppingCart = styled.div`
  animation: ${(props) =>
    props.cart.length > 0
      ? css`
          ${pop} 0.7s ease-in-out both
        `
      : 'none'};
`

const CartBadge = styled.div`
  display: ${(props) => (props.number > 0 ? 'block' : 'none')};
  position: absolute;
  right: -0.7rem;
  bottom: -0.7rem;
  /* margin-right: -15px; */
  /* margin-bottom: -15px; */
  background: ${(props) => props.theme.main};
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  span {
    display: block;
    text-align: center;
    width: 100%;
    color: ${(props) => props.theme.white};
    margin-top: 3px;
    font-size: 1rem;
  }
`

const slideInFromTop = keyframes`
from {
    transform: translateY(-100%);
}to{
    transform: translateY(0);
}`

const SideMenu = styled(Card)`
  position: fixed;
  left: 0;
  top: ${(props) => props.theme.headerHeight};
  z-index: 3;
  width: 100vw;
  align-items: end;
  padding: 20px 0px 0px 0px;
  animation: ${slideInFromTop} 0.2s;
`

const SideMenuTab = styled(Link)`
  flex: 0 1 auto;
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  font-size: 1rem;
  padding: 0.7rem 2rem 0.7rem 0px;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.lighter};
  width: 100%;
  text-align: right;
`

const Spacer = styled.div`
  flex: 1 1 auto;
`

const Lang = styled.div`
  display: flex;
  button {
    transition: 0.2s;

    &:hover {
      background: ${(props) => props.theme.main};
      color: ${(props) => props.theme.white};
    }
    background: ${(props) => props.theme.lighter};
    color: ${(props) => props.theme.dark};
    font-size: 12px;
    font-weight: bold;
    padding: 5px;
    margin: 0px 3px;
    border: 0px solid ${(props) => props.theme.main};
    border-radius: 50%;
    cursor: pointer;
  }
`

const MobileLang = styled(Lang)`
  flex-direction: row;
  justify-content: end;
  button {
    margin: 0px 0px 0px 15px;
    padding: 7px;
    font-size: 0.7rem;
  }
`

const Logo = styled.img`
  height: calc(${(props) => props.theme.headerHeight} - 10px);
`

const Header = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const dispatch = useDispatch()
  const [user, setUser] = useContext(UserContext)
  const [mobile, setIsMobile] = useContext(MobileContext)
  const cart = useSelector((state) => state.cart)
  const productCount = useSelector((state) =>
    state.cart.reduce((acc, cur) => {
      return acc + cur.quantity
    }, 0)
  )
  const [sideMenu, setSideMenu] = useState(false)
  const logout = () => {
    dispatch(clearCart())
    window.localStorage.removeItem('maiznicafloraUser')
    setUser(null)
  }
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const search = () => {
    navigate(`/search/?query=${searchQuery}`)
  }
  let [_, setSearchParams] = useSearchParams()
  const handleSearchChange = (newValue) => {
    setSearchQuery(newValue)
    if (location.pathname === '/search/') {
      setSearchParams({ query: newValue })
    }
  }

  return (
    <div>
      <HeaderSpacer />
      {mobile ? (
        <>
          <MobileHeader>
            <a href="/">
              <Logo
                src="https://maiznica.lv/wp-content/themes/maiznica/img/logo.png"
                style={{ marginRight: 20 }}
                alt="logo"
              />
            </a>

            <Spacer />
            {user ? (
              <HeaderTab to="/cart">
                <AnimatedShoppingCart
                  cart={cart}
                  key={JSON.stringify(cart)}>
                  <ShoppingCart size="2rem" />
                  <CartBadge number={productCount}>
                    <span>{productCount}</span>
                  </CartBadge>
                </AnimatedShoppingCart>
              </HeaderTab>
            ) : (
              <HeaderTab to="/login">
                <ShoppingCart size="2rem" />
              </HeaderTab>
            )}

            <HeaderTab
              style={{ padding: 0 }}
              as="button"
              onClick={() => setSideMenu(!sideMenu)}>
              {sideMenu ? <CloseOutline size="3rem" /> : <Menu size="3rem" />}
            </HeaderTab>
          </MobileHeader>
          {sideMenu && (
            <SideMenu>
              <Search
                value={searchQuery}
                onChange={(value) => handleSearchChange(value)}
                onEnter={search}
                onClear={() => handleSearchChange('')}
                onSearch={() => {
                  search()
                  setSideMenu(false)
                }}
              />
              <SideMenuTab
                onClick={() => setSideMenu(false)}
                to="/category/all">
                {lang.products}
              </SideMenuTab>
              <SideMenuTab
                onClick={() => setSideMenu(false)}
                to="/about">
                {lang.about}
              </SideMenuTab>
              <SideMenuTab
                onClick={() => setSideMenu(false)}
                to="/contact">
                {lang.contact}
              </SideMenuTab>
              {user && user.admin && (
                <>
                  <SideMenuTab
                    onClick={() => setSideMenu(false)}
                    to="/management/categories">
                    {lang.management}
                  </SideMenuTab>
                  <SideMenuTab
                    onClick={() => setSideMenu(false)}
                    to="/orders">
                    {lang.orders}
                  </SideMenuTab>
                </>
              )}
              {!user && (
                <>
                  <SideMenuTab
                    onClick={() => setSideMenu(false)}
                    to="/login">
                    {lang.sign_in}
                  </SideMenuTab>
                  <SideMenuTab
                    onClick={() => setSideMenu(false)}
                    to="/signup">
                    {lang.sign_up}
                  </SideMenuTab>
                </>
              )}
              {user && (
                <SideMenuTab
                  as="button"
                  onClick={logout}>
                  {lang.sign_out}{' '}
                </SideMenuTab>
              )}
              <SideMenuTab style={{ border: '0' }}>
                <MobileLang>
                  <button
                    onClick={() => {
                      dispatch(changeLanguage('lv'))
                    }}>
                    LV
                  </button>
                  <button
                    onClick={() => {
                      dispatch(changeLanguage('en'))
                    }}>
                    EN
                  </button>
                  <button
                    onClick={() => {
                      dispatch(changeLanguage('de'))
                    }}>
                    DE
                  </button>
                </MobileLang>
              </SideMenuTab>
            </SideMenu>
          )}
        </>
      ) : (
        <>
          <DesktopHeader>
            <HeaderContainer>
              <a href="/">
                <Logo
                  src="https://maiznica.lv/wp-content/themes/maiznica/img/logo.png"
                  style={{ marginRight: 20 }}
                  alt="logo"
                />
              </a>

              <HeaderTab to="/category/all">{lang.products}</HeaderTab>
              <HeaderTab to="/about">{lang.about}</HeaderTab>
              <HeaderTab to="/contact">{lang.contact}</HeaderTab>
              <Search
                value={searchQuery}
                onChange={(value) => handleSearchChange(value)}
                onEnter={search}
                onClear={() => handleSearchChange('')}
                onSearch={() => {
                  search()
                  setSideMenu(false)
                }}
              />

              <Spacer />
              {user ? (
                <HeaderTab to="/cart">
                  <AnimatedShoppingCart
                    cart={cart}
                    key={JSON.stringify(cart)}>
                    <ShoppingCart size="2.2rem" />
                    <CartBadge number={productCount}>
                      <span>{productCount}</span>
                    </CartBadge>
                  </AnimatedShoppingCart>
                </HeaderTab>
              ) : (
                <HeaderTab to="/login">
                  <ShoppingCart size="2.2rem" />
                </HeaderTab>
              )}
              {user && user.admin && (
                <>
                  <HeaderTab to="/management/categories">
                    <ScrewdriverWrench size="2rem" />
                  </HeaderTab>
                  <HeaderTab to="/orders">
                    <DocumentBulletListClock size="2rem" />
                  </HeaderTab>
                </>
              )}
              {!user && (
                <>
                  <HeaderTab to="/login">
                    <Enter size="2rem" />
                  </HeaderTab>
                  <HeaderTab to="/signup">
                    <AccountCircle size="2.2rem" />
                  </HeaderTab>
                </>
              )}
              {user && (
                <HeaderTab
                  as="button"
                  onClick={logout}>
                  <Exit size="2rem" />
                </HeaderTab>
              )}
              <Lang>
                <button
                  onClick={() => {
                    dispatch(changeLanguage('lv'))
                  }}>
                  LV
                </button>
                <button
                  onClick={() => {
                    dispatch(changeLanguage('en'))
                  }}>
                  EN
                </button>
                <button
                  onClick={() => {
                    dispatch(changeLanguage('de'))
                  }}>
                  DE
                </button>
              </Lang>
            </HeaderContainer>
          </DesktopHeader>
        </>
      )}
    </div>
  )
}

export default Header
