import { CardRow, Spacer, StyledInput } from '../styled/base'
import ProductListItem from './ProductListItem'

const ProductList = ({ products, withSearch }) => {
  return (
    <>
      {withSearch && <StyledInput />}
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
    </>
  )
}

export default ProductList
