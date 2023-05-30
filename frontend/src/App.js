import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ProductList from './components/productList/ProductList'
import Product from './components/productPage/Product'
import Login from './components/Login'
import SignUp from './components/SignUp'

function App() {
  return (
    <Router>
      <div>
        <Link to="/products">products</Link>
        <Link to="/login">log in</Link>
        <Link to="/signup">sign up</Link>
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
  )
}

export default App
