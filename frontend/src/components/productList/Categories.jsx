import useResource from '../../hooks/useResource'
import ProductListItem from './ProductListItem'
import UserContext from '../../contexts/userContext'
import { useContext } from 'react'
import styled from 'styled-components'
import { ProductRow } from '../styled/base'
import { Link } from 'react-router-dom'

const CategoryGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
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
`
const CategoryItem = styled(Link)`
  max-width: 32%;
  flex: 0 0 32%;
  &:hover {
    ${CategoryTextBackground} {
      height: 320px;
    }
    ${CategoryText} {
      transform: translateY(200%);
      /* bottom: 50%; */
    }
  }
`
const CategoryImage = styled.div`
  width: 100%;
  height: 320px;
  position: relative;
`
const Categories = ({ categories }) => {
  return (
    <CategoryGroup>
      {categories.map((category) => (
        <CategoryItem
          to={`/products/${category.id}`}
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
    </CategoryGroup>
  )
}

export default Categories
