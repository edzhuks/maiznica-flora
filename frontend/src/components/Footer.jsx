import styled from 'styled-components'
import { Container, Padding } from './styled/base'
import Contact from './Contact'

const FooterContainer = styled.div`
  background-image: url(https://www.maiznica.lv/wp-content/themes/maiznica/img/bg.jpg);
  background-repeat: repeat;
  background-position: center;
  background-attachment: fixed;
  box-shadow: ${(props) => props.theme.shadowInset};
  width: 100vw;
`

const Footer = () => {
  return (
    <FooterContainer>
      <Padding>
        <Container>
          <Contact />
        </Container>
      </Padding>
    </FooterContainer>
  )
}

export default Footer
