import { useEffect, useState } from 'react'
import useOrderService from '../../services/order'
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

  return <OrderList orders={orders} />
}

export default OrderManagementPage
