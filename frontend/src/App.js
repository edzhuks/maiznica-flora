import UserContext from './contexts/userContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Product from './components/productPage/Product'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { useState, useEffect } from 'react'
import Cart from './components/Cart'
import Order from './components/Order'
import { FullHeightContainer } from './components/styled/base'
import ManagementPage from './components/management/ManagementPage'
import HomePage from './components/Home'
import ProductListWithCategories from './components/productList/ProductListWithCategories'
import Footer from './components/Footer'
import OrderManagementPage from './components/orders/OrderManagementPage'
import AboutPage from './components/AboutPage'
import Contact from './components/Contact'
import { useDispatch } from 'react-redux'
import { loadCart } from './reducers/cartReducer'
import MobileContext from './contexts/mobileContext'
import Header from './components/Header'

function App() {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('maiznicafloraUser')
    if (loggedUserJSON) {
      dispatch(loadCart())
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const [isMobile, setIsMobile] = useState(false)

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 900) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  // create an event listener
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <MobileContext.Provider value={[isMobile, setIsMobile]}>
          <Router>
            <Header />
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
        </MobileContext.Provider>
      </UserContext.Provider>
      <Footer />
    </>
  )
}

export default App
