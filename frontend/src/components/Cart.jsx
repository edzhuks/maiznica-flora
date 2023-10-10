import ProductListItem from './productList/ProductListItem'
import { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  ColoredText,
  FullWidthButton,
  ProductCard,
  Spacer,
} from './styled/base'
import { centsToEuro } from '../util/convert'
import { useSelector } from 'react-redux'
import MobileContext from '../contexts/mobileContext'

const ProductRow = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 30px;
`

const EmptyProductItem = styled.div`
  width: calc(100% / 4 - 23px);
  height: 0;
`

const SummaryCard = styled(ProductCard)``

const CostInformation = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
`

const CostNumber = styled.span`
  font-size: 40px;
  position: absolute;
  bottom: 20px;
  right: 20px;
`

const CostTile = styled.div`
  height: 28%;
  border-bottom: 4px #dddddd dashed;
  position: relative;
  padding: 10px;
`

const OrderButton = styled.div`
  height: calc(100% - 28 * 3%);
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  justify-content: center;
`

const CartSummary = ({ total, deliveryCost }) => {
  return (
    <SummaryCard>
      <CostTile>
        <CostInformation>
          <b>Sum</b>
        </CostInformation>
        <CostNumber>{centsToEuro(total)}</CostNumber>
      </CostTile>
      <CostTile>
        <CostInformation>
          <b>Paid delivery</b>
          <br />
          (under €30)
        </CostInformation>
        <CostNumber>{centsToEuro(deliveryCost)}</CostNumber>
      </CostTile>
      <CostTile>
        <CostInformation>
          <b>Total</b>
        </CostInformation>
        <CostNumber>
          <ColoredText>{centsToEuro(total + deliveryCost)}</ColoredText>
        </CostNumber>
      </CostTile>
      <OrderButton>
        <Link to="/order">
          <FullWidthButton>Order</FullWidthButton>
        </Link>
      </OrderButton>
    </SummaryCard>
  )
}

const Cart = () => {
  const [mobile, setIsMobile] = useContext(MobileContext)

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
            <ProductRow>
              {cart.map((item, index) => (
                <Fragment key={index}>
                  <ProductListItem
                    inCart
                    quantity={item.quantity}
                    product={item.product}
                    key={item.product.id}
                  />
                  {mobile && index === 0 && (
                    <CartSummary
                      total={total}
                      deliveryCost={deliveryCost}
                    />
                  )}
                  {!mobile && index === 2 && (
                    <CartSummary
                      total={total}
                      deliveryCost={deliveryCost}
                    />
                  )}
                  {!mobile && index === 1 && cart.length === 2 && (
                    <>
                      <EmptyProductItem />
                      <CartSummary
                        total={total}
                        deliveryCost={deliveryCost}
                      />
                    </>
                  )}
                  {!mobile && index === 0 && cart.length === 1 && (
                    <>
                      <EmptyProductItem />
                      <EmptyProductItem />
                      <CartSummary
                        total={total}
                        deliveryCost={deliveryCost}
                      />
                    </>
                  )}
                </Fragment>
              ))}
              <Spacer />
              <Spacer />
              <Spacer />
            </ProductRow>
          ) : (
            <p>Nothing in cart.</p>
          )}
          {/* <CartSummary>
            
          </CartSummary> */}
        </div>
      )}
    </>
  )
}

export default Cart
