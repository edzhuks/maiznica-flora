import styled from 'styled-components'
import { BigTitle, Spacer, CardRow } from '../styled/base'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CategoryTextBackground = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: color-mix(
    in hsl,
    ${(props) => props.theme.main} calc(100% * 0.6),
    #45941e00
  );
  /* background: ${(props) => props.theme.main}; */
  transition: height 0.5s;
  height: 90px;
`

const CategoryText = styled.div`
  margin: 0px;
  color: ${(props) => props.theme.white};
  font-family: 'Roboto Slab', serif;
  font-size: 22px;
  text-transform: uppercase;
  text-align: center;
  padding: 15px;
  transition: all 0.5s;
  container-type: inline-size;
  /* font-size: 1.1cqh; */
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`
const CategoryItem = styled(Link)`
  box-shadow: ${(props) => props.theme.shadow};
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
const CategoryImage = styled.div`
  aspect-ratio: 1;
  position: relative;
`
const Categories = ({ categories, name }) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  return (
    <>
      <CardRow>
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
                <CategoryText>
                  {category.displayName[selectedLang] ||
                    category.displayName.lv}
                </CategoryText>
              </CategoryTextBackground>
            </CategoryImage>
          </CategoryItem>
        ))}
        <Spacer />
        <Spacer />
        <Spacer />
      </CardRow>
      {name && <BigTitle>{name[selectedLang]}</BigTitle>}
    </>
  )
}

export default Categories
