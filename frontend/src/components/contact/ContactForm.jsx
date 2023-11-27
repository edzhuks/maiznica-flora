import { useSelector } from 'react-redux'
import Input from '../basic/Input'
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from 'react-simple-captcha'
import { useEffect } from 'react'
import useField from '../../hooks/useField'
import { toast } from 'react-toastify'
import useContactService from '../../services/contact'

const ContactForm = (props) => {
  const name = useField('text')
  const email = useField('email')
  const message = useField('textarea')
  const captcha = useField('text')
  const contactService = useContactService()

  useEffect(() => {
    loadCaptchaEnginge(6)
  }, [])

  const doSubmit = (event) => {
    event.preventDefault()

    if (validateCaptcha(captcha.value) == true) {
      contactService
        .sendContactForm({
          name: name.value,
          email: email.value,
          message: message.value,
        })
        .then(() => {
          toast.success(lang.toast_contact_form_success)
          loadCaptchaEnginge(6)
          captcha.clear()
          name.clear()
          email.clear()
          message.clear()
        })
        .catch((error) => toast.error(error.response.data.error))
    } else {
      toast.error(lang.captcha_mismatch)
      loadCaptchaEnginge(6)
      captcha.clear()
    }
  }

  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div className={`card ${props.className}`}>
      <h1 className="big-title m-v-m">{lang.contact_us}</h1>
      <form
        className="p-h-m"
        onSubmit={doSubmit}>
        <Input
          {...name}
          label={lang.name}
          required
        />
        <Input
          {...email}
          label={lang.email}
          required
        />
        <Input
          {...message}
          label={lang.message}
          required
        />
        <div className="align-cross-end row">
          <Input
            width={120}
            label={lang.enter_captcha}
            id="user_captcha_input"
            name="user_captcha_input"
            {...captcha}
            required
          />
          <LoadCanvasTemplateNoReload />
        </div>

        <div className="text-right m m-r-0">
          <button
            type="submit"
            className="btn">
            {lang.send_message}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
