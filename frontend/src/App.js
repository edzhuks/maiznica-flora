import UserContext from './contexts/userContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductList from './components/productList/ProductList'
import Product from './components/productPage/Product'
import Login from './components/Login'
import SignUp from './components/SignUp'
import NewProductFrom from './components/management/NewProduct'
import { useState, useEffect } from 'react'
import Cart from './components/Cart'
import Order from './components/Order'
import {
  Container,
  FullHeightContainer,
  Header,
  HeaderSpacer,
  HeaderTab,
  HeaderTail,
  Row,
  Spacer,
} from './components/styled/base'
import { ShoppingCart } from '@styled-icons/entypo/ShoppingCart'
import ManagementPage from './components/management/ManagementPage'
import HomePage from './components/Home'
import ProductListWithCategories from './components/productList/ProductListWithCategories'
import Footer from './components/Footer'
import OrderManagementPage from './components/orders/OrderManagementPage'
import AboutPage from './components/AboutPage'
import Contact from './components/Contact'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, loadCart } from './reducers/cartReducer'
import styled, { css, keyframes } from 'styled-components'

const pop = keyframes`
  0% {
    transform: scale(100%);
  }
  10%{
    transform: scale(80%);
  }
  20%{
    color: rgb(69, 148, 30);

  }
  50%{
    transform: scale(200%);
  }
  80%{
    color: rgb(69, 148, 30);

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
  background: rgb(69, 148, 30);
  width: 30px;
  height: 30px;
  border-radius: 100%;
  span {
    display: inline-block;
    text-align: center;
    width: 100%;
    color: white;
    margin-top: 2px;
  }
`

function App() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const productCount = useSelector((state) =>
    state.cart.reduce((acc, cur) => {
      return acc + cur.quantity
    }, 0)
  )
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('maiznicafloraUser')
    if (loggedUserJSON) {
      dispatch(loadCart())
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const logout = () => {
    dispatch(clearCart())
    window.localStorage.removeItem('maiznicafloraUser')
    setUser(null)
  }

  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <HeaderSpacer />
          <Header>
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

                <HeaderTab to="/category/all">Products</HeaderTab>
                <HeaderTab to="/about">About</HeaderTab>
                <HeaderTab to="/contact">Contact</HeaderTab>

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
                    <HeaderTab to="/new-product">new product</HeaderTab>
                    <HeaderTab to="/orders">orders</HeaderTab>
                  </>
                )}
                {!user && (
                  <>
                    <HeaderTab to="/login">Sign in</HeaderTab>
                    <HeaderTab to="/signup">sign up</HeaderTab>
                  </>
                )}
                {user && (
                  <HeaderTab
                    as="button"
                    onClick={logout}>
                    log out
                  </HeaderTab>
                )}
              </Row>
            </Container>
          </Header>
          <FullHeightContainer>
            <Routes>
              <Route
                path="/category/:category?"
                element={<ProductListWithCategories />}
              />
              <Route
                path="/cart"
                element={<Cart />}
              />
              <Route
                path="/order"
                element={<Order />}
              />
              <Route
                path="/products/:id"
                element={<Product />}
              />
              <Route
                path="/new-product"
                element={<ManagementPage />}
              />
              <Route
                path="/orders"
                element={<OrderManagementPage />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<SignUp />}
              />
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route
                path="/contact"
                element={<Contact />}
              />
              <Route
                path="/about"
                element={<AboutPage />}
              />
            </Routes>
          </FullHeightContainer>
        </Router>
      </UserContext.Provider>
      <Footer />
    </>
  )
}

export default App
