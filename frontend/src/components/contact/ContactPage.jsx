import { BigTitle } from '../styled/base'
import { useSelector } from 'react-redux'
import PeoplePanel from './People'
import AddressWithMap from './AddressWithMap'

const ContactPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <BigTitle>{lang.contact}</BigTitle>
      <PeoplePanel />
      <AddressWithMap />
    </div>
  )
}
export default ContactPage
