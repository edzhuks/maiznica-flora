import {
  Status,
  PlacementDate,
  CloseButton,
  _OrderHeader,
} from './styledComponents'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const OrderHeader = ({
  status,
  lastModified,
  lastModifiedBy,
  datePlaced,
  close,
  expanded,
}) => {
  const statusToText = () => {
    if (status === 'waitingForDelivery') {
      return 'waiting for delivery'
    } else {
      return status
    }
  }

  return (
    <_OrderHeader>
      <Status>
        <b>{statusToText()}</b>{' '}
        {lastModified
          ? `last modified by 
            ${lastModifiedBy.username} 
            ${formatDistanceToNow(new Date(lastModified))} ago`
          : ''}
      </Status>
      <PlacementDate>
        {datePlaced ? formatDistanceToNow(new Date(datePlaced)) : 'long time '}{' '}
        ago
      </PlacementDate>
      {expanded && (
        <CloseButton
          href="#"
          onClick={close}
        />
      )}
    </_OrderHeader>
  )
}

export default OrderHeader
