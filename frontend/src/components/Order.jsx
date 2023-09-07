import ProductListItem from './productList/ProductListItem'
import UserContext from '../contexts/userContext'
import { useContext, useEffect, useState } from 'react'
import userService from '../services/user'
import useField from '../hooks/useField'
import Input from './basic/Input'
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
  background-color: #fbfbfb;
  padding: 18px;
`
const Address = styled.div`
  background-color: #fbfbfb;
  padding: 18px;
`

const Order = () => {
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

  const order = () => {
    if (selectedAddress) {
      orderService.placeOrder(selectedAddress)
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
              <StyledInput {...city} />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              Street
              <StyledInput {...street} />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              House
              <StyledInput {...house} />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              Apt.
              <StyledInput {...apartment} />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              Name
              <StyledInput {...name} />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              Surname
              <StyledInput {...surname} />
            </CompactLabel>
          </InputGroup>
          <InputGroup>
            <CompactLabel>
              Phone
              <StyledInput {...phone} />
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
