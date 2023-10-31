import { useSelector } from 'react-redux'
import OrderHeader from './OrderHeader'
import { CompactOrderItem, _CompactOrder } from './styledComponents'

const CompactOrder = ({ order, expand }) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  return (
    <_CompactOrder
      onClick={expand}
      status={order.status?.status}>
      <OrderHeader
        status={order.status?.status}
        datePlaced={order.datePlaced}
        expanded={false}
        id={order.id}
      />

      {order.content.map((p) => (
        <CompactOrderItem
          key={p._id}
          packed={p.packed}>
          <b>{p.quantity}</b>
          &nbsp;&nbsp;
          {p.product.name[selectedLang]}
          &nbsp;&nbsp;
          <b>{p.product.weight}g</b>
        </CompactOrderItem>
      ))}
    </_CompactOrder>
  )
}
export default CompactOrder
