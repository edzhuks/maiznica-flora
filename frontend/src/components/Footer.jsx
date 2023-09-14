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
} from './styled/base'

const FooterContainer = styled.div`
  background-image: url(https://www.maiznica.lv/wp-content/themes/maiznica/img/bg.jpg);
  background-repeat: repeat;
  background-position: center;
  background-attachment: fixed;
`

const HalfWidth = styled.div`
  width: 50%;
  padding: 30px;
`

const RightAligned = styled.div`
  /* text-align: end; */
`

const Text = styled.p`
  letter-spacing: 1px;
  line-height: 1.5;
`

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Row>
          <HalfWidth>
            <BigTitle>Contact us</BigTitle>
            <RightAligned>
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
            </RightAligned>
          </HalfWidth>
          <HalfWidth>
            <Text>
              SIA “Maiznīca Flora”
              <br />
              Ražotne: Vecvaltes, Krimuldas pagasts,
              <br />
              Siguldas novads, Latvija
              <br />
              Tālrunis: +371 67521291
              <br />
              E-pasts: flora@maiznica.lv
            </Text>
          </HalfWidth>
        </Row>
      </Container>
    </FooterContainer>
  )
}

export default Footer
