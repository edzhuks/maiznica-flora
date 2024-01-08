import { useSelector } from 'react-redux'
import { centsToEuro } from '../../util/convert'
import { Link } from 'react-router-dom'
import { selectCartTotal, selectDeliveryCost } from '../../reducers/cartReducer'
import { Warning } from '@styled-icons/ionicons-solid/Warning'

const SummaryTile = ({ title, subtitle, price }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div className="row p no-row-gap">
      <div className="column no-gap">
        <h3 className="card-heading">{title}</h3>
        <p className="card-text">{subtitle}</p>
      </div>
      <div className="float-to-end">
        {isNaN(price) ? (
          <p className="hint-text">{lang.depending_on_delivery}</p>
        ) : (
          <p className="price-main no-break-words">{centsToEuro(price)}</p>
        )}
      </div>
    </div>
  )
}

const CartSummary = ({ nextStage, runChecksAndNavigate }) => {
  const total = useSelector(selectCartTotal)
  const deliveryCost = useSelector(selectDeliveryCost)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const specialOrder = useSelector((state) =>
    state.cart.content.find((i) => i.product.outOfStock)
  )
  return (
    <div className="card ">
      <SummaryTile
        title={lang.sum}
        price={total}
      />
      <div className="card-divider" />
      <SummaryTile
        title={lang.paid_delivery}
        price={deliveryCost}
      />

      <div className="card-divider" />
      <SummaryTile
        title={lang.total}
        price={deliveryCost + total}
      />
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
