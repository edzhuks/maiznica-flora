import styled from 'styled-components'
import {
  BigTitle,
  Form,
  InputGroup,
  StyledInput,
  Label,
  TextArea,
  Button,
  ContactText,
} from './styled/base'
import { useSelector } from 'react-redux'

const WrappableRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  div {
    flex: 50%;
  }
  column-gap: 40px;
  padding-bottom: 100px;
`

const Half = styled.div`
  /* padding: 30px; */
`

const Contact = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <WrappableRow>
      <Half>
        <BigTitle>{lang.contact_us}</BigTitle>
        <Form style={{ width: '100%', paddingBottom: 20 }}>
          <InputGroup>
            <Label>
              {lang.name}
              <StyledInput />
            </Label>
          </InputGroup>
          <InputGroup>
            <Label>
              {lang.email}
              <StyledInput />
            </Label>
          </InputGroup>
          <InputGroup>
            <Label>
              {lang.message}
              <TextArea
                rows={5}
                style={{ width: '100%' }}
              />
            </Label>
          </InputGroup>
        </Form>
        <Button>{lang.send_message}</Button>
      </Half>
      <Half>
        <ContactText>
          SIA “Maiznīca Flora”
          <br />
          Ražotne: Vecvaltes, Krimuldas pagasts,
          <br />
          Siguldas novads, Latvija
          <br />
          Tālrunis: +371 67521291
          <br />
          E-pasts: flora@maiznica.lv
        </ContactText>
      </Half>
    </WrappableRow>
  )
}
export default Contact
