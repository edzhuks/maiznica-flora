import useResource from '../../hooks/useResource'
import ProductListItem from './ProductListItem'
import UserContext from '../../contexts/userContext'
import { useContext } from 'react'

const ProductList = () => {
  const [products, productService] = useResource(
    'http://localhost:3001/api/products'
  )

  return (
    <div>
      {products.map((product) => (
        <ProductListItem
          product={product}
          key={product.id}
        />
      ))}
    </div>
  )
}

export default ProductList
