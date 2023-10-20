import { CardRow, Spacer } from '../styled/base'
import ProductListItem from './ProductListItem'

const ProductList = ({ products }) => {
  return (
    <CardRow>
      {products.map((product) => (
        <ProductListItem
          product={product}
          key={product.id}
        />
      ))}

      {/* <Spacer /> */}
      {/* <Spacer /> */}
      {/* <Spacer /> */}
    </CardRow>
  )
}

export default ProductList
