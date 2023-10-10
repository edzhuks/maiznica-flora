import { EmptyProductItem, ProductRow, Spacer } from '../styled/base'
import ProductListItem from './ProductListItem'
import styled from 'styled-components'

const ProductList = ({ products }) => {
  return (
    <ProductRow>
      {products.map((product) => (
        <ProductListItem
          product={product}
          key={product.id}
        />
      ))}

      <Spacer />
      <Spacer />
      <Spacer />
    </ProductRow>
  )
}

export default ProductList
