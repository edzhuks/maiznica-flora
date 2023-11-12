import UserContext from '../../contexts/userContext'
import { useContext, useEffect, useState } from 'react'
import useUserService from '../../services/user'
import useField from '../../hooks/useField'
import styled from 'styled-components'
import {
  Button,
  CancelButton,
  FullWidthButton,
  FullWidthCancelButton,
  Label,
  Row,
  Input,
} from '../styled/base'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../reducers/cartReducer'
import { toast } from 'react-toastify'
import useToast from '../../util/promiseToast'
import useOrderService from '../../services/order'
import { Person } from '@styled-icons/evaicons-solid/Person'
import { Phone } from '@styled-icons/boxicons-solid/Phone'
import { Home } from '@styled-icons/boxicons-solid/Home'
import Addresses from '../user/Adresses'

const ChooseAddress = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [selectedAddress, selectAddress] = useState()
  const dispatch = useDispatch()
  const orderService = useOrderService()
  const { showPromiseToast } = useToast()

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
          style={{ alignSelf: 'end', marginBottom: '10px' }}
          onClick={order}>
          {lang.proceed_to_payment}
        </Button>
      )}
      <Addresses
        selectAddress={selectAddress}
        selectedAddress={selectedAddress}
      />
    </div>
  )
}

export default ChooseAddress
