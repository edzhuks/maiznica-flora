import styled from 'styled-components'
import { useSelector } from 'react-redux'


const AboutTextList = styled.ul`
  width: 70%;
  margin: 0 auto;
  position: relative;
  li {
    list-style: none;
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
    color: var(--surface);
    background: var(--accent);
    width: 25px;
    height: 25px;
    border-radius: 50%;
    content: '✓';
  }
`

const YoutubePanel = styled.div`
  box-shadow: var(--shadow);
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
      <div className="card row p-b align-cross-center">
        <img src={image}></img>
        <h2 className="title">{lang[title]}</h2>
      </div>
    )
  } else {
    return (
      <div
        className="card column p-m"
        style={{ maxWidth: '350px', flex: '1 0 300px' }}>
        <div className="row align-cross-center">
          <img src={image}></img>
          <h2 className="title m-l">{lang[title]}</h2>
        </div>
        <p className="card-text">{lang[text]}</p>
      </div>
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
      <div className="big-image">
        <h1 className="bigger-title surface-color p-b">{lang.about_us}</h1>
        {selectedLang === 'lv' && (
          <p className="big-text surface-color p-b p-t-0">
            {lang.about_text_top}
          </p>
        )}
      </div>

      {selectedLang !== 'lv' && (
        <div className="p-h-b">
          {lang.about_text.map((text, i) => (
            <p
              className="product-text text-center m-m card p-m"
              key={i}>
              {text}
            </p>
          ))}
        </div>
      )}
      {selectedLang === 'lv' && (
        <AboutTextList className="p-l-0">
          {lang.about_text.map((text, i) => (
            <li
              className="m-d-m card-text card p-m"
              key={i}>
              <strong className="title">{text.title} – </strong>
              <span>{text.text}</span>
            </li>
          ))}
        </AboutTextList>
      )}

      <h1 className="big-title">{lang.values}</h1>
      <div className="row stretch center m-t-m">
        <Value
          title="nature"
          image="/images/newicon2.png"
          text="nature_text"
        />
        <Value
          title="people"
          image="/images/newicon3.png"
          text="people_text"
        />
        <Value
          title="quality"
          image="/images/newicon1.png"
          text="quality_text"
        />
      </div>
      <h1 className="big-title m-v-m">{lang.how_products_are_made}</h1>
      <Youtube
        embedId={selectedLang === 'de' ? 'wRTPG91SR6o' : 'gGIFEEo3CeY'}
      />
      <div style={{ height: '100px' }} />
    </div>
  )
}

export default AboutPage
