import { useEffect, useState } from 'react'
import useOrderService from '../../services/order'
import OrderList from './OrderList'
import useField from '../../hooks/useField'
import Input from '../basic/Input'
import { useSelector } from 'react-redux'
import { SearchOutline } from '@styled-icons/evaicons-outline/SearchOutline'
import { useSearchParams } from 'react-router-dom'
import Collapsible from '../basic/Collapsible'

const OrderManagementPage = () => {
  const orderService = useOrderService()
  const [orders, setOrders] = useState([])
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  let [searchParams, setSearchParams] = useSearchParams()
  const filters = [
    'invoiced',
    'placed',
    'ready_for_pickup',
    'ready_for_delivery',
    'waiting_for_courrier',
    'delivering',
    'completed',
    'refunded',
  ]
  const allFilters = useField('checkbox')
  const search = useField('text')
  const getOrders = () => {
    orderService
      .getAll({
        filters: filters.reduce((a, f) => {
          return { ...a, [f]: searchParams.get(f) }
        }, {}),
        search: searchParams.get('search'),
      })
      .then((o) => {
        o.sort((j, i) => new Date(i.datePlaced) - new Date(j.datePlaced))
        setOrders(o)
      })
  }
  useEffect(() => {
    if (searchParams.size === 0) {
      for (let filter of filters) {
        if (filter === 'completed' || filter === 'refunded') {
          searchParams.set(filter, false)
        } else {
          searchParams.set(filter, true)
        }
      }
      setSearchParams(searchParams)
    }
  }, [])

  useEffect(() => {
    getOrders()
  }, [searchParams])

  return (
    <div>
      <div className="card p p-t-0 m-d row align-cross-end">
        <Collapsible
          title={lang.filter}
          className="m-t-m">
          <Input
            {...allFilters}
            onChange={(value) => {
              allFilters.onChange(value)
              for (let filter of filters) {
                searchParams.set(filter, value)
              }
              setSearchParams(searchParams)
            }}
            label={lang.all}
          />
          {filters.map((f) => (
            <Input
              type="checkbox"
              label={lang.order_status[f]}
              value={searchParams.get(f) === 'true'}
              onChange={(value) => {
                searchParams.set(f, !(searchParams.get(f) === 'true'))
                setSearchParams(searchParams)
              }}
            />
          ))}
        </Collapsible>
        <div className="spacer" />
        <div className="row no-gap align-cross-end">
          <Input
            {...search}
            label={lang.search}
            width={200}
          />
          <button
            className="btn "
            onClick={() => {
              searchParams.set('search', search.value)
              setSearchParams(searchParams)
            }}>
            <SearchOutline className="icon-m" />
          </button>
        </div>
      </div>
      <OrderList orders={orders} />
    </div>
  )
}

export default OrderManagementPage
