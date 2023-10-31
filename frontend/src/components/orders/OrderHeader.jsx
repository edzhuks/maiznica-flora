import { useSelector } from 'react-redux'
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
  id,
}) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  return (
    <_OrderHeader>
      <Status>
        <b>{lang.order_status[status]}</b>&nbsp;&nbsp;&nbsp;#{id}{' '}
        {lastModifiedBy
          ? `${lang.last_modified_by}
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
