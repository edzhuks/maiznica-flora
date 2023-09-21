import { useState } from 'react'
import ExpandedOrder from './ExpandedOrder'
import CompactOrder from './CompactOrder'

const Order = ({ order, updateOrder }) => {
  const status = order.status?.status
  const [expanded, setExpanded] = useState(false)
  const [closing, setClosing] = useState(false)

  const close = () => {
    setClosing(true)
    setTimeout(() => {
      setExpanded(false)
      setClosing(false)
    }, 300)
  }
  if (expanded) {
    return (
      <ExpandedOrder
        updateOrder={updateOrder}
        close={close}
        status={order.status?.status}
        closing={closing}
        order={order}
      />
    )
  } else {
    return (
      <CompactOrder
        status={order.status?.status}
        order={order}
        expand={() => setExpanded(true)}
      />
    )
  }
}

export default Order
