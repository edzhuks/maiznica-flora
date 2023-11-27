import { useEffect, useState } from 'react'
import Order from './Order'
import useOrderService from '../../services/order'
import ExpandedOrder from './ExpandedOrder'
import { Outlet } from 'react-router-dom'
import CompactOrder from './CompactOrder'
import OrderList from './OrderList'

const OrderManagementPage = () => {
  const orderService = useOrderService()
  const [orders, setOrders] = useState([])
  useEffect(() => {
    orderService.getAll().then((o) => {
      o.sort((j, i) => new Date(i.datePlaced) - new Date(j.datePlaced))
      setOrders(o)
    })
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
  return <OrderList orders={orders} />
}

export default OrderManagementPage
