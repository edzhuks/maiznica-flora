import UserContext from './contexts/userContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Product from './components/productPage/Product'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { useState, useEffect } from 'react'
import Cart from './components/Cart'
import Order from './components/Order'
import { FullHeightContainer, Padding } from './components/styled/base'
import ManagementPage from './components/management/ManagementPage'
import HomePage from './components/Home'
import ProductListWithCategories from './components/productList/ProductListWithCategories'
import Footer from './components/Footer'
import OrderManagementPage from './components/orders/OrderManagementPage'
import AboutPage from './components/AboutPage'
import ContactPage from './components/contact/ContactPage'
import { useDispatch } from 'react-redux'
import { useCartServiceDispatch } from './reducers/cartReducer'
import MobileContext from './contexts/mobileContext'
import Header from './components/Header'
import { setLanguage } from './reducers/languageReducer'
import CategoryManagement from './components/management/CategoryManagement'
import NewProductFrom from './components/management/NewProduct'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { ThemeProvider } from 'styled-components'
import SearchPage from './components/SearchPage'
import EuProjects from './components/EU_Projects'
import DistanceAgreementPage from './components/DistanceAgreementPage'

const baseTheme = {
  main: '#45941e',
  shadow:
    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
  shadowInset:
    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px inset, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px inset',
  background: '#fafafa',
  card: '#fdfdfd',
  text: '#333333',
  light: '#aaaaaa',
  lighter: '#eeeeee',
  dark: '#777777',
  white: 'white',
  error: '#bd5757',
}

const responsiveTheme = (isMobile) => {
  return {
    ...baseTheme,
    headerHeight: isMobile ? '60px' : '70px',
    padding: isMobile ? '0.6rem' : '0.9rem',
    preferredCardItemWidth: isMobile ? '50%' : '25%',
    isMobile: isMobile,
  }
}

function App() {
  const dispatch = useDispatch()
  const { loadCart } = useCartServiceDispatch()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const language = window.localStorage.getItem('language')
    if (language) {
      dispatch(setLanguage(language))
    }
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
    if (window.innerWidth < 1130) {
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
      <ThemeProvider theme={responsiveTheme(isMobile)}>
        <UserContext.Provider value={[user, setUser]}>
          <MobileContext.Provider value={[isMobile, setIsMobile]}>
            <Router>
              <Header />
              <Padding>
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
                      path="/search"
                      element={<SearchPage />}
                    />
                    <Route
                      path="/management"
                      element={<ManagementPage />}>
                      <Route
                        path="categories"
                        element={<CategoryManagement />}
                      />

                      <Route
                        path="new_product/:productId?"
                        element={<NewProductFrom />}
                      />
                    </Route>
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
                      element={<ContactPage />}
                    />
                    <Route
                      path="/about"
                      element={<AboutPage />}
                    />
                    <Route
                      path="/EU_projects"
                      element={<EuProjects />}
                    />
                    <Route
                      path="/distance_agreement"
                      element={<DistanceAgreementPage />}
                    />
                  </Routes>
                </FullHeightContainer>
              </Padding>
              <Footer />
            </Router>
          </MobileContext.Provider>
        </UserContext.Provider>
        <ToastContainer
          position="bottom-right"
          theme="colored"
        />
      </ThemeProvider>
    </>
  )
}

export default App
