import ProductListItem from '../productList/ProductListItem'
import { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  CardRow,
  ColoredText,
  FullWidthButton,
  Card,
  Spacer,
  Item,
  Button,
} from '../styled/base'
import { centsToEuro, addVat } from '../../util/convert'
import { useSelector } from 'react-redux'
import MobileContext from '../../contexts/mobileContext'

const Cart = ({ cart }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  return (
    <>
      {cart && (
        <div>
          {cart.length > 0 ? (
            <CardRow>
              {cart.map((item, index) => (
                <ProductListItem
                  inCart
                  quantity={item.quantity}
                  product={item.product}
                  key={item.product.id}
                />
              ))}
            </CardRow>
          ) : (
            <p>{lang.empty_cart}</p>
          )}
        </div>
      )}
    </>
  )
}

export default Cart
