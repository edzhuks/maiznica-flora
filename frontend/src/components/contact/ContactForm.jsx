import { useSelector } from 'react-redux'
import Input from '../basic/Input'

const ContactForm = (props) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div className={`card ${props.className}`}>
      <h1 className="big-title m-v-m">{lang.contact_us}</h1>
      <form className="p-h-m">
        <Input
          label={lang.name}
          required
        />
        <Input
          label={lang.email}
          type="email"
          required
        />
        <Input
          label={lang.message}
          type="textarea"
          required
          rows={5}
        />
      </form>
      <div className="text-right">
        <button className="m-m">{lang.send_message}</button>
      </div>
    </div>
  )
}

export default ContactForm
