import ProductListItem from './ProductListItem'
import { EmptyProductItem, ProductRow } from '../styled/base'

const ProductList = ({ products }) => {
  return (
    <ProductRow>
      {products.map((product) => (
        <ProductListItem
          product={product}
          key={product.id}
        />
      ))}

      <EmptyProductItem />
      <EmptyProductItem />
      <EmptyProductItem />
    </ProductRow>
  )
}

export default ProductList
