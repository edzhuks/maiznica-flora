import AddressWithMap from './AddressWithMap'

const BussinessMap = () => {
  return (
    <AddressWithMap latlon={[57.174112, 24.689709]}>
      <h3 className="card-heading m"> SIA “Maiznīca Flora”</h3>
      <p className="card-text m">
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
    </AddressWithMap>
  )
}
export default BussinessMap
