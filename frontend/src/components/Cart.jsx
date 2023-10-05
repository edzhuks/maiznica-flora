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
import { centsToEuro } from '../util/convert'
import { useSelector } from 'react-redux'

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
  padding: 0px 20px 20px 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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
  const cart = useSelector((state) => state.cart)
  const total = useSelector((state) =>
    state.cart
      .map((i) => i.product.price * i.quantity)
      .reduce((acc, cur) => {
        return acc + cur
      }, 0)
  )
  const deliveryCost = useSelector((state) =>
    state.cart
      .map((i) => i.product.price * i.quantity)
      .reduce((acc, cur) => {
        return acc + cur
      }, 0) >
    30 * 100
      ? 0
      : 10 * 100
  )

  return (
    <>
      {cart && (
        <div style={{ display: 'inline-block', width: '100%' }}>
          <CartContents>
            {cart.length > 0 ? (
              <ProductRow>
                {cart.map((item) => (
                  <ProductListItem
                    inCart
                    quantity={item.quantity}
                    product={item.product}
                    key={item.product.id}
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
                <br /> (under €30):
              </p>
              <p>
                <b>Total:</b>
              </p>
            </SummrayLeft>
            <SummrayRight>
              <p>{centsToEuro(total)}</p>
              <p>
                <br />
                {centsToEuro(deliveryCost)}
              </p>
              <p>
                <b>
                  <ColoredText>{centsToEuro(total + deliveryCost)}</ColoredText>
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
