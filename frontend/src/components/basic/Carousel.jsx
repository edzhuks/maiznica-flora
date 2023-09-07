import Input from './Input'
import styled from 'styled-components'
import { Radio } from '../styled/base'
import { useState } from 'react'
import { CaretLeftFill } from '@styled-icons/bootstrap/CaretLeftFill'
import { CaretRightFill } from '@styled-icons/bootstrap/CaretRightFill'

const CarouselContainer = styled.div`
  width: 100%;
  padding: 0px 60px;
  height: 43vh;
  position: relative;
  margin-bottom: 40px;
`

const CarouselLeft = styled.div`
  width: 60px;
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  display: flex;
`

const CarouselRight = styled(CarouselLeft)`
  right: 0;
  left: auto;
`

const CarouselImages = styled.div`
  width: inherit;
  height: inherit;
  /* overflow: hidden; */
`

const CarouselImage = styled.img`
  width: auto;
  height: inherit;
  opacity: ${(props) => (props.active ? '100%' : '0')};
  position: absolute;
  transition: 0.5s;
`

const CarouselIndicators = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  justify-content: center;
`

const CarouselIndicator = styled.div`
  width: 35px;
  height: 5px;
  margin: 10px 5px;
  background-color: ${(props) => (props.active ? 'gray' : 'lightgray')};
  transition: 0.5s;
`

const CarouselItem = ({ image, active }) => {
  return (
    <CarouselImage
      src={image}
      active={active}></CarouselImage>
  )
}

const Carousel = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0)

  return (
    <CarouselContainer>
      <CarouselLeft
        onClick={() =>
          setActiveImage(
            activeImage === 0 ? images.length - 1 : activeImage - 1
          )
        }>
        <CaretLeftFill color="lightgray" />
      </CarouselLeft>
      <CarouselImages>
        {images.map((image, index) => (
          <CarouselItem
            image={image}
            key={image}
            active={index === activeImage}
          />
        ))}
      </CarouselImages>
      <CarouselRight
        onClick={() => setActiveImage((activeImage + 1) % images.length)}>
        <CaretRightFill color="lightgray" />
      </CarouselRight>
      <CarouselIndicators>
        {images.map((image, index) => (
          <CarouselIndicator
            active={index === activeImage}
            key={image}
          />
        ))}
      </CarouselIndicators>
    </CarouselContainer>
  )
}

export default Carousel
