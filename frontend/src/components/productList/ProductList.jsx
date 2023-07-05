import useResource from '../../hooks/useResource'
import ProductListItem from './ProductListItem'
import UserContext from '../../contexts/userContext'
import { useContext } from 'react'
import styled from 'styled-components'
import { ProductRow } from '../styled/base'

const ProductList = () => {
  const [products, productService] = useResource(
    'http://localhost:3001/api/products'
  )

  return (
    <ProductRow>
      {products.map((product) => (
        <ProductListItem
          product={product}
          key={product.id}
        />
      ))}
    </ProductRow>
  )
}

export default ProductList
