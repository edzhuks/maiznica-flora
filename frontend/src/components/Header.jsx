import styled, { css, keyframes } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useContext, useState } from 'react'
import UserContext from '../contexts/userContext'
import { ShoppingCart } from '@styled-icons/entypo/ShoppingCart'
import { Menu } from '@styled-icons/evaicons-solid/Menu'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { clearCart } from '../reducers/cartReducer'
import MobileContext from '../contexts/mobileContext'
import { changeLanguage } from '../reducers/languageReducer'
import { ScrewdriverWrench } from '@styled-icons/fa-solid/ScrewdriverWrench'
import { DocumentBulletListClock } from '@styled-icons/fluentui-system-filled/DocumentBulletListClock'
import Search from './basic/Search'
import { PiggyBank } from '@styled-icons/fa-solid/PiggyBank'
import { centsToEuro } from '../util/convert'

const pop = keyframes`
  0% {
    transform: scale(100%);
  }
  10%{
    transform: scale(80%);
  }
  20%{
    color: var(--accent);

  }
  50%{
    transform: scale(200%);
  }
  80%{
    color: var(--accent);

  }90%{
    transform: scale(90%);
  }
  100% {
    transform: scale(100%);
  }
`
const AnimatedShoppingCart = styled.div`
  position: relative;
  animation: ${(props) =>
    props.animate
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
  background: var(--accent);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  span {
    display: block;
    text-align: center;
    width: 100%;
    color: var(--surface);
    margin-top: 1px;
    font-size: 1rem;
  }
`

const Lang = styled.div`
  display: flex;
  align-items: center;
  button {
    transition: 0.2s;
    box-shadow: none;
    &:hover {
      background: var(--main);
      color: var(--surface);
    }
    background: var(--subtler);
    color: var(--almost-main);
    font-size: 12px;
    font-weight: bold;
    padding: 8px;
    margin: 0px 3px;
    border-radius: 50%;
  }
`

const MobileLang = styled(Lang)`
  justify-content: end;
  button {
    margin: 0px 0px 0px 15px;
  }
`

const Logo = styled.img`
  height: calc(var(--header-height) - 10px);
`

