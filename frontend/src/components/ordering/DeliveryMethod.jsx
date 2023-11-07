import styled, { ThemeContext, css, useTheme } from 'styled-components'
import { SmallerBigTitle, Card, Row } from '../styled/base'
import { useSelector } from 'react-redux'
import Price from '../styled/Price'
import { Calendar3 } from '@styled-icons/bootstrap/Calendar3'
import ReactSelect from 'react-select'
import { useState } from 'react'
import { useEffect } from 'react'
import useDPDservice from '../../services/dpd'
import { useContext } from 'react'
import Addresses from '../user/Adresses'
import AddressWithMap from '../contact/AddressWithMap'

const DeliveryOptions = styled.div`
  display: flex;
  width: 100%;
  gap: ${(props) => props.theme.padding};
  flex-wrap: wrap;
  justify-content: center;
`
const DeliveryOption = styled(Card)`
  padding: ${(props) => props.theme.padding};
  width: calc(96% / 3);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 230px;
  flex: 1 1 calc(96% / 3);
  max-width: 340px;
  ${(props) =>
    props.active &&
    css`
      outline: 2px solid ${props.theme.main};
    `}
  cursor: pointer;
  ${SmallerBigTitle} {
    height: 2.6rem;
  }
`

const DeliveryTime = styled.div`
  color: ${(props) => props.theme.light};
  font-size: 1rem;
  margin-top: 20px;
`
const DeliveryMethod = ({
  deliveryMethod,
  setDeliveryMethod,
  overThreshold,
}) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [pickupPoints, setPickupPoints] = useState([])
  const [allPickupPoints, setAllPickupPoints] = useState([])
  const dpdService = useDPDservice()
  const [selectedPickupPoint, setSelectedPickupPoint] = useState()
  const [address, setAddress] = useState()
  useEffect(() => {
    dpdService.getPickupPoints().then((data) => {
      setPickupPoints(
        data.map((point) => {
          return {
            value: point,
            label: `${point.name.substring(12)}, ${point.address.city}, ${
              point.address.street
            }`.toLowerCase(),
          }
        })
      )
      setAllPickupPoints(data)
    })
  }, [])
  const appTheme = useTheme()
  return (
    <div>
      <DeliveryOptions>
        <DeliveryOption
          onClick={() => setDeliveryMethod({ method: 'bakery', cost: 0 })}
          active={deliveryMethod.method === 'bakery'}>
          <SmallerBigTitle style={{ marginBottom: '20px' }}>
            {lang.pick_up_from_flora}
          </SmallerBigTitle>
          <Price
            price={0}
            isSmall={true}
          />
          <DeliveryTime>
            <Calendar3 size="1.5rem" />
            &nbsp;&nbsp;&nbsp;&nbsp;{lang.next_working_day}
          </DeliveryTime>
        </DeliveryOption>
        <DeliveryOption
          onClick={() => {
            if (deliveryMethod.method !== 'pickupPoint') {
              setDeliveryMethod({
                method: 'pickupPoint',
                address: selectedPickupPoint?.value,
                cost: 399,
              })
            }
          }}
          active={deliveryMethod.method === 'pickupPoint'}>
          <SmallerBigTitle style={{ marginBottom: '20px' }}>
            {lang.pickup_point}
          </SmallerBigTitle>
          <Price
            price={overThreshold ? 0 : 399}
            isSmall={true}
          />
          <DeliveryTime>
            <Calendar3 size="1.5rem" />
            &nbsp;&nbsp;&nbsp;&nbsp;{lang.pickup_point_delivery_time}
          </DeliveryTime>
          <div style={{ width: '100%', marginTop: '20px' }}>
            <ReactSelect
              placeholder={lang.select_point}
              value={selectedPickupPoint}
              onChange={(selected) => {
                console.log(selected)
                setDeliveryMethod({
                  ...deliveryMethod,
                  address: selected.value,
                })
                setSelectedPickupPoint(selected)
              }}
              options={pickupPoints}
              styles={{
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  fontSize: '0.8rem',
                  textTransform: 'capitalize',
                  padding: '5px 3px',
                }),
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  textTransform: 'capitalize',
                }),
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: '2px',
                colors: {
                  ...theme.colors,
                  primary: appTheme.main,
                  primary25: appTheme.lighter,
                },
              })}
            />
          </div>
        </DeliveryOption>
        <DeliveryOption
          onClick={() =>
            setDeliveryMethod({
              method: 'courrier',
              address: address,
              cost: 599,
            })
          }
          active={deliveryMethod.method === 'courrier'}>
          <SmallerBigTitle style={{ marginBottom: '20px' }}>
            {lang.courrier}
          </SmallerBigTitle>
          <Price
            price={overThreshold ? 0 : 599}
            isSmall={true}
          />
          <DeliveryTime>
            <Calendar3 size="1.5rem" />
            &nbsp;&nbsp;&nbsp;&nbsp;{lang.courrier_delivery_time}
          </DeliveryTime>
        </DeliveryOption>
      </DeliveryOptions>
      <div style={{ marginTop: appTheme.padding }}>
        {deliveryMethod.method === 'courrier' && (
          <Addresses
            selectedAddress={address}
            selectAddress={(address) => {
              setDeliveryMethod({ ...deliveryMethod, address: address })
              setAddress(address)
            }}
          />
        )}
        {deliveryMethod.method === 'bakery' && <AddressWithMap />}
        {deliveryMethod.method === 'pickupPoint' && (
          <AddressWithMap
            address={
              selectedPickupPoint
                ? {
                    ...selectedPickupPoint.value.address,
                    name: selectedPickupPoint.value.name,
                  }
                : undefined
            }
            latlon={
              selectedPickupPoint
                ? selectedPickupPoint.value.address.latLong
                : undefined
            }
          />
        )}
      </div>
    </div>
  )
}

export default DeliveryMethod
