import ProductListItem from './productList/ProductListItem'
import UserContext from '../contexts/userContext'
import { useContext, useEffect, useState } from 'react'
import cartService from '../services/cart'

const Cart = () => {
  const [cart, setCart] = useState(null)

  useEffect(() => {
    cartService.getCart().then((c) => setCart(c))
  }, [])

  const removeItem = (item) => {
    setCart({
      content: cart.content.filter((i) => i.product.id !== item.product.id),
    })
  }

  return (
    <div>
      {cart && (
        <div>
          {cart.content.length > 0 ? (
            <div>
              {cart.content.map((item) => (
                <ProductListItem
                  inCart
                  quantity={item.quantity}
                  product={item.product}
                  key={item.product.id}
                  remove={() => removeItem(item)}
                />
              ))}
            </div>
          ) : (
            <p>Nothing in cart.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Cart
