import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useOrderService from '../../services/order'
import { useEffect, useState } from 'react'
import {
  calculateWeight,
  centsToEuro,
  countProducts,
  gramsToKilos,
  gramsToKilosSimple,
  useDateTimeFormat,
} from '../../util/convert'

import { Person } from '@styled-icons/evaicons-solid/Person'
import { Phone } from '@styled-icons/boxicons-solid/Phone'
import { Home } from '@styled-icons/boxicons-solid/Home'
import { Mail } from '@styled-icons/entypo/Mail'
import BaseModal from '../basic/BaseModal'
import useField from '../../hooks/useField'
import Input from '../basic/Input'
import { Warning } from '@styled-icons/ionicons-solid/Warning'

const AddressInfo = ({ person, email, phone, address }) => {
  return (
    <div>
      <p className="card-text m-r">
        <Person className="icon-m m-r-s m-d-s" />
        {person}
      </p>
      <p className="card-text m-r">
        <Mail className="icon-m m-r-s m-d-s" />
        {email}
      </p>
      <p className="card-text m-r">
        <Phone className="icon-m m-r-s m-d-s" />
        {phone}
      </p>
      <p className="card-text m-r">
        <Home className="icon-m m-r-s m-d-s" />
        {address}
      </p>
    </div>
  )
}
const ShipmentModal = ({ visible, close, order, submit }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const name = useField('text')
  const email = useField('email')
  const phone = useField('phone')
  const street = useField('text')
  const streetNo = useField('text')
  const flatNo = useField('text')
  const city = useField('text')
  const postalCode = useField('text')
  const contactInfo = useField('text')
  const totalWeight = calculateWeight(order.content)
  const [parcels, setParcels] = useState([])
  const orderService = useOrderService()
  useEffect(() => {
    if (order.deliveryMethod === 'courrier') {
      if (
        order.courrierAddress.name.length +
          order.courrierAddress.surname.length <=
        34
      ) {
        name.changeValue(
          `${order.courrierAddress.name} ${order.courrierAddress.surname}`
        )
      }
      if (order.courrierAddress.phone.length <= 30) {
        phone.changeValue(order.courrierAddress.phone)
      }
      if (order.courrierAddress.street.length <= 35) {
        street.changeValue(order.courrierAddress.street)
      }
      if (order.courrierAddress.house.length <= 8) {
        streetNo.changeValue(order.courrierAddress.house)
      }
      if (order.courrierAddress.apartment.length <= 8) {
        flatNo.changeValue(order.courrierAddress.apartment)
      }
      if (order.courrierAddress.city.length <= 35) {
        city.changeValue(order.courrierAddress.city)
      }
      if (order.courrierAddress.postIndex.replace(/\D/g, '') <= 7) {
        postalCode.changeValue(
          order.courrierAddress.postIndex.replace(/\D/g, '')
        )
      }
    } else if (order.deliveryMethod === 'pickupPoint') {
      if (
        order.pickupPointData.name.length +
          order.pickupPointData.surname.length <=
        34
      ) {
        name.changeValue(
          `${order.pickupPointData.name} ${order.pickupPointData.surname}`
        )
      }
      if (order.pickupPointData.phone.length <= 30) {
        phone.changeValue(order.pickupPointData.phone)
      }
    }
    email.changeValue(order.user.email)
    setParcels([
      {
        weight:
          totalWeight > 31500 ? undefined : gramsToKilosSimple(totalWeight),
      },
    ])
  }, [order, visible])

  const onSubmit = () => {
    orderService
      .makeReadyForDelivery(order.id, {
        name: name.value,
        email: email.value,
        phone: phone.value,
        street: street.value,
        streetNo: streetNo.value,
        flatNo: flatNo.value,
        city: city.value,
        postalCode: postalCode.value,
        contactInfo: contactInfo.value,
        parcels,
      })
      .then((response) => submit(response))
  }

  const onClose = () => {
    name.clear()
    email.clear()
    phone.clear()
    street.clear()
    streetNo.clear()
    flatNo.clear()
    city.clear()
    postalCode.clear()
    contactInfo.clear()
    setParcels([])
    close()
  }

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title={lang.create_shipment}
      onSubmit={onSubmit}>
      <div className="row">
        <div className="p">
          {order.deliveryMethod === 'pickupPoint' && (
            <AddressInfo
              person={`${order.pickupPointData.name} ${order.pickupPointData.surname}`}
              email={order.user.email}
              phone={order.pickupPointData.phone}
              address={order.pickupPointData.id}
            />
          )}
          {order.deliveryMethod === 'courrier' && (
            <AddressInfo
              person={`${order.courrierAddress.name} ${order.courrierAddress.surname}`}
              email={order.user.email}
              phone={order.courrierAddress.phone}
              address={`${order.courrierAddress.city},
                          ${order.courrierAddress.street}
                          ${order.courrierAddress.house}
                          ${
                            order.courrierAddress.apartment &&
                            order.courrierAddress.house &&
                            '-'
                          }
                          ${order.courrierAddress.apartment},
                          ${order.courrierAddress.postIndex}`}
            />
          )}
          <p className="m-t wrap-n">
            {lang.deliveryComments}:<br /> {order.deliveryComments}
          </p>
          <p className="m-t">
            {lang.total} {gramsToKilosSimple(totalWeight)}kg
          </p>
          {parcels.map((p, i) => (
            <Input
              key={i}
              width={100}
              label={lang.weight}
              value={p.weight}
              type="number"
              onChange={(e) =>
                setParcels(
                  parcels.map((pp, ii) =>
                    ii === i ? { weight: e.target.value } : pp
                  )
                )
              }
            />
          ))}
          <button
            className="btn m-t"
            onClick={() => setParcels([...parcels, { weight: undefined }])}>
            {lang.add}
          </button>
        </div>
        <form className="p">
          <Input
            {...name}
            maxLength={35}
            required
            label={`${lang.name} ${lang.surname} / ${lang.company_name}`}
          />
          <Input
            {...phone}
            maxLength={30}
            required
            label={lang.phone}
          />
          <Input
            {...email}
            maxLength={100}
            required
            label={lang.email}
          />
          {order.deliveryMethod === 'courrier' && (
            <>
              <Input
                {...street}
                maxLength={35}
                required
                label={lang.street}
              />
              <Input
                {...streetNo}
                maxLength={8}
                label={lang.house}
              />
              <Input
                {...flatNo}
                maxLength={8}
                label={lang.apt}
              />
              <Input
                {...city}
                maxLength={35}
                required
                label={lang.city}
              />
              <Input
                {...postalCode}
                maxLength={7}
                required
                label={lang.post_index}
              />
            </>
          )}
          <Input
            label={lang.contact_info}
            maxLength={35}
            {...contactInfo}
          />
        </form>
      </div>
    </BaseModal>
  )
}
const ReadyForPickupModal = ({ visible, close, order, submit }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const message = useField('textarea')
  useEffect(() => {
    message.changeValue(
      `Pasūtījums Nr.${order.prettyID} ir gatavs saņemšanai Maiznīca Flora ražotnē:\n"Vecvaltes", Krimuldas pagasts, Siguldas novads\nTālrunis: +371 67521291`
    )
  }, [order, visible])
  const orderService = useOrderService()

  const onSubmit = () => {
    orderService
      .makeReadyForPickup(order.id, {
        message: message.value,
      })
      .then((response) => submit(response))
  }

  const onClose = () => {
    message.clear()

    close()
  }

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title={lang.order_status.ready_for_pickup}
      onSubmit={onSubmit}>
      <div className="row">
        <div
          className="column p"
          style={{ maxWidth: '400px' }}>
          <h3 className="card-heading">{lang.deliveryComments}</h3>
          <p className="card-text wrap-n">{order.deliveryComments}</p>
          <div className="card-divider" />
          {order.businessComments && (
            <>
              <h3 className="card-heading">{lang.businessComments}</h3>
              {order.businessComments.name ? (
                <>
                  <p className="card-text wrap-n">
                    {order.businessComments.name}
                  </p>
                  <p className="card-text wrap-n">
                    {order.businessComments.address}
                  </p>
                  <p className="card-text wrap-n">
                    {order.businessComments.regNo}
                  </p>
                </>
              ) : (
                <p>{order.businessComments}</p>
              )}
              <div className="card-divider" />
            </>
          )}
          <h3 className="card-heading">{lang.generalComments}</h3>
          <p className="card-text wrap-n">{order.generalComments}</p>
        </div>
        <form className="p">
          <Input
            {...message}
            required
            width="min(500px, 90vw)"
            expanded="true"
            label={lang.message}
          />
        </form>
      </div>
    </BaseModal>
  )
}
const ExpandedOrder = ({ withManagement }) => {
  const id = useParams().id
  const orderService = useOrderService()
  const [order, setOrder] = useState()
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const { formatFull } = useDateTimeFormat()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  const [makingShipment, setMakingShipment] = useState(false)
  const [makingReadyForPickup, setMakingReadyForPickup] = useState(false)

  useEffect(() => {
    orderService.getById(id).then((response) => setOrder(response))
  }, [id])

  const makeCompleted = () => {
    if (window.confirm(lang.confirm_make_completed)) {
      orderService.makeCompleted(order.id).then((response) => {
        setOrder(response)
      })
    }
  }
  const makeWaitingForCourrier = () => {
    orderService.makeWaitingForCourrier(order.id).then((response) => {
      setOrder(response)
    })
  }
  const makeDelivering = () => {
    orderService.makeDelivering(order.id).then((response) => {
      setOrder(response)
    })
  }
  const makePaid = () => {
    orderService.makePaid(order.id).then((response) => {
      setOrder(response)
    })
  }

  return (
    <>
      {order && order.latestStatus === 'placed' && withManagement && (
        <ShipmentModal
          order={order}
          visible={makingShipment}
          close={() => setMakingShipment(false)}
          submit={setOrder}
        />
      )}
      {order && order.latestStatus === 'placed' && withManagement && (
        <ReadyForPickupModal
          order={order}
          visible={makingReadyForPickup}
          close={() => setMakingReadyForPickup(false)}
          submit={setOrder}
        />
      )}
      <div
        style={{
          position: 'sticky',
          top: 'calc(var(--space)  + var(--header-height))',
          overflowY: 'auto',
          overflowX: 'visible',
          width: '100%',
          height: 'calc(100vh - var(--header-height) - var(--space))',
        }}>
        {order && (
          <div>
            <div className="card row between p m-d  ">
              <h3 className="card-heading">
                {formatFull(new Date(order.datePlaced))}
              </h3>
              <h3 className="card-heading">#{order.prettyID}</h3>
            </div>
            <div className="card row m-d">
              <div className="p">
                {order.statusHistory.map((s) => (
                  <p
                    className="card-text "
                    key={s._id}>
                    <b>{lang.order_status[s.status]}</b>
                  </p>
                ))}
              </div>
              <div className="p">
                {order.statusHistory.map((s) => (
                  <p
                    className="card-text"
                    key={s._id}>
                    {formatFull(new Date(s.time))}
                  </p>
                ))}
              </div>
            </div>
            {order.content.map((i) => (
              <div
                className="card m-d-s"
                key={i.product.id}>
                <div className="row no-wrap no-gap align-cross-center">
                  <img
                    src={`https://www.maiznica.lv/images/xs_${i.product.image}`}
                    width={55}
                    height={55}
                  />
                  <h3
                    className="title m-l"
                    style={{ fontSize: '1.5rem' }}>
                    {i.quantity}
                  </h3>
                  <p className=" p card-text">
                    {i.product.name[selectedLang]}{' '}
                    <b>{gramsToKilos(i.product.weight)}</b>
                  </p>
                  {i.product.outOfStock && (
                    <div className="tooltip m-l">
                      <Warning className="icon-b bad" />
                      <span className="tooltiptext">{lang.special_order}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="row m-t m-d wrap-reverse">
              <div
                className="card p"
                style={{ flex: '1 1 auto' }}>
                {order.deliveryMethod === 'bakery' && (
                  <>
                    <h3 className="card-heading">{lang.delivery_bakery}</h3>
                    <div className="card-divider m-t-s m-d-s" />
                    <p className="card-text m-r">
                      <Mail className="icon-m m-r-s m-d-s" />
                      {order.user.email}
                    </p>
                    {order.deliveryPhone && (
                      <p className="card-text m-r">
                        <Phone className="icon-m m-r-s m-d-s" />
                        {order.deliveryPhone}
                      </p>
                    )}
                    {order.latestStatus === 'placed' && withManagement && (
                      <button
                        className="btn"
                        onClick={() => setMakingReadyForPickup(true)}>
                        {lang.ready}
                      </button>
                    )}
                  </>
                )}
                {order.deliveryMethod === 'pickupPoint' && (
                  <>
                    <h3 className="card-heading">
                      {lang.delivery_pickupPoint}
                    </h3>
                    <div className="card-divider m-t-s m-d-s" />
                    <AddressInfo
                      person={`${order.pickupPointData.name} ${order.pickupPointData.surname}`}
                      email={order.user.email}
                      phone={order.pickupPointData.phone}
                      address={order.pickupPointData.id}
                    />
                  </>
                )}
                {order.deliveryMethod === 'courrier' && (
                  <>
                    <h3 className="card-heading">{lang.delivery_courrier}</h3>
                    <div className="card-divider m-t-s m-d-s" />
                    <AddressInfo
                      person={`${order.courrierAddress.name} ${order.courrierAddress.surname}`}
                      email={order.user.email}
                      phone={order.courrierAddress.phone}
                      address={`${order.courrierAddress.city},
                      ${order.courrierAddress.street}
                      ${order.courrierAddress.house}
                      ${
                        order.courrierAddress.apartment &&
                        order.courrierAddress.house &&
                        '-'
                      }
                      ${order.courrierAddress.apartment},
                      ${order.courrierAddress.postIndex}`}
                    />
                  </>
                )}
                {(order.deliveryMethod === 'pickupPoint' ||
                  order.deliveryMethod === 'courrier') && (
                  <>
                    {withManagement && (
                      <>
                        {order.latestStatus === 'placed' && (
                          <button
                            className="btn"
                            onClick={() => setMakingShipment(true)}>
                            {lang.ready}
                          </button>
                        )}
                        {order.latestStatus === 'ready_for_delivery' && (
                          <button
                            className="btn"
                            onClick={makeWaitingForCourrier}>
                            {lang.request_courrier}
                          </button>
                        )}
                        {order.latestStatus === 'waiting_for_courrier' && (
                          <button
                            className="btn"
                            onClick={makeDelivering}>
                            {lang.handed_to_courrier}
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}
                {order.latestStatus === 'invoiced' && withManagement && (
                  <button
                    className="btn"
                    onClick={makePaid}>
                    {lang.paid}
                  </button>
                )}
                {order.latestStatus !== 'completed' && withManagement && (
                  <button
                    className="btn m-l"
                    onClick={makeCompleted}>
                    {order.deliveryMethod === 'bakery'
                      ? lang.picked_up
                      : lang.delivered}
                  </button>
                )}
              </div>
              <div className="card p">
                <div className="row no-wrap">
                  <p className="card-text text-right">
                    <b>{countProducts(order.content)} </b>
                    {lang.products}
                    <br /> {lang.sum}
                    <br />
                    {lang.delivery}
                    <br />
                    <b>{lang.total}</b>
                    <br />
                    {lang.vat}
                  </p>
                  <p className="card-text">
                    <b> {gramsToKilos(calculateWeight(order.content))}</b>
                    <br />
                    {centsToEuro(order.subtotal)}
                    <br />
                    {centsToEuro(order.deliveryCost)}
                    <br />
                    <b>{centsToEuro(order.total)}</b>
                    <br />
                    {centsToEuro(order.vat)}
                  </p>
                </div>
              </div>
            </div>
            {order.deliveryComments && (
              <div className="card m-d p">
                <h3 className="card-heading">{lang.deliveryComments}</h3>
                <div className="card-divider m-t-s m-d-s" />
                <p className="card-text wrap-n">{order.deliveryComments}</p>
              </div>
            )}
            {order.businessComments && (
              <div className="card m-d p">
                <h3 className="card-heading">{lang.businessComments}</h3>
                <div className="card-divider m-t-s m-d-s" />
                {order.businessComments.name ? (
                  <>
                    <p className="card-text wrap-n">
                      {order.businessComments.name}
                    </p>
                    <p className="card-text wrap-n">
                      {order.businessComments.address}
                    </p>
                    <p className="card-text wrap-n">
                      {order.businessComments.regNo}
                    </p>
                  </>
                ) : (
                  <p>{order.businessComments}</p>
                )}
              </div>
            )}
            {order.generalComments && (
              <div className="card m-d p">
                <h3 className="card-heading">{lang.generalComments}</h3>
                <div className="card-divider m-t-s m-d-s" />
                <p className="card-text wrap-n">{order.generalComments}</p>
              </div>
            )}
            {/* {!withManagement && ( */}
            <button
              className="btn m-d"
              onClick={() => orderService.resendEmail(order.id)}>
              {lang.resend_receipt}
            </button>
            {/* )} */}
          </div>
        )}
      </div>
    </>
  )
}

export default ExpandedOrder
