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
  FormMultiCol,
} from './styled/base'
import { useDispatch } from 'react-redux'
import { clearCart } from '../reducers/cartReducer'

const InputGroup = styled.div`
  float: left;
  margin: 10px;
  width: 23%;
  input {
    width: 100%;
  }
`
const CompactLabel = styled(Label)`
  width: auto;
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
    <div>
      {selectedAddress && <Button onClick={order}>Proceed to payment</Button>}
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
                {address.city} {address.street} {address.house}{' '}
                {address.apartment}
              </p>
            </AddressChoice>
          </label>
        ))}
      </div>
      <Address>
        <FormMultiCol onSubmit={onSubmit}>
          <InputGroup>
            <CompactLabel>
              City
              <StyledInput
                {...city}
                $isonlightbackground
              />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              Street
              <StyledInput
                {...street}
                $isonlightbackground
              />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              House
              <StyledInput
                {...house}
                $isonlightbackground
              />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              Apt.
              <StyledInput
                {...apartment}
                $isonlightbackground
              />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              Name
              <StyledInput
                {...name}
                $isonlightbackground
              />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              Surname
              <StyledInput
                {...surname}
                $isonlightbackground
              />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              Phone
              <StyledInput
                {...phone}
                $isonlightbackground
              />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <FullWidthButton
              style={{ marginTop: 18 }}
              type="submit">
              Add new address
            </FullWidthButton>
          </InputGroup>
        </FormMultiCol>
      </Address>
    </div>
  )
}

export default Order
