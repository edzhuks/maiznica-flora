import ProductListItem from './productList/ProductListItem'
import UserContext from '../contexts/userContext'
import { useContext, useEffect, useState } from 'react'
import cartService from '../services/cart'
import { Link } from 'react-router-dom'

const Cart = () => {
  const [cart, setCart] = useState(null)
  const [total, setTotal] = useState(0)
  const [deliveryCost, setDeliveryCost] = useState(0)

  useEffect(() => {
    cartService.getCart().then((c) => {
      setCart(c)
      setTotal(
        c.content.reduce(
          (sum, item) => sum + item.quantity * item.product.price,
          0
        )
      )
      setDeliveryCost(total > 50 ? 0 : 7)
    })
  }, [])

  const removeItem = (item) => {
    setCart({
      content: cart.content.filter((i) => i.product.id !== item.product.id),
    })
  }

  return (
    <>
      {cart && (
        <div style={{ display: 'flex' }}>
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
          <div>
            <p>Sum: €{total}</p>
            <p>Paid delivery (under €50): €{total > 50 ? 0 : deliveryCost}</p>
            <p>Total: €{total + deliveryCost}</p>
            <Link to="/order">
              <button>order</button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
