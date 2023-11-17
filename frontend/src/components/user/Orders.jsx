import { useState } from 'react'
import useOrderService from '../../services/order'
import { useEffect } from 'react'
import { OrderList } from '../orders/styledComponents'
import Order from '../orders/Order'

const Orders = () => {
  const orderService = useOrderService()
  const [orders, setOrders] = useState([])
  useEffect(() => {
    orderService.get().then((o) => {
      o.sort((j, i) => new Date(i.datePlaced) - new Date(j.datePlaced))
      setOrders(o)
    })
  }, [])

  return (
    <OrderList>
      {orders.map((o) => (
        <Order
          order={o}
          key={o.id}
          fixed={true}
        />
      ))}
    </OrderList>
  )
}
export default Orders
