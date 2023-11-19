import { useSelector } from 'react-redux'
import PeoplePanel from './People'
import BusinessMap from './BusinessMap'

const ContactPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <h1 className="big-title m-d">{lang.contact}</h1>
      <PeoplePanel className="m-d" />
      <BusinessMap />
    </div>
  )
}
export default ContactPage
