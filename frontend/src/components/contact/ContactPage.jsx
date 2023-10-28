import styled from 'styled-components'
import { BigTitle, WrappableRow } from '../styled/base'
import { useSelector } from 'react-redux'
import Address from './Address'
import PeoplePanel from './People'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

const MapContainerContainer = styled.div`
  height: ${(props) => (props.theme.isMobile ? '300px' : '600px')};
  width: 100% !important;
`

const ContactPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <BigTitle>{lang.contact}</BigTitle>
      <PeoplePanel />
      <WrappableRow>
        <MapContainerContainer>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[57.174112, 24.689709]}
            zoom={11}
            scrollWheelZoom={true}>
            <TileLayer
              zIndex={2}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[57.174112, 24.689709]} />
          </MapContainer>
        </MapContainerContainer>
        <Address />
      </WrappableRow>
    </div>
  )
}
export default ContactPage
