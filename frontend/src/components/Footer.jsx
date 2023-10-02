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

const FooterContainer = styled.div`
  background-image: url(https://www.maiznica.lv/wp-content/themes/maiznica/img/bg.jpg);
  background-repeat: repeat;
  background-position: center;
  background-attachment: fixed;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px inset,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px inset;
`

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
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
      </Container>
    </FooterContainer>
  )
}

export default Footer
