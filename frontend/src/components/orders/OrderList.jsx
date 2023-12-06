import { Outlet } from 'react-router-dom'
import CompactOrder from './CompactOrder'

const OrderList = ({ orders }) => {
  return (
    <div
      className="row no-wrap"
      style={{ width: '100%' }}>
      <table
        className="order-table"
        style={{ flex: '0 0 auto' }}>
        <tbody>
          {orders.map((o) => (
            <CompactOrder
              order={o}
              key={o.id}
            />
          ))}
        </tbody>
      </table>
      <Outlet />
    </div>
  )
}
export default OrderList
