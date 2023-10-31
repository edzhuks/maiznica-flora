import OrderHeader from './OrderHeader'
import { ActionTile, Question, _ExpandedOrder } from './styledComponents'
import { RowSpaceEvenly, Button, CancelButton } from '../styled/base'
import ProductTile from './ProductTile'
import { useSelector } from 'react-redux'

const OrderAction = ({
  question,
  action1text,
  action2text,
  action1callback,
  action2callback,
}) => {
  return (
    <ActionTile>
      <Question>{question}</Question>
      <RowSpaceEvenly>
        <Button onClick={action1callback}>{action1text}</Button>
        {action2text && (
          <CancelButton onClick={action2callback}>{action2text}</CancelButton>
        )}
      </RowSpaceEvenly>
    </ActionTile>
  )
}

const ExpandedOrder = ({ close, order, closing, updateOrder, fixed }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const allPacked = () => {
    return order.content.every((o) => o.packed)
  }

  const copyOrder = () => {
    let newOrder = JSON.parse(JSON.stringify(order))
    newOrder.status = {}
    newOrder.content = newOrder.content.map((i) => ({
      ...i,
      product: i.product.id,
    }))
    return newOrder
  }

  const changeItemPacked = (id, isItPacked) => {
    let newOrder = copyOrder()
    newOrder.content.find((i) => i._id === id).packed = isItPacked
    if (newOrder.content.find((i) => i.packed === true)) {
      newOrder.status.status = 'packing'
    } else {
      newOrder.status.status = 'accepted'
    }
    updateOrder(newOrder)
  }

  const acceptOrder = () => {
    let newOrder = copyOrder()
    newOrder.status.status = 'accepted'
    updateOrder(newOrder)
  }

  const refuseOrder = () => {
    let newOrder = copyOrder()
    newOrder.status.status = 'refused'
    updateOrder(newOrder)
  }

  const makeOrderReadyForDelivery = () => {
    let newOrder = copyOrder()
    newOrder.status.status = 'waitingForDelivery'
    updateOrder(newOrder)
  }

  const startDeliveringOrder = () => {
    let newOrder = copyOrder()
    newOrder.status.status = 'delivering'
    updateOrder(newOrder)
  }

  const completeDelivery = () => {
    let newOrder = copyOrder()
    newOrder.status.status = 'completed'
    updateOrder(newOrder)
  }

  return (
    <_ExpandedOrder
      status={order.status?.status}
      closing={closing}>
      <OrderHeader
        status={order.status?.status}
        close={close}
        lastModified={order.status?.lastModified}
        lastModifiedBy={order.status?.lastModifiedBy}
        datePlaced={order.datePlaced}
        id={order.id}
        expanded={true}
      />
      {order.content.map((i) => (
        <ProductTile
          key={i._id}
          item={i}
          disabled={
            order.status?.status !== 'accepted' &&
            order.status?.status !== 'packing'
          }
          changeItemPacked={changeItemPacked}
        />
      ))}
      {!fixed && (
        <>
          {order.status?.status === 'placed' && (
            <OrderAction
              question={lang.accept_order}
              action1text={lang.accept}
              action2text={lang.refuse}
              action1callback={acceptOrder}
              action2callback={refuseOrder}
            />
          )}
          {order.status?.status === 'packing' && allPacked() && (
            <OrderAction
              question={lang.ready_for_delivery}
              action1text={lang.ready}
              action1callback={makeOrderReadyForDelivery}
            />
          )}
          {order.status?.status === 'waitingForDelivery' && (
            <OrderAction
              question={lang.out_for_delivery}
              action1text={lang.deliver}
              action1callback={startDeliveringOrder}
            />
          )}
          {order.status?.status === 'delivering' && (
            <OrderAction
              question={lang.delivery_completed}
              action1text={lang.completed}
              action1callback={completeDelivery}
            />
          )}
        </>
      )}
    </_ExpandedOrder>
  )
}

export default ExpandedOrder
