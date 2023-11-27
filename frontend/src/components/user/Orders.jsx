import { useState } from 'react'
import useOrderService from '../../services/order'
import { useEffect } from 'react'
import Order from '../orders/Order'
import OrderList from '../orders/OrderList'

const Orders = () => {
  const orderService = useOrderService()
  const [orders, setOrders] = useState([])
  useEffect(() => {
    orderService.getMine().then((o) => {
      o.sort((j, i) => new Date(i.datePlaced) - new Date(j.datePlaced))
      setOrders(o)
    })
  }, [])

  return <OrderList orders={orders} />
}
export default Orders
