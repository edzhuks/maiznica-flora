import UserContext from './contexts/userContext'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  ScrollRestoration,
} from 'react-router-dom'
import './App.css'
import Product from './components/productPage/Product'
import Login from './components/user/Login'
import SignUp from './components/user/SignUp'
import { useState, useEffect, useLayoutEffect } from 'react'
import Cart from './components/ordering/Cart'
import Order from './components/ordering/Order'
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
import ForgotPassword from './components/user/ForgotPassword'
import ResetPassword from './components/user/ResetPassword'
import PrivacyPolicyPage from './components/PrivacyPolicyPage'
import AccountPage from './components/user/AccountPage'
import ChangePassword from './components/user/ChangePassword'
import Addresses from './components/user/Adresses'
import Orders from './components/user/Orders'
import UserData from './components/user/UserData'
import InfoPage from './components/info/InfoPage'
import EmailVerified from './components/info/EmailVerified'
import Ordered from './components/info/Ordered'
import Registered from './components/info/Registered'
import AddressesPage from './components/user/AdressesPage'
import PriceMismatch from './components/info/PriceMismatch'
import { Sorting } from './components/management/Sorting'
import BannerManagement from './components/management/BannerManagement'
import SettingsPage from './components/management/Settings'

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
  borderRadius: '2px',
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
              <div className="p center-h ">
                <div
                  className="container full-width "
                  style={{ minHeight: '100vh' }}>
                  <Routes>
                    <Route
                      path="/category/:category?"
                      element={<ProductListWithCategories />}
                    />
                    <Route
                      path="/order/*"
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
                        path="sorting"
                        element={<Sorting />}
                      />
                      <Route
                        path="banners"
                        element={<BannerManagement />}
                      />
                      <Route
                        path="new_product/:productId?"
                        element={<NewProductFrom />}
                      />

                      <Route
                        path="settings"
                        element={<SettingsPage />}
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
                      path="/forgot_password"
                      element={<ForgotPassword />}
                    />
                    <Route
                      path="/finish_reset_password"
                      element={<ResetPassword />}
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
                    <Route
                      path="/privacy_policy"
                      element={<PrivacyPolicyPage />}
                    />
                    <Route
                      path="/account"
                      element={<AccountPage />}>
                      <Route
                        path="change_password"
                        element={<ChangePassword />}
                      />
                      <Route
                        path="addresses"
                        element={<AddressesPage />}
                      />
                      <Route
                        path="previous_orders"
                        element={<Orders />}
                      />
                      <Route
                        path="user_data"
                        element={<UserData />}
                      />
                    </Route>
                    <Route
                      path="/info"
                      element={<InfoPage />}>
                      <Route
                        path="email_verified"
                        element={<EmailVerified />}
                      />
                      <Route
                        path="ordered"
                        element={<Ordered />}
                      />
                      <Route
                        path="registered"
                        element={<Registered />}
                      />
                      <Route
                        path="price_mismatch"
                        element={<PriceMismatch />}
                      />
                    </Route>
                  </Routes>
                </div>
              </div>
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
