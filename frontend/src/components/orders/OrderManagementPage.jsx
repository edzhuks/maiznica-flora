import orderService from '../../services/order'
import { useEffect, useState } from 'react'
import { OrderList } from './styledComponents'
import Order from './Order'

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    orderService.getAll().then((o) => setOrders(o))
  }, [])

  const updateOrder = (newOrder) => {
    orderService
      .updateOrder(newOrder)
      .then((updatedOrder) =>
        setOrders(
          orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
        )
      )
  }
  return (
    <OrderList>
      {orders.map((o) => (
        <Order
          order={o}
          updateOrder={updateOrder}
          key={o.id}
        />
      ))}
    </OrderList>
  )
}

export default OrderManagementPage
