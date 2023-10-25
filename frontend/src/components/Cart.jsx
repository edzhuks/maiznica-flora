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
  flex-direction: row-reverse;
`

const SummaryItem = styled.div`
  margin: calc(${(props) => props.theme.padding} / 2);
  width: clamp(350px, 380px, 380px);
`

const CartSummary = ({ total, deliveryCost }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <SummaryItem>
      <Card style={{ height: '200px' }}>
        <CostTile>
          <CostInformation>
            <b>{lang.sum}</b>
          </CostInformation>
          <CostNumber>{centsToEuro(addVat(total))}</CostNumber>
        </CostTile>
        <CostTile>
          <CostInformation>
            <b>{lang.paid_delivery}</b>
            <br />({lang.under_30})
          </CostInformation>
          <CostNumber>{centsToEuro(deliveryCost)}</CostNumber>
        </CostTile>
        <CostTile>
          <CostInformation>
            <b>{lang.total}</b>
          </CostInformation>
          <CostNumber>
            <ColoredText>
              {centsToEuro(addVat(total) + deliveryCost)}
            </ColoredText>
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
        <div>
          {cart.length > 0 ? (
            <ReverseRow>
              <CartSummary
                total={total}
                deliveryCost={deliveryCost}
              />
              {cart.map((item, index) => (
                <ProductListItem
                  inCart
                  quantity={item.quantity}
                  product={item.product}
                  key={item.product.id}
                />
              ))}
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
