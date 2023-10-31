import ProductListItem from './productList/ProductListItem'
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
} from './styled/base'
import { centsToEuro, addVat } from '../util/convert'
import { useSelector } from 'react-redux'
import MobileContext from '../contexts/mobileContext'

const CostInformation = styled.span`
  position: absolute;
  top: calc(${(props) => props.theme.padding} / 2);
  left: ${(props) => props.theme.padding};
`

const CostNumber = styled.span`
  font-size: 1.8rem;
  position: absolute;
  bottom: 0px;
  right: ${(props) => props.theme.padding};
`

const CostTile = styled.div`
  height: 25%;
  border-bottom: 3px ${(props) => props.theme.light} dashed;
  position: relative;
  padding: 10px;
`

const OrderButton = styled.div`
  height: 25%;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding: 0 100px; */
  justify-content: end;
  padding: ${(props) => props.theme.padding};
`

const ReverseRow = styled(CardRow)`
  flex-flow: row wrap-reverse;
`

const SummaryItem = styled.div`
  margin: calc(${(props) => props.theme.padding} / 2);
  width: 300px;
  flex: 1 1 20%;
  min-width: 165px;
`

const CartSummary = ({ total, deliveryCost, deliveryThreshold }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <SummaryItem>
      <Card style={{ height: '200px' }}>
        <CostTile>
          <CostInformation>
            <b>{lang.sum}</b>
          </CostInformation>
          <CostNumber>{centsToEuro(total)}</CostNumber>
        </CostTile>
        <CostTile>
          <CostInformation>
            <b>{lang.paid_delivery}</b>
            <br />
            {lang.under}
            {deliveryThreshold}
          </CostInformation>
          <CostNumber>{centsToEuro(deliveryCost)}</CostNumber>
        </CostTile>
        <CostTile>
          <CostInformation>
            <b>{lang.total}</b>
          </CostInformation>
          <CostNumber>
            <ColoredText>{centsToEuro(total + deliveryCost)}</ColoredText>
          </CostNumber>
        </CostTile>
        <OrderButton>
          <Link to="/order">
            <Button>{lang.order}</Button>
          </Link>
        </OrderButton>
      </Card>
    </SummaryItem>
  )
}

const Cart = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  const cart = useSelector((state) => state.cart)

  const calculateSum = (cart) => {
    return cart
      .map((i) => {
        if (
          i.product.discount &&
          Date.parse(i.product.discount.startDate) <= new Date() &&
          Date.parse(i.product.discount.endDate) >= new Date()
        ) {
          return i.product.discount.discountPrice * i.quantity
        } else if (
          i.product.bulkThreshold &&
          i.product.bulkThreshold <= i.quantity
        ) {
          return i.product.bulkPrice * i.quantity
        }
        return i.product.price * i.quantity
      })
      .reduce((acc, cur) => {
        return acc + cur
      }, 0)
  }
  const total = useSelector((state) => calculateSum(state.cart))
  const deliveryCost = useSelector((state) =>
    calculateSum(state.cart) > 50 * 100 ? 0 : 399
  )

  return (
    <>
      {cart && (
        <div>
          {cart.length > 0 ? (
            <ReverseRow>
              <CardRow style={{ flex: '1 1 75%' }}>
                {cart.map((item, index) => (
                  <ProductListItem
                    inCart
                    quantity={item.quantity}
                    product={item.product}
                    key={item.product.id}
                  />
                ))}
              </CardRow>
              <CartSummary
                total={total}
                deliveryCost={deliveryCost}
                deliveryThreshold={50}
              />
            </ReverseRow>
          ) : (
            <p>{lang.empty_cart}</p>
          )}
        </div>
      )}
    </>
  )
}

export default Cart
