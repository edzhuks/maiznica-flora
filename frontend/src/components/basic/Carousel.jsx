import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { CaretLeftFill } from '@styled-icons/bootstrap/CaretLeftFill'
import { CaretRightFill } from '@styled-icons/bootstrap/CaretRightFill'

const CarouselContainer = styled.div`
  width: 100%;
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
  svg > path {
    filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.5));
    color: #fdfdfd;
  }
`

const CarouselRight = styled(CarouselLeft)`
  right: 0;
  left: auto;
`

const CarouselImages = styled.div`
  width: inherit;
  height: inherit;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`

const CarouselImage = styled.img`
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  height: auto;
  display: ${(props) => (props.active ? 'block' : 'none')};
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
  const [int, setInt] = useState(undefined)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((activeImage) => (activeImage + 1) % images.length)
    }, 3000)
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
        onClick={() => {
          setActiveImage((activeImage + 1) % images.length)
          clearInterval(int)
        }}>
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
