import UserContext from '../../contexts/userContext'
import { useContext, useEffect, useState } from 'react'
import useUserService from '../../services/user'
import useField from '../../hooks/useField'
import styled, { css } from 'styled-components'
import {
  Button,
  CancelButton,
  FullWidthButton,
  Label,
  Row,
  StyledInput,
} from '../styled/base'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import useToast from '../../util/promiseToast'
import { Person } from '@styled-icons/evaicons-solid/Person'
import { Phone } from '@styled-icons/boxicons-solid/Phone'
import { Home } from '@styled-icons/boxicons-solid/Home'

const Radio = styled.label`
  display: block;
  position: relative;
  margin: ${(props) => props.theme.padding} 0px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  row-gap: ${(props) => props.theme.padding};

  p {
    margin: 8px 0px 0px 0px;
    font-size: 1rem;
  }
  svg {
    color: ${(props) => props.theme.light};
    margin-top: -8px;
    margin-left: calc(${(props) => props.theme.padding});
    margin-right: calc(${(props) => props.theme.padding} / 4);
  }
  button {
    margin-right: ${(props) => props.theme.padding};
  }
  /* Hide the browser's default radio button */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 0;
    height: 0;
  }

  /* Create a custom radio button */
  span {
    position: relative;
    display: block;
    height: 25px;
    width: 25px;
    background-color: ${(props) => props.theme.lighter};
    border-radius: 50%;
    transition: 0.2s;
  }

  /* On mouse-over or when checked add a main background color */
  &:hover input ~ span,
  input:checked ~ span {
    background-color: ${(props) => props.theme.main};
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  span:after {
    content: '';
    position: absolute;
    display: none;
    top: 8px;
    left: 8px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${(props) => props.theme.white};
  }

  /* Show the indicator (dot/circle) when checked */
  input:checked ~ span:after {
    display: block;
  }
`
const InputGroup = styled.div`
  float: left;
  padding: calc(${(props) => props.theme.padding} / 2);
  width: 25%;
  min-width: 150px;
  input {
    width: 100%;
  }
`
const CompactLabel = styled(Label)`
  width: auto;
  line-height: 1rem;
  &.required span:after {
    content: ' *';
    color: red;
  }
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-evenly;
  box-shadow: ${(props) => props.theme.shadow};
  background-color: ${(props) => props.theme.card};
  padding: ${(props) => props.theme.padding};
  margin: ${(props) => props.theme.padding} 0;
`

const AddressChoice = styled(Radio)`
  box-shadow: ${(props) => props.theme.shadow};
  background-color: ${(props) => props.theme.card};
  padding: ${(props) => props.theme.padding};
  ${(props) =>
    props.disabled &&
    css`
      span {
        display: none;
      }
    `}
`

const Spacer = styled.div`
  flex: 1 1 auto;
`

const AddressList = styled.div`
  margin-top: -${(props) => props.theme.padding};
`

const AddressForm = ({ submit, values, cancel }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const name = useField('text')
  const surname = useField('text')
  const phone = useField('text')
  const city = useField('text')
  const street = useField('text')
  const house = useField('text')
  const apartment = useField('text')

  useEffect(() => {
    if (values) {
      name.changeValue(values.name)
      surname.changeValue(values.surname)
      phone.changeValue(values.phone)
      city.changeValue(values.city)
      street.changeValue(values.street)
      house.changeValue(values.house)
      apartment.changeValue(values.apartment)
    }
  }, [values])

  const onSubmit = (event) => {
    event.preventDefault()
    if (
      !name.value ||
      !surname.value ||
      !phone.value ||
      !city.value ||
      !street.value
    ) {
      toast.error(lang.toast_all_fields_required)
    } else {
      name.clear()
      surname.clear()
      phone.clear()
      city.clear()
      street.clear()
      house.clear()
      apartment.clear()
      submit({
        name: name.value,
        surname: surname.value,
        phone: phone.value,
        city: city.value,
        street: street.value,
        house: house.value,
        apartment: apartment.value,
        id: values && values.id,
      })
    }
  }
  return (
    <Form onSubmit={onSubmit}>
      <InputGroup>
        <CompactLabel className="required">
          <span>{lang.city}</span>
          <StyledInput
            {...city}
            $isonlightbackground
          />
        </CompactLabel>
      </InputGroup>
      <InputGroup>
        <CompactLabel className="required">
          <span>{lang.street}</span>
          <StyledInput
            {...street}
            $isonlightbackground
          />
        </CompactLabel>
      </InputGroup>
      <InputGroup>
        <CompactLabel>
          <span>{lang.house}</span>
          <StyledInput
            {...house}
            $isonlightbackground
          />
        </CompactLabel>
      </InputGroup>
      <InputGroup>
        <CompactLabel>
          <span>{lang.apt}</span>
          <StyledInput
            {...apartment}
            $isonlightbackground
          />
        </CompactLabel>
      </InputGroup>
      <InputGroup>
        <CompactLabel className="required">
          <span>{lang.name}</span>
          <StyledInput
            {...name}
            $isonlightbackground
          />
        </CompactLabel>
      </InputGroup>
      <InputGroup>
        <CompactLabel className="required">
          <span>{lang.surname}</span>
          <StyledInput
            {...surname}
            $isonlightbackground
          />
        </CompactLabel>
      </InputGroup>
      <InputGroup>
        <CompactLabel className="required">
          <span>{lang.phone}</span>
          <StyledInput
            {...phone}
            $isonlightbackground
          />
        </CompactLabel>
      </InputGroup>
      <InputGroup style={{ display: 'flex' }}>
        <CompactLabel style={{ alignSelf: 'end' }}>
          {!values ? (
            <FullWidthButton type="submit">
              {lang.add_new_address}
            </FullWidthButton>
          ) : (
            <>
              <Button type="submit">{lang.save_short}</Button>{' '}
              <CancelButton onClick={cancel}>{lang.cancel}</CancelButton>
            </>
          )}
        </CompactLabel>
      </InputGroup>
    </Form>
  )
}

