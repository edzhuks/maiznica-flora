import OrderHeader from './OrderHeader'
import { CompactOrderItem, _CompactOrder } from './styledComponents'

const CompactOrder = ({ order, expand }) => {
  return (
    <_CompactOrder
      onClick={expand}
      status={order.status?.status}>
      <OrderHeader
        status={order.status?.status}
        datePlaced={order.datePlaced}
        expanded={false}
      />

      {order.content.map((p) => (
        <CompactOrderItem
          key={p._id}
          packed={p.packed}>
          <b>{p.quantity}</b>
          &nbsp;&nbsp;
          {p.product.name}
          &nbsp;&nbsp;
          <b>{p.product.weight}g</b>
        </CompactOrderItem>
      ))}
    </_CompactOrder>
  )
}

export default CompactOrder
