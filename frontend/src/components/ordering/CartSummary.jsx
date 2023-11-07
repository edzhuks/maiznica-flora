import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button, Card, ColoredText } from '../styled/base'
import { centsToEuro } from '../../util/convert'
import { Link } from 'react-router-dom'

const CostInformation = styled.span``

const CostNumber = styled.span`
  font-size: 1.5rem;
  /* position: absolute; */
  bottom: 0px;
  right: ${(props) => props.theme.padding};
  /* width: 100%; */
  flex: 1 1 50%;
  text-align: right;
`

const CostTile = styled.div`
  height: 25%;
  border-bottom: 3px ${(props) => props.theme.light} dashed;
  position: relative;
  padding: 10px;
  display: flex;
  width: 100%;
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

const SummaryItem = styled.div`
  /* margin: calc(${(props) => props.theme.padding} / 2); */
  flex: 1 1 20%;
  min-width: 245px;
`

const CartSummary = ({
  total,
  deliveryCost,
  deliveryCostRange,
  deliveryThreshold,
  stage,
  checkDeliveryMethod,
  checkCartEmpty,
}) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <SummaryItem style={{ width: '100%' }}>
      <Card>
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
            {deliveryThreshold / 100}
          </CostInformation>
          {deliveryCost === undefined ? (
            <CostNumber>
              {centsToEuro(deliveryCostRange.min)} -{' '}
              {centsToEuro(deliveryCostRange.max)}
            </CostNumber>
          ) : (
            <CostNumber>{centsToEuro(deliveryCost)}</CostNumber>
          )}
        </CostTile>
        <CostTile>
          <CostInformation>
            <b>{lang.total}</b>
          </CostInformation>
          <CostNumber>
            {deliveryCost === undefined ? (
              <ColoredText>
                {centsToEuro(deliveryCostRange.min + total)} -{' '}
                {centsToEuro(deliveryCostRange.max + total)}
              </ColoredText>
            ) : (
              <ColoredText>{centsToEuro(total + deliveryCost)}</ColoredText>
            )}
          </CostNumber>
        </CostTile>
        {stage === 0 && (
          <OrderButton>
            <Link
              to="/order/delivery"
              onClick={(e) => {
                e.preventDefault()
                checkCartEmpty()
              }}>
              <Button>{lang.to_delivery}</Button>
            </Link>
          </OrderButton>
        )}
        {stage === 1 && (
          <OrderButton>
            <Link
              to="/order/payment"
              onClick={(e) => {
                e.preventDefault()
                checkDeliveryMethod()
              }}>
              <Button>{lang.to_payment}</Button>
            </Link>
          </OrderButton>
        )}
      </Card>
    </SummaryItem>
  )
}

export default CartSummary
