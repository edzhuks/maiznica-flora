import { Link } from 'react-router-dom'

const ProductListItem = ({ product }) => {
  return (
    <div>
      <Link to={`/products/${product.id}`}>{product.name}</Link>
      <p>{product.description}</p>
      <p>
        {product.price} euro <br />
        {product.weight} grams
      </p>
      <h4>rating: {product.rating}</h4>
    </div>
  )
}

export default ProductListItem
