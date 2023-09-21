import ProductListItem from './productList/ProductListItem'
import UserContext from '../contexts/userContext'
import { useContext, useEffect, useState } from 'react'
import cartService from '../services/cart'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  Button,
  ColoredText,
  FullWidthButton,
  Right,
  Row,
  Title,
} from './styled/base'

const CartContents = styled.div`
  float: left;
  width: 100%;
  @media (min-width: 768px) {
    width: 75%;
  }
`

const ProductRow = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 30px;
`

const CartSummary = styled.div`
  float: right;
  width: 25%;
  padding: 0px 20px;
`
const SummrayLeft = styled.div`
  float: left;
  width: 65%;
  text-align: right;
  background-color: #fbfbfb;
`
const SummrayRight = styled.div`
  float: right;
  width: 30%;
  background-color: #fbfbfb;
`

const Cart = () => {
  const [cart, setCart] = useState(null)
  const [total, setTotal] = useState(0)
  const [deliveryCost, setDeliveryCost] = useState(0)

  useEffect(() => {
    update()
  }, [])

  const update = () => {
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
  }

  const removeItem = (item) => {
    setCart({
      content: cart.content.filter((i) => i.product.id !== item.product.id),
    })
  }

  return (
    <>
      {cart && (
        <div style={{ display: 'inline-block', width: '100%' }}>
          <CartContents>
            {cart.content.length > 0 ? (
              <ProductRow>
                {cart.content.map((item) => (
                  <ProductListItem
                    inCart
                    quantity={item.quantity}
                    product={item.product}
                    key={item.product.id}
                    remove={() => removeItem(item)}
                    update={update}
                  />
                ))}
              </ProductRow>
            ) : (
              <p>Nothing in cart.</p>
            )}
          </CartContents>
          <CartSummary>
            <SummrayLeft>
              <p>
                <b>Sum:</b>
              </p>
              <p>
                <b>Paid delivery</b>
                <br /> (under €50):
              </p>
              <p>
                <b>Total:</b>
              </p>
            </SummrayLeft>
            <SummrayRight>
              <p>€{total}</p>
              <p>
                <br />€{total > 50 ? 0 : deliveryCost}
              </p>
              <p>
                <b>
                  <ColoredText>€{total + deliveryCost}</ColoredText>
                </b>
              </p>
            </SummrayRight>

            <Link to="/order">
              <FullWidthButton>Order</FullWidthButton>
            </Link>
          </CartSummary>
        </div>
      )}
    </>
  )
}

export default Cart
