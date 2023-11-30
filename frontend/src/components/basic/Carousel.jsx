import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { CaretLeftFill } from '@styled-icons/bootstrap/CaretLeftFill'
import { CaretRightFill } from '@styled-icons/bootstrap/CaretRightFill'
import { useNavigate } from 'react-router-dom'

const CarouselContainer = styled.div`
  width: 100%;
  position: relative;
`

const CarouselLeft = styled.div`
  z-index: 3;
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

const CarouselImages = styled.div``

const CarouselImage = styled.img`
  box-shadow: var(--shadow);
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  position: absolute;
  height: auto;
  opacity: 0;
  transition: all 1000ms linear 0s;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  &.fade-in {
    opacity: 1;
  }
`

const CarouselIndicators = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  justify-content: center;
  z-index: 2;
`

const CarouselIndicator = styled.div`
  width: 35px;
  height: 5px;
  margin: 10px 5px;
  background-color: ${(props) =>
    props.active ? 'var(--subtle)' : 'var(--subtler)'};
  transition: 0.5s;
`

const CarouselItem = ({ bannerItem, active }) => {
  const navigate = useNavigate()
  return (
    <CarouselImage
      onClick={() => {
        if (bannerItem.category || bannerItem.product)
          navigate(
            bannerItem.category
              ? `/category/${bannerItem.category}`
              : `/products/${bannerItem.product}`
          )
      }}
      src={`/images/xl_${bannerItem.image}`}
      active={active}
      className={active && 'fade-in'}
      style={{
        cursor: (bannerItem.category || bannerItem.product) && 'pointer',
      }}
    />
  )
}

const Carousel = ({ banners, className }) => {
  const [activeImage, setActiveImage] = useState(0)
  const [int, setInt] = useState(undefined)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((activeImage) => (activeImage + 1) % banners.length)
    }, 12000)
    setInt(interval)

    return () => clearInterval(interval)
  }, [banners])

  return (
    <CarouselContainer className={className}>
      <CarouselLeft
        onClick={() => {
          setActiveImage(
            activeImage === 0 ? banners.length - 1 : activeImage - 1
          )
          clearInterval(int)
        }}>
        <CaretLeftFill
          color="lightgray"
          size="2rem"
        />
      </CarouselLeft>
      <CarouselImages>
        {banners.length > 0 &&
          banners.map((bannerItem, index) => (
            <CarouselItem
              bannerItem={bannerItem}
              key={bannerItem._id}
              active={index === activeImage}
            />
          ))}

        <div style={{ width: '100%', aspectRatio: '1.8' }} />
      </CarouselImages>
      <CarouselRight
        onClick={() => {
          setActiveImage((activeImage + 1) % banners.length)
          clearInterval(int)
        }}>
        <CaretRightFill
          size="2rem"
          color="lightgray"
        />
      </CarouselRight>
      <CarouselIndicators>
        {banners.map((bannerItem, index) => (
          <CarouselIndicator
            active={index === activeImage}
            key={bannerItem._id}
          />
        ))}
      </CarouselIndicators>
    </CarouselContainer>
  )
}

export default Carousel
