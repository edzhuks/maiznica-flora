import { useSelector } from 'react-redux'
import {
  calculateWeight,
  countProducts,
  gramsToKilos,
} from '../../util/convert'
import { NavLink, useLocation, useSearchParams } from 'react-router-dom'

const CompactOrder = ({ order, expand }) => {
  const { search } = useLocation()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const to = {
    pathname: window.innerWidth <= 800 ? `/order/${order.id}` : order.id,
    search: search,
  }

  return (
    // <NavLink
    //   to={order.id}
    //   className="card p m-d row" as= "tr">
    <tr>
      <td>
        <NavLink
          to={to}
          className="card-text">
          {order.prettyID}
        </NavLink>
      </td>
      <td>
        <NavLink
          to={to}
          className="card-text">
          <b>{countProducts(order.content)} </b>
          {lang.products}
        </NavLink>
      </td>
      <td>
        <NavLink
          to={to}
          className="card-text">
          <b> {gramsToKilos(calculateWeight(order.content))}</b>
        </NavLink>
      </td>
      <td>
        <NavLink
          to={to}
          className="card-text">
          {lang[`delivery_short_${order.deliveryMethod}`] || '-'}
        </NavLink>
      </td>
      <td>
        <NavLink
          to={to}
          className="card-text">
          {lang.order_status[order.latestStatus]}
        </NavLink>
      </td>
    </tr>
    // </NavLink>
  )
}
export default CompactOrder