const Header = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const dispatch = useDispatch()
  const [user, setUser] = useContext(UserContext)
  const [mobile, setIsMobile] = useContext(MobileContext)
  const cart = useSelector((state) => state.cart)
  const productCount = useSelector((state) =>
    state.cart.content.reduce((acc, cur) => {
      return acc + cur.quantity
    }, 0)
  )
  const availableLoyaltyMoney = useSelector(
    (state) => state.cart.availableLoyaltyMoney
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
      <div style={{ height: 'var(--header-height)' }} />

      {sideMenu && (
        <div className="side-menu card">
          <div className="tab side-menu-tab  self-end">
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
          </div>
          <div className="card-divider" />
          <NavLink
            className="tab side-menu-tab"
            onClick={() => setSideMenu(false)}
            to="/category/all">
            {lang.products}
          </NavLink>
          <div className="card-divider" />
          <NavLink
            className="tab side-menu-tab"
            onClick={() => setSideMenu(false)}
            to="/about">
            {lang.about}
          </NavLink>
          <div className="card-divider" />
          <NavLink
            className="tab side-menu-tab"
            onClick={() => setSideMenu(false)}
            to="/contact">
            {lang.contact}
          </NavLink>
          <div className="card-divider" />
          {user && user.admin && (
            <>
              <NavLink
                className="tab side-menu-tab"
                onClick={() => setSideMenu(false)}
                to="/management/categories/complete">
                {lang.management}
              </NavLink>
              <div className="card-divider" />
              <NavLink
                className="tab side-menu-tab"
                onClick={() => setSideMenu(false)}
                to="/orders">
                {lang.orders}
              </NavLink>
              <div className="card-divider" />
            </>
          )}
          {!user && (
            <>
              <NavLink
                className="tab side-menu-tab"
                onClick={() => setSideMenu(false)}
                to="/login">
                {lang.sign_in}
              </NavLink>
              <div className="card-divider" />
              <NavLink
                className="tab side-menu-tab"
                onClick={() => setSideMenu(false)}
                to="/signup">
                {lang.sign_up}
              </NavLink>
              <div className="card-divider" />
            </>
          )}
          {user && (
            <>
              <NavLink
                className="tab side-menu-tab"
                to="/account/previous_orders"
                onClick={() => setSideMenu(false)}>
                {lang.profile}
              </NavLink>
              <div className="card-divider" />
            </>
          )}
          {user && (
            <>
              <Link
                to="/"
                className="tab side-menu-tab"
                onClick={logout}>
                {lang.sign_out}
              </Link>
              <div className="card-divider" />
            </>
          )}
          <div className="tab side-menu-tab">
            <MobileLang>
              <button
                className="btn"
                onClick={() => {
                  dispatch(changeLanguage('lv'))
                }}>
                LV
              </button>
              <button
                className="btn"
                onClick={() => {
                  dispatch(changeLanguage('en'))
                }}>
                EN
              </button>
              <button
                className="btn"
                onClick={() => {
                  dispatch(changeLanguage('de'))
                }}>
                DE
              </button>
            </MobileLang>
          </div>
        </div>
      )}
      <div className="header card full-width p-h">
        <Link
          className="tab"
          to="/">
          <Logo
            style={{ height: 'calc(var(--header-height) - 10px)' }}
            src={`https://www.maiznica.lv/images/logo-${selectedLang}.png`}
            alt="logo"
          />
        </Link>
        {!mobile && (
          <>
            <NavLink
              className="tab"
              to="/category/all">
              {lang.products}
            </NavLink>
            <NavLink
              className="tab"
              to="/about">
              {lang.about}
            </NavLink>
            <NavLink
              className="tab"
              to="/contact">
              {lang.contact}
            </NavLink>
            <Search
              className="tab"
              value={searchQuery}
              onChange={(value) => handleSearchChange(value)}
              onEnter={search}
              onClear={() => handleSearchChange('')}
              onSearch={() => {
                search()
                setSideMenu(false)
              }}
            />
          </>
        )}
        <div style={{ flex: '100 ' }} />

        {user ? (
          <NavLink
            className="tab relative"
            to="/order_process/cart">
            {availableLoyaltyMoney > 0 && (
              <p className=" column no-gap align-cross-center m-r-m m-t">
                <PiggyBank className="icon-b" />
                <p
                  className=""
                  style={{ fontSize: '0.9rem' }}>
                  {centsToEuro(availableLoyaltyMoney)}
                </p>
              </p>
            )}
            <AnimatedShoppingCart
              animate={cart.animate}
              key={JSON.stringify(cart)}>
              <ShoppingCart className="icon-b " />
              {user && (
                <CartBadge number={productCount}>
                  <span>{productCount}</span>
                </CartBadge>
              )}
            </AnimatedShoppingCart>
          </NavLink>
        ) : (
          <Link
            className="tab relative"
            to="/login">
            <ShoppingCart className="icon-b " />
          </Link>
        )}

        {!mobile && (
          <>
            {user && user.admin && (
              <>
                <NavLink
                  className="tab"
                  to="/management/categories/complete">
                  <ScrewdriverWrench className="icon-b" />
                </NavLink>
                <NavLink
                  className="tab"
                  to="/orders">
                  <DocumentBulletListClock className="icon-b" />
                </NavLink>
              </>
            )}
            {!user && (
              <NavLink
                className="tab"
                to="/login">
                {lang.sign_in}
              </NavLink>
            )}
            {user && (
              <NavLink
                className="tab"
                to="/account/previous_orders">
                {lang.profile}
              </NavLink>
            )}
            <Lang className="m-l">
              <button
                className="btn"
                onClick={() => {
                  dispatch(changeLanguage('lv'))
                }}>
                LV
              </button>
              <button
                className="btn"
                onClick={() => {
                  dispatch(changeLanguage('en'))
                }}>
                EN
              </button>
              <button
                className="btn"
                onClick={() => {
                  dispatch(changeLanguage('de'))
                }}>
                DE
              </button>
            </Lang>
          </>
        )}
        {mobile && (
          <button
            className="btn tab inverted"
            onClick={() => setSideMenu(!sideMenu)}>
            {sideMenu ? (
              <CloseOutline className="icon-xb" />
            ) : (
              <Menu className="icon-xb" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
