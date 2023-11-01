import styled from 'styled-components'
import Address from './Address'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { Card, Padding, WrappableRow } from '../styled/base'
import { useEffect } from 'react'
const MapContainerContainer = styled.div`
  height: ${(props) => (props.theme.isMobile ? '300px' : '400px')};
  width: 100% !important;
`
const Recenter = ({ latlon }) => {
  const map = useMap()
  useEffect(() => {
    map.setView(latlon)
  }, [latlon])
}

const AddressWithMap = ({ address, latlon }) => {
  return (
    <WrappableRow>
      <Card style={{ width: '100%' }}>
        <MapContainerContainer>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={latlon ? latlon : [57.174112, 24.689709]}
            zoom={11}
            scrollWheelZoom={true}>
            <TileLayer
              zIndex={2}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={latlon ? latlon : [57.174112, 24.689709]} />
            {latlon && <Recenter latlon={latlon} />}
          </MapContainer>
        </MapContainerContainer>
      </Card>
      <Card style={{ minWidth: '200px' }}>
        <Padding>
          <Address address={address} />
        </Padding>
      </Card>
    </WrappableRow>
  )
}
export default AddressWithMap
