import { ContactText } from '../styled/base'

const Address = ({ address }) => {
  if (address) {
    return (
      <div>
        <ContactText>
          {address.name}
          <br />
          {address.street}
          <br />
          {address.city}
          <br />
          {address.country}-{address.postalCode}
        </ContactText>
      </div>
    )
  }
  return (
    <div>
      <ContactText>
        SIA “Maiznīca Flora”
        <br />
        Ražotne: Vecvaltes, Krimuldas pagasts,
        <br />
        Siguldas novads, Latvija, LV-2144
        <br />
        Reģ nr. 50003251341
        <br />
        Tālrunis: +371 67521291
        <br />
        E-pasts: flora@maiznica.lv
      </ContactText>
    </div>
  )
}

export default Address
