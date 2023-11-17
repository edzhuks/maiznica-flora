import Input from '../basic/Input'
import ProductListItem from './ProductListItem'

const ProductList = ({ products, withSearch }) => {
  return (
    <>
      {withSearch && <Input />}
      <div className="row stretch no-row-gap">
        {products &&
          products.map((product) => (
            <ProductListItem
              product={product}
              key={product.id}
            />
          ))}

        <div className="spacer-300" />
        <div className="spacer-300" />
        <div className="spacer-300" />
      </div>
    </>
  )
}

export default ProductList
