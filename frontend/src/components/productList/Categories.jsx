import styled from 'styled-components'
import { BigTitle } from '../styled/base'
import { Link } from 'react-router-dom'

const CategoryGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 30px;
  margin-bottom: 20px;
`

const CategoryTextBackground = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  background: rgba(69, 148, 30, 0.6);
  transition: height 0.5s;
  height: 62px;
`

const CategoryText = styled.div`
  margin: 0px;
  color: #fff;
  font-family: 'Roboto Slab', serif;
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
  padding: 15px;
  transition: all 0.5s;
  container-type: inline-size;
  font-size: 1.1cqh;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`
const CategoryItem = styled(Link)`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  width: calc(100% / 4 - 23px);
  min-width: 243px;
  aspect-ratio: 1;
  &:hover {
    ${CategoryTextBackground} {
      aspect-ratio: 1/1;
      height: 100%;
    }
  }
`

const Spacer = styled.div`
  width: calc(100% / 4 - 23px);
  min-width: 243px;
  height: 0;
`
const CategoryImage = styled.div`
  aspect-ratio: 1;
  position: relative;
`
const Categories = ({ categories, name }) => {
  return (
    <>
      <CategoryGroup>
        {categories.map((category) => (
          <CategoryItem
            to={`/category/${category.id}`}
            key={category.id}>
            <CategoryImage
              style={{
                background: `url(${category.image}) center center`,
                backgroundSize: 'cover',
              }}>
              <CategoryTextBackground>
                <CategoryText>{category.displayName}</CategoryText>
              </CategoryTextBackground>
            </CategoryImage>
          </CategoryItem>
        ))}
        <Spacer />
        <Spacer />
        <Spacer />
      </CategoryGroup>
      {name && <BigTitle>{name}</BigTitle>}
    </>
  )
}

export default Categories
