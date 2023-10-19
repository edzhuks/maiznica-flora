import styled, { css, keyframes } from 'styled-components'
import { Card, Container, Row } from './styled/base'
import { useDispatch, useSelector } from 'react-redux'
import { useContext, useState } from 'react'
import UserContext from '../contexts/userContext'
import { ShoppingCart } from '@styled-icons/entypo/ShoppingCart'
import { Menu } from '@styled-icons/evaicons-solid/Menu'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'
import { Link } from 'react-router-dom'
import { clearCart } from '../reducers/cartReducer'
import MobileContext from '../contexts/mobileContext'
import { changeLanguage } from '../reducers/languageReducer'

const HeaderSpacer = styled.div`
  height: 130px;
`

const DesktopHeader = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  width: 100%;
  height: 110px;
  position: fixed;
  top: 0;
  padding-top: 18px;
  background-color: #fffdfd;
  z-index: 4;
`

const MobileHeader = styled(DesktopHeader)`
  padding: 20px 40px;
`

const HeaderTab = styled(Link)`
  padding: 0 30px;
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  font-size: 22px;
  background-color: transparent;
  flex: 0 1 auto;
  display: flex;
  align-items: center;
  border: 0;
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
  right: 0;
  bottom: 0;
  margin-right: -15px;
  margin-bottom: -15px;
  background: ${(props) => props.theme.main};
  width: 30px;
  height: 30px;
  border-radius: 100%;
  span {
    display: inline-block;
    text-align: center;
    width: 100%;
    color: ${(props) => props.theme.white};
    margin-top: 2px;
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
  right: 0;
  top: 110px;
  z-index: 3;
  width: 100%;
  align-items: end;
  padding: 30px 0px;
  animation: ${slideInFromTop} 0.2s;
`

const SideMenuTab = styled(Link)`
  flex: 0 1 auto;
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  font-size: 22px;
  padding: 20px 80px 20px 0px;
  background-color: transparent;
  border: 0;
`

const Spacer = styled.div`
  flex: 1 1 auto;
`

const Lang = styled.div`
  display: flex;
  flex-direction: column;
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
    margin: -4px 0px 8px 0px;
    border: 0px solid ${(props) => props.theme.main};
    border-radius: 50%;
    /* margin-left: 7px; */
    cursor: pointer;
  }
`

const MobileLang = styled(Lang)`
  flex-direction: row;
  button {
    margin: 0px 15px;
    padding: 10px;
    font-size: 16px;
  }
`

const Header = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  console.log(lang)
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
  return (
    <div>
      <HeaderSpacer />
      {mobile ? (
        <>
          <MobileHeader>
            <Row>
              <a href="/">
                <img
                  src="https://maiznica.lv/wp-content/themes/maiznica/img/logo.png"
                  width={93}
                  height={73}
                  style={{ marginRight: 20 }}
                />
              </a>

              <Spacer />
              {user ? (
                <HeaderTab to="/cart">
                  <AnimatedShoppingCart
                    cart={cart}
                    key={JSON.stringify(cart)}>
                    <ShoppingCart size={50} />
                    <CartBadge number={productCount}>
                      <span>{productCount}</span>
                    </CartBadge>
                  </AnimatedShoppingCart>
                </HeaderTab>
              ) : (
                <HeaderTab to="/login">
                  <ShoppingCart size={50} />
                </HeaderTab>
              )}

              <HeaderTab
                style={{ padding: 0 }}
                as="button"
                onClick={() => setSideMenu(!sideMenu)}>
                {sideMenu ? <CloseOutline size={70} /> : <Menu size={70} />}
              </HeaderTab>
            </Row>
          </MobileHeader>
          {sideMenu && (
            <SideMenu>
              <SideMenuTab to="/category/all">{lang.products}</SideMenuTab>
              <SideMenuTab to="/about">{lang.about}</SideMenuTab>
              <SideMenuTab to="/contact">{lang.contact}</SideMenuTab>
              {user && user.admin && (
                <>
                  <SideMenuTab to="/management/categories">
                    {lang.management}
                  </SideMenuTab>
                  <SideMenuTab to="/orders">{lang.orders}</SideMenuTab>
                </>
              )}
              {!user && (
                <>
                  <SideMenuTab to="/login">{lang.sign_in}</SideMenuTab>
                  <SideMenuTab to="/signup">{lang.sign_up}</SideMenuTab>
                </>
              )}
              {user && (
                <SideMenuTab
                  as="button"
                  onClick={logout}>
                  {lang.sign_out}
                </SideMenuTab>
              )}
              <SideMenuTab>
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
        <DesktopHeader>
          <Container>
            <Row>
              <a href="/">
                <img
                  src="https://maiznica.lv/wp-content/themes/maiznica/img/logo.png"
                  width={93}
                  height={73}
                  style={{ marginRight: 20 }}
                />
              </a>

              <HeaderTab to="/category/all">{lang.products}</HeaderTab>
              <HeaderTab to="/about">{lang.about}</HeaderTab>
              <HeaderTab to="/contact">{lang.contact}</HeaderTab>

              <Spacer />
              {user ? (
                <HeaderTab to="/cart">
                  <AnimatedShoppingCart
                    cart={cart}
                    key={JSON.stringify(cart)}>
                    <ShoppingCart size={50} />
                    <CartBadge number={productCount}>
                      <span>{productCount}</span>
                    </CartBadge>
                  </AnimatedShoppingCart>
                </HeaderTab>
              ) : (
                <HeaderTab to="/login">
                  <ShoppingCart size={40} />
                </HeaderTab>
              )}
              {user && user.admin && (
                <>
                  <HeaderTab to="/management/categories">
                    {lang.management}
                  </HeaderTab>
                  <HeaderTab to="/orders">{lang.orders}</HeaderTab>
                </>
              )}
              {!user && (
                <>
                  <HeaderTab to="/login">{lang.sign_in}</HeaderTab>
                  <HeaderTab to="/signup">{lang.sign_up}</HeaderTab>
                </>
              )}
              {user && (
                <HeaderTab
                  as="button"
                  onClick={logout}>
                  {lang.sign_out}
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
            </Row>
          </Container>
        </DesktopHeader>
      )}
    </div>
  )
}

export default Header
