import styled from 'styled-components'
import {
  Container,
  BigTitle,
  Row,
  Form,
  InputGroup,
  StyledInput,
  Label,
  TextArea,
  Button,
  HalfWidth,
  ContactText,
} from './styled/base'

const WrappableRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
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
  padding: 30px;
`

const Contact = () => {
  return (
    <WrappableRow>
      <Half>
        <BigTitle>Contact us</BigTitle>
        <Form style={{ width: '100%', paddingBottom: 20 }}>
          <InputGroup>
            <Label>
              Name
              <StyledInput style={{ width: '400px' }} />
            </Label>
          </InputGroup>
          <InputGroup>
            <Label>
              Email
              <StyledInput style={{ width: '400px' }} />
            </Label>
          </InputGroup>
          <InputGroup>
            <Label>
              Message
              <TextArea
                rows={5}
                style={{ width: '400px' }}
              />
            </Label>
          </InputGroup>
        </Form>
        <Button>Send message</Button>
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
