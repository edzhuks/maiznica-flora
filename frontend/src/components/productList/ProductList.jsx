import Input from '../basic/Input'
import { CardRow, Spacer } from '../styled/base'
import ProductListItem from './ProductListItem'

const ProductList = ({ products, withSearch }) => {
  return (
    <>
      {withSearch && <Input />}
      <CardRow>
        {products &&
          products.map((product) => (
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
