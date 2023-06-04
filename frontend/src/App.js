import UserContext from './contexts/userContext'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ProductList from './components/productList/ProductList'
import Product from './components/productPage/Product'
import Login from './components/Login'
import SignUp from './components/SignUp'
import NewProductFrom from './components/NewProduct'
import { useState, useEffect } from 'react'
import Cart from './components/Cart'

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
        <div>
          <Link to="/products">products</Link>
          <Link to="/cart">cart</Link>
          {user && user.admin && <Link to="/new-product">new product</Link>}
          {!user && (
            <>
              <Link to="/login">log in</Link>
              <Link to="/signup">sign up</Link>
            </>
          )}
          {user && <button onClick={logout}>log out</button>}
        </div>

        <Routes>
          <Route
            path="/products"
            element={<ProductList />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/products/:id"
            element={<Product />}
          />
          <Route
            path="/new-product"
            element={<NewProductFrom />}
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
            element={<h1>404 Not found</h1>}
          />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
