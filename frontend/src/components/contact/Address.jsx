const Address = ({ address }) => {
  if (address) {
    return (
      <div>
        <p className="text">
          {address.name} {address.surname}
          <br />
          {address.street} {address.house}-{address.apartment}
          <br />
          {address.city}
          <br />
          {address.country}-{address.postalCode}
        </p>
      </div>
    )
  }
  return (
    <div>
      <p>
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
      </p>
    </div>
  )
}

export default Address
