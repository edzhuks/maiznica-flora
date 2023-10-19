import styled from 'styled-components'
import { Container } from './styled/base'
import Contact from './Contact'

const FooterContainer = styled.div`
  background-image: url(https://www.maiznica.lv/wp-content/themes/maiznica/img/bg.jpg);
  background-repeat: repeat;
  background-position: center;
  background-attachment: fixed;
  box-shadow: ${(props) => props.theme.shadowInset};
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
