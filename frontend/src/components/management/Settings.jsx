import { Cross } from '@styled-icons/entypo/Cross'
import { useEffect, useState } from 'react'
import useField from '../../hooks/useField'
import Input from '../basic/Input'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import useSettingsService from '../../services/settings'

const NewEmail = ({ addEmail, label }) => {
  const email = useField('email')
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  return (
    <div className="card column  p">
      <h3 className="card-heading">{label}</h3>
      <div className="row align-cross-end ">
        <Input
          {...email}
          label={lang.email}
        />
        <button
          onClick={() => {
            addEmail({ email: email.value })
            email.clear()
          }}
          className="btn">
          {lang.add}
        </button>
      </div>
    </div>
  )
}

const EmailList = ({ emails, addEmail, removeEmail, label }) => {
  return (
    <div
      className=" column small-gap"
      style={{ flexGrow: 0 }}>
      <NewEmail
        addEmail={addEmail}
        label={label}
      />
      {emails.map((e) => (
        <div
          key={e.email}
          className="p row between align-cross-center card">
          <h3 className="card-heading">{e.email}</h3>
          <button
            onClick={() => {
              removeEmail(e)
            }}
            className="btn icon-button inverted cancel">
            <Cross className="icon-b" />
          </button>
        </div>
      ))}
    </div>
  )
}

const SettingsPage = () => {
  const settingsService = useSettingsService()
  const [contactEmails, setContactEmails] = useState([])
  const [orderEmails, setOrderEmails] = useState([])
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  useEffect(() => {
    settingsService
      .getContactFormEmails()
      .then((response) => setContactEmails(response.data.contactFormEmails))
    settingsService
      .getOrderNotificationEmails()
      .then((response) => setOrderEmails(response.data.orderNotificationEmails))
  }, [])

  const addContactEmail = (email) => {
    setContactEmails([email, ...contactEmails])
  }
  const addOrderEmail = (email) => {
    setOrderEmails([email, ...orderEmails])
  }
  const update = () => {
    settingsService.updateContactFormEmails(contactEmails).then((response) => {
      settingsService
        .updateOrderNotificationEmails(orderEmails)
        .then((response) => {
          toast.success(lang.toast_changes_saved)
        })
    })
  }
  const removeContactEmail = (email) => {
    setContactEmails(contactEmails.filter((e) => e.email !== email.email))
  }
  const removeOrderEmail = (email) => {
    setOrderEmails(orderEmails.filter((e) => e.email !== email.email))
  }
  return (
    <div className="m-t">
      <div className="row between  m-d">
        <EmailList
          emails={contactEmails}
          addEmail={addContactEmail}
          removeEmail={removeContactEmail}
          label={lang.contact_form_emails}
        />
        <EmailList
          emails={orderEmails}
          addEmail={addOrderEmail}
          removeEmail={removeOrderEmail}
          label={lang.order_notification_emails}
        />
        <button
          className="btn"
          onClick={update}>
          {lang.save_changes}
        </button>
      </div>

      <div className="column"></div>
    </div>
  )
}
export default SettingsPage
