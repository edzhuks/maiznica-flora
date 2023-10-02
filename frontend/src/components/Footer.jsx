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
import Contact from './Contact'

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
        <Contact />
      </Container>
    </FooterContainer>
  )
}

export default Footer
