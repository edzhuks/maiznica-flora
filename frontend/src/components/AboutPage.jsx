import { useEffect, useState } from 'react'
import { BigTitle } from './styled/base'
import Categories from './productList/Categories'
import Carousel from './basic/Carousel'
import categoryService from '../services/category'
import ProductList from './productList/ProductList'
import styled from 'styled-components'
import { Nature } from '@styled-icons/material/Nature'
import { People } from '@styled-icons/fluentui-system-filled/People'
import { useSelector } from 'react-redux'

const BigImage = styled.div`
  position: relative;
  margin-top: -40px;
  margin-bottom: 40px;
  &::before {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px inset,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px inset;
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
    filter: brightness(80%);
  }
`
const BiggerTitle = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-family: 'Roboto Slab';
  color: white;
  font-size: 38px;
  margin: 0;
  padding: 120px 100px 100px 100px;
`

const Text = styled.p`
  text-align: center;
  font-family: 'Roboto', sans-serif;
  color: #333333;
  font-weight: 400;
  line-height: 1.5;
  max-width: 1000px;
  margin: 0 auto 20px auto;
`

const ValueRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 60px;
`

const Value = styled.div`
  div {
    width: 50%;
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;

    img,
    svg {
      margin-bottom: 24px;
      color: #45931e;
      height: 64px;
      width: 64px;
    }
    span {
      font-size: 22px;
      text-transform: uppercase;
      color: #333333;
    }
  }
  flex: 33.3333%;
`

const YoutubePanel = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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

const Youtube = ({ embedId }) => {
  return (
    <YoutubePanel className="video-responsive">
      <iframe
        width="100%"
        // height=""
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
  return (
    <div>
      <BigImage>
        <BiggerTitle>About Us</BiggerTitle>
      </BigImage>
      <Text>
        Flora Bakery was founded back in the 1990s when it put its first
        homemade loaf of white bread on the festive table at Christmas time. The
        bakery’s name has historical origins. Before focusing on making
        delicious baked products and pastries, the owners grew flowers. This
        inspired them to give their next line of business a name connected with
        nature. The bakery was named Flora.
      </Text>
      <Text>
        In 2008, Flora opened its new EU standard production plan in Krimulda
        Parish in a mythical place named Ragana. Here all products are produced
        at one site. However, in this modern bakery, our greatest asset is still
        the fact that our products are handcrafted, which we combine with years
        of knowledge of how to bake the best quality products.
      </Text>
      <Text>
        In April 2012, Flora Bakery received a BIO product production
        certificate.
      </Text>
      <Text>
        Fragrant, organic, natural ingredients are among the core values of
        Flora Bakery, whereby nature and its colours are the source of
        inspiration, which created the Flora Bakery. Picture the scenery,
        Latvia’s blossoming meadows adorned by playful red poppies and golden
        ears, radiating in the glowing sun. Just as an perfumer takes the most
        captivating aromas to create perfumes, we seek the highest quality
        ingredients as well as unique herbs and spices. Flora products are made
        nurturing the knowledge and know-how of our expert bakers. We offer our
        customers an intimate bouquet of flavour created right here in the
        picturesque Latvian parish of Krimulda. May the floral delights blossom
        on your table!
      </Text>
      <BigTitle>Flora Bakery's Values</BigTitle>
      <ValueRow>
        <Value>
          <div>
            <img src="http://www.maiznica.lv/wp-content/uploads/2019/05/kvalitate.png"></img>
            <span>Quality</span>
          </div>
        </Value>
        <Value>
          <div>
            <Nature /> <span>Nature</span>
          </div>
        </Value>
        <Value>
          <div>
            <People /> <span>People</span>
          </div>
        </Value>
      </ValueRow>
      <BigTitle>HOW FLORA BAKERY’S PRODUCTS ARE MADE?</BigTitle>
      <Youtube embedId={'gGIFEEo3CeY'} />
      <div style={{ height: '100px' }} />
    </div>
  )
}

export default AboutPage
