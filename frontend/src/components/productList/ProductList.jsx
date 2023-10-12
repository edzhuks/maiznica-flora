import { ProductRow, Spacer } from '../styled/base'
import ProductListItem from './ProductListItem'

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
