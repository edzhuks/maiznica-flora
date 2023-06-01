import UserContext from './contexts/userContext'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ProductList from './components/productList/ProductList'
import Product from './components/productPage/Product'
import Login from './components/Login'
import SignUp from './components/SignUp'
import NewProductFrom from './components/NewProduct'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <div>
          <Link to="/products">products</Link>
          {user && user.admin && <Link to="/new-product">new product</Link>}
          {!user && (
            <>
              <Link to="/login">log in</Link>
              <Link to="/signup">sign up</Link>
            </>
          )}
          {user && <button onClick={() => setUser(null)}>log out</button>}
        </div>

        <Routes>
          <Route
            path="/products"
            element={<ProductList />}
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
