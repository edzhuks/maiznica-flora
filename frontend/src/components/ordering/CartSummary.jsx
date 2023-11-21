import { useSelector } from 'react-redux'
import { centsToEuro } from '../../util/convert'
import { Link } from 'react-router-dom'
import {
  DELIVERY_THRESHOLD,
  selectCartOverThreshold,
  selectCartTotal,
  selectDeliveryCost,
} from '../../reducers/cartReducer'

const SummaryTile = ({ title, subtitle, price, price2 }) => {
  return (
    <div className="row p no-row-gap">
      <div className="column no-gap">
        <h3 className="card-heading">{title}</h3>
        <p className="card-text">{subtitle}</p>
      </div>
      <div className="float-to-end">
        <p className="price-main no-break-words">
          {centsToEuro(price)} {price2 && <span> - {centsToEuro(price2)}</span>}
        </p>
      </div>
    </div>
  )
}

const CartSummary = ({ nextStage, runChecksAndNavigate }) => {
  const total = useSelector(selectCartTotal)
  const deliveryCost = useSelector(selectDeliveryCost)
  const overThreshold = useSelector(selectCartOverThreshold)
  console.log(total)
  console.log(deliveryCost)
  console.log(overThreshold)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div className="card">
      <SummaryTile
        title={lang.sum}
        price={total}
      />
      <div className="card-divider" />
      <SummaryTile
        title={lang.paid_delivery}
        subtitle={`${lang.under}${DELIVERY_THRESHOLD / 100}`}
        price={deliveryCost[0]}
        price2={deliveryCost[1]}
      />

      <div className="card-divider" />
      <SummaryTile
        title={lang.total}
        price={deliveryCost[0] + total}
        price2={deliveryCost[1] && deliveryCost[1] + total}
      />

      {nextStage && (
        <div className="row end p">
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
