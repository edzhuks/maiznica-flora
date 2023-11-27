import UserContext from '../../contexts/userContext'
import { useContext, useEffect, useState } from 'react'
import useUserService from '../../services/user'
import useField from '../../hooks/useField'
import styled, { css } from 'styled-components'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import useToast from '../../util/promiseToast'
import { Person } from '@styled-icons/evaicons-solid/Person'
import { Phone } from '@styled-icons/boxicons-solid/Phone'
import { Home } from '@styled-icons/boxicons-solid/Home'
import Input from '../basic/Input'
import { Edit } from '@styled-icons/evaicons-solid/Edit'
import { Trash } from '@styled-icons/boxicons-regular/Trash'

const Radio = styled.label`
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* Hide the browser's default radio button */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 0;
    height: 0;
  }

  /* Create a custom radio button */
  .radio {
    position: relative;
    display: block;
    height: 25px;
    width: 25px;
    background-color: ${(props) => props.theme.lighter};
    border-radius: 50%;
    transition: 0.2s;
  }

  /* On mouse-over or when checked add a main background color */
  &:hover input ~ .radio,
  input:checked ~ .radio {
    background-color: ${(props) => props.theme.main};
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .radio:after {
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
  input:checked ~ .radio:after {
    display: block;
  }
`
const AddressChoice = styled(Radio)`
  ${(props) =>
    props.disabled &&
    css`
      .radio {
        display: none;
      }
    `}
`

const AddressForm = ({ submit, values, cancel }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const name = useField('text')
  const surname = useField('text')
  const phone = useField('phone')
  const city = useField('text')
  const street = useField('text')
  const house = useField('text')
  const apartment = useField('text')
  const postIndex = useField('text')

  useEffect(() => {
    if (values) {
      name.changeValue(values.name)
      surname.changeValue(values.surname)
      phone.changeValue(values.phone)
      city.changeValue(values.city)
      street.changeValue(values.street)
      house.changeValue(values.house)
      apartment.changeValue(values.apartment)
      postIndex.changeValue(values.postIndex)
    }
  }, [values])

  const onSubmit = (event) => {
    event.preventDefault()
    if (
      !name.value ||
      !surname.value ||
      !phone.value ||
      !city.value ||
      !street.value ||
      !postIndex.value
    ) {
      toast.error(lang.toast_all_fields_required)
    } else {
      submit({
        name: name.value,
        surname: surname.value,
        phone: phone.value,
        city: city.value,
        street: street.value,
        house: house.value,
        apartment: apartment.value,
        postIndex: postIndex.value,
        id: values && values.id,
      })
      name.clear()
      surname.clear()
      phone.clear()
      city.clear()
      street.clear()
      house.clear()
      apartment.clear()
      postIndex.clear()
    }
  }
  return (
    <form
      className="column align-cross-end no-gap"
      onSubmit={onSubmit}>
      <Input
        label={lang.city}
        required
        width="350px"
        {...city}
      />
      <div
        className="row"
        style={{ width: '350px' }}>
        <div style={{ flex: '1 1 150px' }}>
          <Input
            label={lang.street}
            required
            {...street}
            width="unset"
          />
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <Input
            label={lang.post_index}
            required
            {...postIndex}
            width="unset"
          />
        </div>
      </div>
      <div
        className="row"
        style={{ width: '350px' }}>
        <div style={{ flex: '1 1 150px' }}>
          <Input
            label={lang.house}
            width="unset"
            {...house}
          />
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <Input
            label={lang.apt}
            width="unset"
            {...apartment}
          />
        </div>
      </div>
      <div
        className="row"
        style={{ width: '350px' }}>
        <div style={{ flex: '1 1 150px' }}>
          <Input
            required
            label={lang.name}
            width="unset"
            {...name}
          />
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <Input
            required
            label={lang.surname}
            width="unset"
            {...surname}
          />
        </div>
      </div>
      <Input
        required
        width="350px"
        label={lang.phone}
        {...phone}
      />
      {!values ? (
        <button
          className="btn m-t"
          type="submit">
          {lang.add_new_address}
        </button>
      ) : (
        <div className="row m-t">
          <button
            className="btn"
            type="submit">
            {lang.save_short}
          </button>
          <button
            className="btn cancel"
            onClick={cancel}>
            {lang.cancel}
          </button>
        </div>
      )}
    </form>
  )
}

const Addresses = ({
  selectedAddress,
  selectAddress,
  noSelection,
  className,
  style,
}) => {
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
        if (selectAddress) {
          selectAddress(newAddress)
        }
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
        if (selectAddress) {
          selectAddress(newAddress)
        }
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
          if (selectAddress) {
            selectAddress(undefined)
          }
        })
        .catch((error) => console.log(error))
    }
  }
  return (
    <div
      className={`column  no-gap ${className ? className : ''}`}
      style={style}>
      <div>
        {user?.addresses.map((address) => (
          <div key={address.id}>
            {editingId !== address.id ? (
              <>
                <AddressChoice
                  className="row align-cross-center no-gap m-d"
                  disabled={noSelection}>
                  <div className="column">
                    <input
                      type="radio"
                      value={address}
                      checked={selectedAddress === address.id}
                      onChange={() => {
                        if (selectAddress) {
                          selectAddress(address)
                        }
                      }}
                    />
                    <span className="radio m-r" />
                  </div>
                  <div
                    className="column"
                    style={{ flexGrow: '1000' }}>
                    <p className="card-text m-r">
                      <Person className="icon-m m-r-s m-d-s" />
                      {address.name} {address.surname}
                    </p>
                    <p className="card-text m-r">
                      <Phone className="icon-m m-r-s m-d-s" />
                      {address.phone}
                    </p>
                    <p className="card-text m-r">
                      <Home className="icon-m m-r-s m-d-s" />
                      {address.city}, {address.street} {address.house}
                      {address.apartment && address.house && '-'}
                      {address.apartment}, {address.postIndex}
                    </p>
                  </div>
                  <div
                    className="column"
                    style={{ flex: 1 }}>
                    <button
                      className="btn"
                      onClick={() => {
                        setEditingId(address.id)
                      }}>
                      <Edit className="icon-m" />
                    </button>
                    <button
                      className="btn cancel"
                      onClick={() => onDeleteAddress(address.id)}>
                      <Trash className="icon-m" />
                    </button>
                  </div>
                </AddressChoice>
                <div className="card-divider m-d" />
              </>
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
    </div>
  )
}

export default Addresses
