import { useDispatch, useSelector } from 'react-redux'
import { centsToEuro } from '../../util/convert'
import { Link } from 'react-router-dom'
import {
  selectCartSubtotal,
  selectCartTotal,
  selectDeliveryCost,
  selectReceivedLoyaltyMoney,
  useCartServiceDispatch,
} from '../../reducers/cartReducer'
import { Warning } from '@styled-icons/ionicons-solid/Warning'
import { useContext } from 'react'
import UserContext from '../../contexts/userContext'
import Input from '../basic/Input'
import useField from '../../hooks/useField'
import { useState } from 'react'

const SummaryTile = ({ title, subtitle, price, children }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <>
      {children || (
        <div className="row p no-row-gap">
          <>
            <div className="column no-gap">
              <h3 className="card-heading">{title}</h3>
              <p className="card-text">{subtitle}</p>
            </div>
            <div className="float-to-end">
              {isNaN(price) ? (
                <p className="hint-text">{lang.depending_on_delivery}</p>
              ) : (
                <>
                  {price < 0 ? (
                    <p className="hint-text">{lang.sum_too_low}</p>
                  ) : (
                    <p className="price-main no-break-words">
                      {centsToEuro(price)}
                    </p>
                  )}
                </>
              )}
            </div>
          </>
        </div>
      )}
    </>
  )
}

const CartSummary = ({ nextStage, runChecksAndNavigate }) => {
  const total = useSelector(selectCartTotal)
  const subtotal = useSelector(selectCartSubtotal)

  const deliveryCost = useSelector(selectDeliveryCost)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const specialOrder = useSelector((state) =>
    state.cart.content.find((i) => i.product.outOfStock)
  )
  const usingLoyatyMoney = useSelector((state) => state.cart.usingLoyaltyMoney)
  const availableLoyaltyMoney = useSelector(
    (state) => state.cart.availableLoyaltyMoney
  )
  const receivedLoyaltyMoney = useSelector(selectReceivedLoyaltyMoney)
  const dispatch = useDispatch()
  const { changeUsingLoyaltyMoney } = useCartServiceDispatch()
  return (
    <div className="card ">
      <SummaryTile
        title={lang.sum}
        price={subtotal}
      />
      <div className="card-divider" />
      <SummaryTile
        title={lang.paid_delivery}
        price={deliveryCost}
      />
      {availableLoyaltyMoney > 0 && (
        <>
          <div className="card-divider" />
          <SummaryTile>
            <Input
              value={usingLoyatyMoney}
              type="checkbox"
              onChange={() => {
                dispatch(changeUsingLoyaltyMoney(!usingLoyatyMoney))
              }}
              className="p">
              <div
                className="row"
                style={{
                  marginTop: '-7px',
                  marginLeft: '35px',
                  alignItems: 'baseline',
                }}>
                <p
                  style={{ alignItems: 'baseline' }}
                  className=" row no-gap card-heading align-cross-end">
                  {lang.accumulated}
                  <img
                    src="https://maiznica.lv/images/logo_no_subtitle.png"
                    className="logo-inline m-h-s "
                  />
                  {lang.money}
                </p>
                <p className="price-main no-break-words accented float-to-end">
                  <strong>- {centsToEuro(availableLoyaltyMoney)}</strong>
                </p>
              </div>
            </Input>
          </SummaryTile>
        </>
      )}
      <div className="card-divider" />
      <SummaryTile
        title={lang.total}
        price={total}
      />
      <div className="card-divider" />
      <SummaryTile>
        <div className="row p no-row-gap">
          <>
            <div className="column no-gap">
              <p
                style={{ alignItems: 'baseline' }}
                className=" row no-gap card-heading align-cross-end">
                {lang.will_receive}
                <img
                  src="https://maiznica.lv/images/logo_no_subtitle.png"
                  className="logo-inline m-h-s "
                />
                {lang.money_accusative}
              </p>
            </div>
            <div className="float-to-end">
              <p className="price-main no-break-words accented">
                <strong>{centsToEuro(receivedLoyaltyMoney)}</strong>
              </p>
            </div>
          </>
        </div>
      </SummaryTile>
      {specialOrder && (
        <div className="row p-h p-d no-wrap bad align-cross-center">
          <Warning
            className="icon-b "
            style={{ flexShrink: '0' }}
          />
          <p className="card-text wrap-n">{lang.special_order}</p>
        </div>
      )}
      {nextStage && (
        <div className="row end p p-t-0">
          <Link
            to={`/order/${nextStage}`}
            onClick={(e) => {
              e.preventDefault()
              runChecksAndNavigate()
            }}>
            <button className="btn">{lang.continue}</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default CartSummary