const Addresses = ({ selectedAddress, selectAddress }) => {
  const userService = useUserService()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [user, setUser] = useContext(UserContext)
  const { showPromiseToast } = useToast()
  const [editingId, setEditingId] = useState(undefined)
  const onSubmitNewAddress = async (address) => {
    const promise = userService.addAddress(address)
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
  const onSubmitEditedAddress = async (address) => {
    const promise = userService.editAddress(address)
    showPromiseToast({
      promise,
      successMessage: lang.toast_address_edited,
    })
    promise
      .then((response) => {
        const newAddress = response.data
        const newUser = {
          ...user,
          addresses: user.addresses.map((a) =>
            a.id === newAddress.id ? newAddress : a
          ),
        }
        window.localStorage.setItem(
          'maiznicafloraUser',
          JSON.stringify(newUser)
        )
        setUser(newUser)
        selectAddress(newAddress)
        setEditingId(undefined)
      })
      .catch((error) => console.log(error.response.data.error))
  }
  const onDeleteAddress = async (id) => {
    if (window.confirm(lang.confirm_delete_address)) {
      const promise = userService.deleteAddress(id)
      showPromiseToast({
        promise,
        successMessage: lang.toast_address_deleted,
      })
      promise
        .then((response) => {
          const deletedAddress = response.data
          const newUser = {
            ...user,
            addresses: user.addresses.filter((a) => a.id !== deletedAddress.id),
          }
          window.localStorage.setItem(
            'maiznicafloraUser',
            JSON.stringify(newUser)
          )
          setUser(newUser)
          setEditingId(undefined)
        })
        .catch((error) => console.log(error.response.data.error))
    }
  }
  return (
    <AddressList>
      <div>
        {user?.addresses.map((address) => (
          <div>
            {editingId !== address.id ? (
              <AddressChoice
                key={address.id}
                disabled={!selectAddress}>
                <input
                  type="radio"
                  value={address}
                  checked={selectedAddress === address}
                  onChange={() => {
                    if (selectAddress) {
                      selectAddress(address)
                    }
                  }}
                />
                <span />
                <p>
                  <Person size="1.6rem" />
                  {address.name} {address.surname}
                </p>
                <p>
                  <Phone size="1.6rem" />
                  {address.phone}
                </p>
                <p>
                  <Home size="1.6rem" />
                  {address.city}, {address.street} {address.house}
                  {address.apartment && address.house && '-'}
                  {address.apartment}
                </p>
                <Row style={{ flex: 1 }}>
                  <Spacer />
                  <Button
                    onClick={() => {
                      setEditingId(address.id)
                    }}>
                    {lang.edit}
                  </Button>
                  <CancelButton onClick={() => onDeleteAddress(address.id)}>
                    {lang.delete}
                  </CancelButton>
                </Row>
              </AddressChoice>
            ) : (
              <AddressForm
                submit={onSubmitEditedAddress}
                values={address}
                cancel={() => setEditingId(undefined)}
              />
            )}
          </div>
        ))}
      </div>
      <AddressForm submit={onSubmitNewAddress} />
    </AddressList>
  )
}

export default Addresses
