import { useSelector } from 'react-redux'
import PeoplePanel from './People'
import BussinessMap from './BussinessMap'

const ContactPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <h1 className="big-title">{lang.contact}</h1>
      <PeoplePanel className="m-d" />
      <BussinessMap />
    </div>
  )
}
export default ContactPage
