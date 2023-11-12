import { useSelector } from 'react-redux'

const PeoplePanel = (props) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div className={props.className}>
      <div className="row between">
        <div className="column ">
          <div className="card">
            <h2 className="title text-center m">{lang.sales}</h2>
            <h3 className="card-heading m">Dzintars Cālītis</h3>
            <p className="card-text m">
              {lang.sales_manager}
              <br />
              +371 25708084
              <br />
              dzintars.calitis@maiznica.lv
            </p>
            <div className="card-divider" />
            <h3 className="card-heading m">Eveta Krūmiņa</h3>
            <p className="card-text m">
              {lang.deputy_sales_manager}
              <br />
              +371 26414808
              <br />
              eveta@maiznica.lv
            </p>
            <div className="card-divider" />
            <h3 className="card-heading m">Elīna Bārda</h3>
            <p className="card-text m">
              {lang.export_manager}
              <br />
              +371 28334024
              <br />
              elina@maiznica.lv
            </p>
          </div>
        </div>
        <div className="column ">
          <div className="card">
            <h2 className="title text-center m">{lang.production}</h2>
            <h3 className="card-heading m">Ilze Rinkus</h3>
            <p className="card-text m">
              {lang.bread_manager}
              <br />
              +371 67973298
              <br />
              ilze@maiznica.lv
            </p>
            <div className="card-divider" />
            <h3 className="card-heading m">Ruta Pauniņa</h3>
            <p className="card-text m">
              {lang.pastry_manager}
              <br />+ 371 67840086
              <br />
              ruta@maiznica.lv
            </p>
          </div>
        </div>
        <div className="column ">
          <div className="card">
            <h2 className="title text-center m">{lang.orders}</h2>
            <p className="card-text m">
              +371 67973297
              <br />
              +371 67521291
              <br />
              +371 28634840
              <br />
              vija@maiznica.lv
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PeoplePanel
