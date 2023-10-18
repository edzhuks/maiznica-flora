import UserContext from '../contexts/userContext'
import { useContext, useState } from 'react'
import useUserService from '../services/user'
import useField from '../hooks/useField'
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
import { toast } from 'react-toastify'
import useToast from '../util/promiseToast'
import useOrderService from '../services/order'

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
  const userService = useUserService()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const dispatch = useDispatch()
  const [user, setUser] = useContext(UserContext)
  const orderService = useOrderService()
  const { showPromiseToast } = useToast()
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
    if (
      !name.value ||
      !surname.value ||
      !phone.value ||
      !city.value ||
      !street.value ||
      !house.value ||
      !apartment.value
    ) {
      toast.error(lang.toast_all_fields_required)
    } else {
      const promise = userService.addAddress({
        name: name.value,
        surname: surname.value,
        phone: phone.value,
        city: city.value,
        street: street.value,
        house: house.value,
        apartment: apartment.value,
      })
      showPromiseToast({
        promise,
        successMessage: lang.toast_address_added,
      })
      promise
        .then((response) => {
          const newAddress = response.data
          const newUser = {
            ...user,
            addresses: user.addresses.concat(newAddress),
          }
          window.localStorage.setItem(
            'maiznicafloraUser',
            JSON.stringify(newUser)
          )
          setUser(newUser)
          selectAddress(newAddress)
        })
        .catch((error) => console.log(error.response.data.error))
    }
  }

  const order = async () => {
    if (selectedAddress) {
      console.log(orderService)
      const promise = orderService.placeOrder(selectedAddress)
      showPromiseToast({
        promise,
        successMessage: lang.toast_order_successful,
      })
      promise.then(dispatch(clearCart()))
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
    </div>
  )
}

export default Order
