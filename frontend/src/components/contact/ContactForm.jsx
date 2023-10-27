import { useSelector } from 'react-redux'
import {
  BigTitle,
  Button,
  Form,
  InputGroup,
  Label,
  ShadowInput,
  ShadowTextArea,
} from '../styled/base'

const ContactForm = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <BigTitle>{lang.contact_us}</BigTitle>
      <Form style={{ width: '100%', paddingBottom: 20 }}>
        <InputGroup>
          <Label>
            {lang.name}
            <ShadowInput />
          </Label>
        </InputGroup>
        <InputGroup>
          <Label>
            {lang.email}
            <ShadowInput />
          </Label>
        </InputGroup>
        <InputGroup>
          <Label>
            {lang.message}
            <ShadowTextArea
              rows={5}
              style={{ width: '70%' }}
            />
          </Label>
        </InputGroup>
      </Form>
      <div style={{ textAlign: 'right' }}>
        <Button>{lang.send_message}</Button>
      </div>
    </div>
  )
}

export default ContactForm
