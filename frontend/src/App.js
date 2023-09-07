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

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('maiznicafloraUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('maiznicafloraUser')
    setUser(null)
  }

  return (
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

              <HeaderTab to="/category/all">products</HeaderTab>
              <HeaderTab>About</HeaderTab>
              <HeaderTab>Contact</HeaderTab>
              <Spacer />
              {user ? (
                <HeaderTab to="/cart">
                  <ShoppingCart size={40} />
                </HeaderTab>
              ) : (
                <HeaderTab to="/login">
                  <ShoppingCart size={40} />
                </HeaderTab>
              )}
              {user && user.admin && (
                <HeaderTab to="/new-product">new product</HeaderTab>
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
        <Container>
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
          </Routes>
        </Container>
      </Router>
    </UserContext.Provider>
  )
}

export default App
