import { useSelector } from 'react-redux'
import styled from 'styled-components'

const People = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const PeopleColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  @media (max-width: 650px) {
    width: 50%;
  }
`
const ColumnTitle = styled.h1`
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-bottom: ${(props) => props.theme.padding};
`
const Person = styled.p`
  margin-top: 0;
  line-height: 1.4rem;
`

const PeoplePanel = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <People>
      <PeopleColumn>
        <ColumnTitle>{lang.sales}</ColumnTitle>
        <Person>
          Dzintars Cālītis
          <br />
          {lang.sales_manager}
          <br />
          +371 25708084
          <br />
          dzintars.calitis@maiznica.lv
        </Person>
        <Person>
          Eveta Krūmiņa
          <br />
          {lang.deputy_sales_manager}
          <br />
          +371 26414808
          <br />
          eveta@maiznica.lv
        </Person>
        <Person>
          Elīna Bārda
          <br />
          {lang.export_manager}
          <br />
          +371 28334024
          <br />
          elina@maiznica.lv
        </Person>
      </PeopleColumn>
      <PeopleColumn>
        <ColumnTitle>{lang.production}</ColumnTitle>
        <Person>
          Ilze Rinkus
          <br />
          {lang.bread_manager}
          <br />
          +371 67973298
          <br />
          ilze@maiznica.lv
        </Person>
        <Person>
          Ruta Pauniņa
          <br />
          {lang.pastry_manager}
          <br />
          + 371 67840086
          <br />
          ruta@maiznica.lv
        </Person>
      </PeopleColumn>
      <PeopleColumn>
        <ColumnTitle>{lang.orders}</ColumnTitle>
        <Person>
          +371 67973297
          <br />
          +371 67521291
          <br />
          +371 28634840
          <br />
          vija@maiznica.lv
        </Person>
      </PeopleColumn>
    </People>
  )
}

export default PeoplePanel
