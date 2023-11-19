import FloraAddress from './Address'
import AddressWithMap from './AddressWithMap'

const BusinessMap = () => {
  return (
    <AddressWithMap latlon={[57.174112, 24.689709]}>
      <FloraAddress />
    </AddressWithMap>
  )
}
export default BusinessMap
