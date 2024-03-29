import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ContactForm from './contact/ContactForm'
import { useSelector } from 'react-redux'
import FloraAddress from './contact/Address'

const FooterContainer = styled.div`
  background-image: url(https://www.maiznica.lv/images/bg.jpg);
  background-repeat: repeat;
  background-position: center;
  background-attachment: fixed;
  box-shadow: var(--shadow-inset);
`

const Footer = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <FooterContainer>
      <div className="center-h">
        <div className="container p row center">
          <ContactForm />
          <div
            className="column "
            style={{ flex: 'unset' }}>
            <div className="card p">
              <FloraAddress />
            </div>
            <div className="card column p">
              <Link
                className="text-link"
                to="/EU_projects">
                {lang.eu_projects}
              </Link>
              <Link
                className="text-link"
                to="/distance_agreement">
                {lang.distance_agreement}
              </Link>
              <Link
                className="text-link"
                to="/privacy_policy">
                {lang.privacy_policy}
              </Link>
              <p className="card-text">© 2023 Edgars Gaisiņš</p>
            </div>
          </div>
        </div>
      </div>
    </FooterContainer>
  )
}

export default Footer
