import UserContext from '../../contexts/userContext'
import { useContext, useEffect, useState } from 'react'
import useUserService from '../../services/user'
import useField from '../../hooks/useField'
import styled, { css } from 'styled-components'
import {
  Button,
  CancelButton,
  CardRow,
  Center,
  FullWidthButton,
  FullWidthCancelButton,
  Label,
  Row,
  StyledInput,
} from '../styled/base'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../reducers/cartReducer'
import { toast } from 'react-toastify'
import useToast from '../../util/promiseToast'
import useOrderService from '../../services/order'
import { Person } from '@styled-icons/evaicons-solid/Person'
import { Phone } from '@styled-icons/boxicons-solid/Phone'
import { Home } from '@styled-icons/boxicons-solid/Home'
import Addresses from '../user/Adresses'
import { Route, Routes, useMatch } from 'react-router-dom'
import Cart from './Cart'
import CartSummary from './CartSummary'
import DeliveryMethod from './DeliveryMethod'
import Payment from './Payment'
const OrderingStage = styled.div`
  width: calc(100% / 3);
  text-align: center;
  font-size: 1.2rem;
  height: calc(30px * 1.4);
  color: white;
  position: relative;
  padding-top: 10px;
  background-color: ${(props) =>
    props.stage <= props.currentStage ? props.theme.main : props.theme.light};
  z-index: ${(props) => 5 - props.stage};
  ${(props) =>
    props.stage > 0 &&
    css`
      &::after {
        content: '';
        width: 30px;
        height: 30px;
        background-color: ${(props) =>
          props.stage - 1 <= props.currentStage
            ? props.theme.main
            : props.theme.light};
        position: absolute;
        left: -15px;
        transform: rotate(-45deg);
        z-index: ${(props) => 1};
        top: calc(30px * 0.2);
        box-shadow: ${(props) => props.theme.shadow};
      }
    `}
`
const OrderingStageRow = styled.div`
  justify-content: center;
  display: flex;
  width: 93%;
  box-shadow: ${(props) => props.theme.shadow};
  position: relative;
  margin: ${(props) => props.theme.padding};
  &::after,
  &::before {
    content: '';
    width: 30px;
    height: 30px;
    background-color: ${(props) =>
      props.stage - 1 <= props.currentStage
        ? props.theme.main
        : props.theme.light};
    position: absolute;
    right: -15px;
    transform: rotate(-45deg);
    z-index: ${(props) => 1};
    top: calc(30px * 0.2);
    box-shadow: ${(props) => props.theme.shadow};
  }
  &::before {
    left: -15px;
    z-index: 10;
    background-color: ${(props) => props.theme.background};
    box-shadow: none;
  }
`

const ReverseRow = styled(CardRow)`
  flex-flow: row wrap-reverse;
  gap: ${(props) => props.theme.padding};
`
const OrderProcess = ({ stage }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <OrderingStageRow
      stage={3}
      currentStage={stage}>
      <OrderingStage
        stage={0}
        currentStage={stage}>
        {lang.cart}
      </OrderingStage>
      <OrderingStage
        stage={1}
        currentStage={stage}>
        {lang.delivery}
      </OrderingStage>
      <OrderingStage
        stage={2}
        currentStage={stage}>
        {lang.payment}
      </OrderingStage>
    </OrderingStageRow>
  )
}

const Order = () => {
  const match = useMatch('/order/:stage')
  const stage =
    match.params.stage === 'cart'
      ? 0
      : match.params.stage === 'delivery'
      ? 1
      : 2
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [selectedAddress, selectAddress] = useState()
  const dispatch = useDispatch()
  const orderService = useOrderService()
  const { showPromiseToast } = useToast()
  const cart = useSelector((state) => state.cart)
  const [deliveryMethod, setDeliveryMethod] = useState({
    method: '',
    address: undefined,
    cost: undefined,
  })
  const deliveryThreshold = 5000
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
  const order = async () => {
    if (selectedAddress) {
      console.log(orderService)
      const promise = orderService.placeOrder(selectedAddress)
      showPromiseToast({
        promise,
        successMessage: lang.toast_order_successful,
      })
      promise.then(dispatch(clearCart()))
    } else {
      console.error('No address selected')
    }
  }

  return (
    <div>
      <OrderProcess stage={stage} />
      <ReverseRow>
        <div style={{ flex: '1 1 73%' }}>
          <Routes>
            <Route
              path="cart"
              element={<Cart cart={cart} />}
            />
            <Route
              path="delivery"
              element={
                <DeliveryMethod
                  deliveryMethod={deliveryMethod}
                  setDeliveryMethod={setDeliveryMethod}
                  overThreshold={total >= deliveryThreshold}
                />
              }
            />
            <Route
              path="payment"
              element={<Payment />}
            />
          </Routes>
        </div>
        <div style={{ flex: '1 1 22%' }}>
          <CartSummary
            total={total}
            deliveryCost={total >= deliveryThreshold ? 0 : deliveryMethod.cost}
            deliveryCostRange={{ min: 0, max: 599 }}
            deliveryThreshold={deliveryThreshold}
            stage={stage}
          />
        </div>
      </ReverseRow>
    </div>
  )
}

export default Order
