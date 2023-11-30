import styled from 'styled-components'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { useEffect } from 'react'

const Recenter = ({ latlon }) => {
  const map = useMap()
  useEffect(() => {
    map.setView(latlon)
  }, [latlon])
}

const AddressWithMap = ({ latlon, ...props }) => {
  return (
    <>
      {latlon && (
        <div className="row no-row-gap">
          <div
            className="card"
            style={{ flex: '10 0 60%' }}>
            <div className="map-container">
              <MapContainer
                style={{ height: '100%', width: '100%' }}
                center={latlon}
                zoom={11}
                scrollWheelZoom={true}>
                <TileLayer
                  zIndex={2}
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={latlon} />
                {latlon && <Recenter latlon={latlon} />}
              </MapContainer>
            </div>
          </div>
          {props.children && (
            <div
              className="card p"
              style={{ flex: '1 1 320px' }}>
              {props.children}
            </div>
          )}
        </div>
      )}
    </>
  )
}
export default AddressWithMap
