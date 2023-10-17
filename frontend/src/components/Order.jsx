import UserContext from '../contexts/userContext'
import { useContext, useState } from 'react'
import userService from '../services/user'
import useField from '../hooks/useField'
import orderService from '../services/order'
import styled from 'styled-components'
import {
  Button,
  FullWidthButton,
  Label,
  StyledInput,
  Radio,
} from './styled/base'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../reducers/cartReducer'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker, Popup, WMSTileLayer } from 'react-leaflet'

const InputGroup = styled.div`
  float: left;
  margin: 10px;
  width: 23%;
  min-width: 230px;
  input {
    width: 100%;
  }
`
const CompactLabel = styled(Label)`
  width: auto;
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-around;
`

const AddressChoice = styled(Radio)`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  background-color: #fbfbfb;
  padding: 18px;
`
const Address = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  background-color: #fbfbfb;
  padding: 18px;
`

const Order = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const dispatch = useDispatch()
  const [user, setUser] = useContext(UserContext)

  const [selectedAddress, selectAddress] = useState()

  const name = useField('text')
  const surname = useField('text')
  const phone = useField('text')
  const city = useField('text')
  const street = useField('text')
  const house = useField('text')
  const apartment = useField('text')

  const onSubmit = async (event) => {
    event.preventDefault()
    const newAddress = await userService.addAddress({
      name: name.value,
      surname: surname.value,
      phone: phone.value,
      city: city.value,
      street: street.value,
      house: house.value,
      apartment: apartment.value,
    })
    console.log(newAddress)
    const newUser = { ...user, addresses: user.addresses.concat(newAddress) }
    window.localStorage.setItem('maiznicafloraUser', JSON.stringify(newUser))
    setUser(newUser)
    selectAddress(newAddress)
    console.log(user)
  }

  const order = async () => {
    if (selectedAddress) {
      orderService.placeOrder(selectedAddress)
      dispatch(clearCart())
    } else {
      console.error('No address selected')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}>
      {selectedAddress && (
        <Button
          style={{ alignSelf: 'end' }}
          onClick={order}>
          {lang.proceed_to_payment}
        </Button>
      )}
      <div>
        {user?.addresses.map((address) => (
          <label>
            <AddressChoice key={address.id}>
              <input
                type="radio"
                value={address}
                checked={selectedAddress === address}
                onChange={() => selectAddress(address)}
              />
              <span></span>
              <p>
                {address.name} {address.surname} {address.phone}
              </p>
              <p>
                {address.city}, {address.street} {address.house}
                {'-'}
                {address.apartment}
              </p>
            </AddressChoice>
          </label>
        ))}
      </div>
      <Address>
        <Form onSubmit={onSubmit}>
          <InputGroup>
            <CompactLabel>
              {lang.city}
              <StyledInput
                {...city}
                $isonlightbackground
              />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              {lang.street}
              <StyledInput
                {...street}
                $isonlightbackground
              />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              {lang.house}
              <StyledInput
                {...house}
                $isonlightbackground
              />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              {lang.apt}
              <StyledInput
                {...apartment}
                $isonlightbackground
              />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              {lang.name}
              <StyledInput
                {...name}
                $isonlightbackground
              />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              {lang.surname}
              <StyledInput
                {...surname}
                $isonlightbackground
              />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              {lang.phone}
              <StyledInput
                {...phone}
                $isonlightbackground
              />
            </CompactLabel>
          </InputGroup>
          <InputGroup style={{ display: 'flex' }}>
            <CompactLabel style={{ alignSelf: 'end' }}>
              <FullWidthButton type="submit">
                {lang.add_new_address}
              </FullWidthButton>
            </CompactLabel>
          </InputGroup>
        </Form>
      </Address>
      <MapContainer
        style={{ height: '400px' }}
        center={[57.174112, 24.689709]}
        zoom={13}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <TileLayer
          // version="1.1.1"
          // format="image/png"
          url="https://{s}.kartes.lv/BMCr9bvLi/wgs/15/{z}/{x}/{y}.png"
          subdomains={['wms', 'wms2', 'wms3', 'wms1', 'wms4']}
        /> */}
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Order
