import { Link } from 'react-router-dom'

const ProductListItem = ({ product }) => {
  return (
    <div>
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          width={100}
          height={100}
        />
        <h3>{product.name}</h3>
      </Link>
      <p>
        €{product.price} {product.weight}g
      </p>
      {product.rating && <h4>{product.rating}/10</h4>}
    </div>
  )
}

export default ProductListItem
