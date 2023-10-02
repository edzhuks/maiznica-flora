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
const Contact = () => {
  return (
    <Row>
      <HalfWidth>
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
      </HalfWidth>
      <HalfWidth>
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
      </HalfWidth>
    </Row>
  )
}
export default Contact
