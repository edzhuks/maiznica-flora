import { useSelector } from 'react-redux'
import OrderHeader from './OrderHeader'
import { CompactOrderItem, _CompactOrder } from './styledComponents'
import {
  calculateWeight,
  countProducts,
  gramsToKilos,
  useDateTimeFormat,
} from '../../util/convert'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import MobileContext from '../../contexts/mobileContext'

const CompactOrder = ({ order, expand }) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const { format } = useDateTimeFormat()
  const to = window.innerWidth <= 800 ? `/order/${order.id}` : order.id

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
