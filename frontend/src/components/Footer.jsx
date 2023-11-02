import styled from 'styled-components'
import { Container, Padding, TextLink, WrappableRow } from './styled/base'
import ContactPage from './contact/ContactPage'
import { Link } from 'react-router-dom'
import ContactForm from './contact/ContactForm'
import Address from './contact/Address'
import { useSelector } from 'react-redux'

const FooterContainer = styled.div`
  background-image: url(https://www.maiznica.lv/wp-content/themes/maiznica/img/bg.jpg);
  background-repeat: repeat;
  background-position: center;
  background-attachment: fixed;
  box-shadow: ${(props) => props.theme.shadowInset};
  width: 100vw;
  display: flex;
  justify-content: center;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Footer = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <FooterContainer>
      <Padding style={{ width: '100%' }}>
        <Container style={{ width: 'fit-content' }}>
          <WrappableRow style={{ width: 'fit-content' }}>
            <ContactForm />
            <Column>
              <Address />
              <TextLink to="/EU_projects">{lang.eu_projects}</TextLink>
              <TextLink to="/distance_agreement">
                {lang.distance_agreement}
              </TextLink>
              <TextLink to="/privacy_policy">{lang.privacy_policy}</TextLink>
            </Column>
          </WrappableRow>
        </Container>
      </Padding>
    </FooterContainer>
  )
}

export default Footer
