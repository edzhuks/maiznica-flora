import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { CaretLeftFill } from '@styled-icons/bootstrap/CaretLeftFill'
import { CaretRightFill } from '@styled-icons/bootstrap/CaretRightFill'

const CarouselContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: ${(props) => props.theme.padding};
`

const CarouselLeft = styled.div`
  z-index: 2;
  width: 60px;
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  svg > path {
    filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.5));
    color: var(--surface);
  }
`

const CarouselRight = styled(CarouselLeft)`
  right: 0;
  left: auto;
  justify-content: end;
`

const CarouselImages = styled.div`
  box-shadow: var(--shadow);
`

const CarouselImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  position: absolute;
  height: auto;
  opacity: 0;
  transition: all 1000ms linear 0s;
  &.fade-in {
    opacity: 1;
  }
`

const PlaceholderImage = styled(CarouselImage)`
  position: static;
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
      active={active}
      className={active && 'fade-in'}></CarouselImage>
  )
}

const Carousel = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0)
  const [int, setInt] = useState(undefined)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((activeImage) => (activeImage + 1) % images.length)
    }, 6000)
    setInt(interval)

    return () => clearInterval(interval)
  }, [images])

  return (
    <CarouselContainer>
      <CarouselLeft
        onClick={() => {
          setActiveImage(
            activeImage === 0 ? images.length - 1 : activeImage - 1
          )
          clearInterval(int)
        }}>
        <CaretLeftFill
          color="lightgray"
          size="2rem"
        />
      </CarouselLeft>
      <CarouselImages>
        {images.map((image, index) => (
          <CarouselItem
            image={image}
            key={image}
            active={index === activeImage}
          />
        ))}
        <PlaceholderImage src={images[0]} />
      </CarouselImages>
      <CarouselRight
        onClick={() => {
          setActiveImage((activeImage + 1) % images.length)
          clearInterval(int)
        }}>
        <CaretRightFill
          size="2rem"
          color="lightgray"
        />
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
