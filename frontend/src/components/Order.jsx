import ProductListItem from './productList/ProductListItem'
import UserContext from '../contexts/userContext'
import { useContext, useEffect, useState } from 'react'
import userService from '../services/user'
import useField from '../hooks/useField'
import Input from './basic/Input'
import orderService from '../services/order'

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
      {selectedAddress && <button onClick={order}>Place order</button>}
      <div>
        {user?.addresses.map((address) => (
          <div key={address.id}>
            <label>
              <input
                type="radio"
                value={address}
                checked={selectedAddress === address}
                onChange={() => selectAddress(address)}
              />
              <p>
                {address.name} {address.surname} {address.phone}
              </p>
              <p>
                {address.city} {address.street} {address.house}{' '}
                {address.apartment}
              </p>
            </label>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            name: <Input {...name} />
          </div>
          <div>
            surname: <Input {...surname} />
          </div>
          <div>
            phone: <Input {...phone} />
          </div>
          <div>
            city: <Input {...city} />
          </div>
          <div>
            street: <Input {...street} />
          </div>
          <div>
            house: <Input {...house} />
          </div>
          <div>
            apartment: <Input {...apartment} />
          </div>
          <button type="submit">Add new address</button>
        </form>
      </div>
    </div>
  )
}

export default Order
