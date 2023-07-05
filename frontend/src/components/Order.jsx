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
} from './styled/base'

const InputGroup = styled.div`
  float: left;
  margin-left: 9px;
  width: 24%;
  input {
    width: 100%;
    margin-right: 0px;
  }
`
const CompactLabel = styled(Label)`
  width: auto;
`
const InputRow = styled.div`
  display: inline-block;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 18px;
  }
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
        <form onSubmit={onSubmit}>
          <InputRow>
            <InputGroup>
              <CompactLabel>Name</CompactLabel> <StyledInput {...name} />
            </InputGroup>
            <InputGroup>
              <CompactLabel>Surname</CompactLabel> <StyledInput {...surname} />
            </InputGroup>
            <InputGroup>
              <CompactLabel>Phone</CompactLabel> <StyledInput {...phone} />
            </InputGroup>
            <InputGroup style={{}}>
              <CompactLabel />
              <FullWidthButton type="submit">Add new address</FullWidthButton>
            </InputGroup>
          </InputRow>
          <InputRow>
            <InputGroup>
              <CompactLabel>City</CompactLabel> <StyledInput {...city} />
            </InputGroup>
            <InputGroup>
              <CompactLabel>Street</CompactLabel> <StyledInput {...street} />
            </InputGroup>
            <InputGroup>
              <CompactLabel>House</CompactLabel> <StyledInput {...house} />
            </InputGroup>
            <InputGroup>
              <CompactLabel>Apt.</CompactLabel> <StyledInput {...apartment} />
            </InputGroup>
          </InputRow>
        </form>
      </Address>
    </div>
  )
}

export default Order
