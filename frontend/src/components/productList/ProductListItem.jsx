import { Link } from 'react-router-dom'
import cartService from '../../services/cart'
import { useState } from 'react'

const ProductListItem = ({ inCart, product, quantity, remove }) => {
  const [quantityToAdd, setQuantityToAdd] = useState(inCart ? quantity : 1)

  const addToCart = () => {
    cartService.addToCart({ quantity: quantityToAdd, product })
  }

  const removeFromCart = () => {
    cartService.removeFromCart(product)
    remove()
  }

  const addMore = async () => {
    const updated = await cartService.changeQuantity({
      quantity: quantityToAdd + 1,
      product,
    })
    setQuantityToAdd(updated.quantity)
  }

  const removeSome = async () => {
    const updated = await cartService.changeQuantity({
      quantity: quantityToAdd - 1,
      product,
    })
    if (updated.quantity === 0) {
      remove()
    }
    setQuantityToAdd(updated.quantity)
  }

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
      {inCart ? (
        <div>
          {quantityToAdd}
          <button onClick={addMore}>+</button>
          <button onClick={removeSome}>-</button>
          <button onClick={removeFromCart}>remove</button>
        </div>
      ) : (
        <div>
          <input
            value={quantityToAdd}
            onChange={(event) => setQuantityToAdd(event.target.value)}
            type="number"
          />
          <button onClick={addToCart}>add to cart</button>
        </div>
      )}
    </div>
  )
}

export default ProductListItem
