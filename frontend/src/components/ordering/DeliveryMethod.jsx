import styled, { css, useTheme } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Price from '../basic/Price'
import { Calendar3 } from '@styled-icons/bootstrap/Calendar3'
import ReactSelect from 'react-select'
import { useReducer, useState } from 'react'
import { useEffect } from 'react'
import useDPDservice from '../../services/dpd'
import Addresses from '../user/Adresses'
import AddressWithMap from '../contact/AddressWithMap'
import {
  getDeliveryCost,
  setDeliveryMethod,
  useCartServiceDispatch,
} from '../../reducers/cartReducer'
import Input from '../basic/Input'
import useField from '../../hooks/useField'
import BusinessMap from '../contact/BusinessMap'

const DeliveryOption = ({ deliveryMethod, children, map }) => {
  const dispatch = useDispatch()
  const selected = useSelector(
    (state) => state.cart.deliveryMethod === deliveryMethod
  )
  const { changeDeliveryMethod } = useCartServiceDispatch()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <>
      <div
        className={`card transition p-m row evenly stretch pointer ${
          selected ? 'outlined ' : ''
        } `}
        onClick={() => {
          if (!selected) {
            dispatch(changeDeliveryMethod(deliveryMethod))
          }
        }}>
        <div className="column align-cross-center center">
          <h3 className="card-heading">{lang[`delivery_${deliveryMethod}`]}</h3>
          <Price
            className="m-v"
            price={getDeliveryCost(deliveryMethod)}
            isSmall={true}
          />
          <p className="hint-text">
            <Calendar3 className="icon-m m-r" />
            {lang[`delivery_time_${deliveryMethod}`]}
          </p>
        </div>
        {selected && (
          <div
            className="column"
            style={{ flexGrow: 0 }}>
            {children}
          </div>
        )}
      </div>
      {selected && map && [map]}
    </>
  )
}

const BakeryPickup = ({}) => {
  const dispatch = useDispatch()
  const { changeDeliveryPhone } = useCartServiceDispatch()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const deliveryPhoneInput = useField('phone')

  const deliveryPhone = useSelector((state) => state.cart.deliveryPhone)
  useEffect(() => {
    if (deliveryPhone) {
      deliveryPhoneInput.changeValue(deliveryPhone)
    }
  }, [deliveryPhone])
  return (
    <DeliveryOption
      deliveryMethod="bakery"
      map={<BusinessMap key="a" />}>
      <p
        className="card-text"
        style={{ maxWidth: '300px' }}>
        {lang.phone_use_info}
      </p>
      <Input
        {...deliveryPhoneInput}
        label={lang.phone}
        onBlur={() => dispatch(changeDeliveryPhone(deliveryPhoneInput.value))}
      />
    </DeliveryOption>
  )
}
const PickupPoint = ({}) => {
  const dispatch = useDispatch()
  const { changePickupPointData } = useCartServiceDispatch()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [allPickupPoints, setAllPickupPoints] = useState([])
  const dpdService = useDPDservice()
  const selectedPickupPoint = useField('select')
  const name = useField('text')
  const surname = useField('text')
  const phone = useField('phone')
  const pickupPointData = useSelector((state) => state.cart.pickupPointData)

  useEffect(() => {
    dpdService.getPickupPoints().then((data) => {
      setAllPickupPoints(
        data.map((point) => {
          return {
            value: point,
            label: `${point.name.substring(12)}, ${point.address.city}, ${
              point.address.street
            }`,
          }
        })
      )
    })
  }, [])
  useEffect(() => {
    if (pickupPointData) {
      selectedPickupPoint.changeValue(
        allPickupPoints.find((p) => p.value.id === pickupPointData.id)
      )
      name.changeValue(pickupPointData.name)
      surname.changeValue(pickupPointData.surname)
      phone.changeValue(pickupPointData.phone)
    }
  }, [pickupPointData, allPickupPoints])

  return (
    <DeliveryOption
      deliveryMethod="pickupPoint"
      map={
        <AddressWithMap
          key="b"
          latlon={
            pickupPointData && pickupPointData.id && allPickupPoints.length > 0
              ? allPickupPoints.find((p) => p.value.id === pickupPointData.id)
                  ?.value.address.latLong
              : undefined
          }
        />
      }>
      <Input
        {...selectedPickupPoint}
        label={lang.select_point}
        options={allPickupPoints}
        isMulti={false}
        width={300}
        required={true}
        onChange={(selected) => {
          dispatch(
            changePickupPointData({ ...pickupPointData, id: selected.value.id })
          )
        }}
      />
      <Input
        {...name}
        label={lang.name}
        required
        onBlur={() =>
          dispatch(
            changePickupPointData({ ...pickupPointData, name: name.value })
          )
        }
      />
      <Input
        {...surname}
        label={lang.surname}
        required
        onBlur={() =>
          dispatch(
            changePickupPointData({
              ...pickupPointData,
              surname: surname.value,
            })
          )
        }
      />
      <Input
        {...phone}
        label={lang.phone}
        required
        onBlur={() =>
          dispatch(
            changePickupPointData({ ...pickupPointData, phone: phone.value })
          )
        }
      />
    </DeliveryOption>
  )
}
const Courrier = ({}) => {
  const dispatch = useDispatch()
  const { changeCourrierAddress } = useCartServiceDispatch()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const courrierAddress = useSelector((state) => state.cart.courrierAddress)

  return (
    <DeliveryOption deliveryMethod="courrier">
      <Addresses
        selectedAddress={courrierAddress}
        style={{ maxWidth: '31rem' }}
        selectAddress={(address) => {
          if (address) {
            dispatch(changeCourrierAddress(address.id))
          } else {
            dispatch(changeCourrierAddress('unset'))
          }
        }}
      />
    </DeliveryOption>
  )
}
const DeliveryMethod = () => {
  return (
    <div>
      <div
        className="column  "
        style={{ flexWrap: 'nowrap' }}>
        <BakeryPickup />
        <PickupPoint />
        <Courrier />
      </div>
    </div>
  )
}

export default DeliveryMethod
