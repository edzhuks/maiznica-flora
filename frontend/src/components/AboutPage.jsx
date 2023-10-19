import { BigTitle, Card } from './styled/base'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const BigImage = styled.div`
  position: relative;
  margin-top: -40px;
  margin-bottom: 40px;
  &::before {
    z-index: -1;
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: 100vw;
    background: url('https://www.maiznica.lv/wp-content/uploads/2019/12/Uznemuma-bilde2019.jpg');
    background-position-x: 0%;
    background-position-y: 0%;
    background-repeat: repeat;
    background-size: auto;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    filter: brightness(60%);
  }
`
const BiggerTitle = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-family: 'Roboto Slab';
  color: ${(props) => props.theme.white};
  font-size: 38px;
  margin: 0;
  padding: 120px 100px 100px 100px;
`
const BigText = styled.p`
  display: block;
  text-align: center;
  font-family: 'Roboto Slab', serif;
  font-size: 20px;
  line-height: 36px;
  color: ${(props) => props.theme.white};
  /* margin: 0; */
  width: 80%;
  margin: -40px auto 40px auto;
  padding: 0 0 60px 0;
`

const Text = styled.p`
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  line-height: 1.5;
  max-width: 1000px;
  margin: 0 auto 20px auto;
`

const AboutTextGroup = styled.div`
  margin-bottom: 50px;
  margin-top: 50px;
`

const ValueRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 60px;
  align-items: stretch;
  gap: 30px;
  justify-content: space-evenly;
`

const ValueCard = styled(Card)`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-bottom: 24px;
    color: ${(props) => props.theme.main};
    height: 64px;
    width: 64px;
  }
  span {
    font-size: 22px;
    text-transform: uppercase;
  }
`
const BigValueCard = styled(ValueCard)`
  max-width: 410px;
  padding: 20px;
  padding: 20px;
  div {
    align-self: flex-start;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 70px;
      height: auto;
      margin-bottom: 0;
      margin-right: 30px;
    }
    span {
      font-weight: bolder;
    }
  }
  p {
    margin-top: 20px;
    line-height: 1.5;
  }
`
const AboutTextList = styled.ul`
  width: 70%;
  margin: 0 auto;
  padding: 45px 0px 40px 0px;
  position: relative;
  li {
    list-style: none;
    margin-bottom: 20px;
    line-height: 1.5;
    span {
      font-size: 16px;
    }
  }
  li::before {
    position: absolute;
    left: -55px;
    padding-top: 3px;
    display: inline-block;
    text-align: center;
    margin: 5px 10px;
    line-height: 20px;
    transition: all 0.2s;
    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme.main};
    width: 25px;
    height: 25px;
    border-radius: 50%;
    content: '✓';
  }
`

const YoutubePanel = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const Value = ({ image, title, text }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  if (!lang[text]) {
    return (
      <ValueCard>
        <img src={image}></img>
        <span>{lang[title]}</span>
      </ValueCard>
    )
  } else {
    return (
      <BigValueCard>
        <div>
          <img src={image}></img>
          <span>{lang[title]}</span>
        </div>
        <p>{lang[text]}</p>
      </BigValueCard>
    )
  }
}

const Youtube = ({ embedId }) => {
  return (
    <YoutubePanel className="video-responsive">
      <iframe
        width="100%"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </YoutubePanel>
  )
}

const AboutPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  return (
    <div>
      <BigImage>
        <BiggerTitle>{lang.about_us}</BiggerTitle>
        {selectedLang === 'lv' && <BigText>{lang.about_text_top}</BigText>}
      </BigImage>

      {selectedLang !== 'lv' && (
        <AboutTextGroup>
          {lang.about_text.map((text, i) => (
            <Text key={i}>{text}</Text>
          ))}
        </AboutTextGroup>
      )}
      {selectedLang === 'lv' && (
        <AboutTextList>
          {lang.about_text.map((text, i) => (
            <li key={i}>
              <strong>{text.title} – </strong>
              <span>{text.text}</span>
            </li>
          ))}
        </AboutTextList>
      )}

      <BigTitle>{lang.values}</BigTitle>
      <ValueRow>
        <Value
          title="nature"
          image="https://www.maiznica.lv/wp-content/uploads/2019/11/newicon2.png"
          text="nature_text"
        />
        <Value
          title="people"
          image="https://www.maiznica.lv/wp-content/uploads/2019/11/newicon3.png"
          text="people_text"
        />
        <Value
          title="quality"
          image="https://www.maiznica.lv/wp-content/uploads/2019/11/newicon1.png"
          text="quality_text"
        />
      </ValueRow>
      <BigTitle>{lang.how_products_are_made}</BigTitle>
      <Youtube
        embedId={selectedLang === 'de' ? 'wRTPG91SR6o' : 'gGIFEEo3CeY'}
      />
      <div style={{ height: '100px' }} />
    </div>
  )
}

export default AboutPage
