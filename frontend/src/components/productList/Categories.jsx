import styled from 'styled-components'
import { BigTitle, CardRow } from '../styled/base'
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
  height: 25%;
`

const CategoryText = styled.div`
  margin: 0px;
  color: ${(props) => props.theme.white};
  font-family: 'Roboto Slab', serif;
  font-size: 0.9rem;
  @media (max-width: 960px) {
    font-size: 0.8rem;
  }
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
const CategoryItem = styled.div`
  max-width: 200px;
  width: ${(props) =>
    `calc((100% / ${props.tight ? 3 : 6}) - ${props.theme.padding} / 2)`};
  min-width: 130px;

  @media (max-width: 1130px) {
    width: calc((100% / 6) - ${(props) => props.theme.padding} / 2);
  }
  @media (max-width: 400px) {
    width: calc((100% / 6) - ${(props) => props.theme.padding} / 2);
  }
  aspect-ratio: 1;
  /* padding: calc(${(props) => props.theme.padding} / 2); */
`
const CategoryCard = styled(Link)`
  box-shadow: ${(props) => props.theme.shadow};
  display: block;
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
const Categories = ({ categories, name, tight }) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  return (
    <div style={{ width: '100%' }}>
      {categories && categories.length > 0 && (
        <CardRow>
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              tight={tight}>
              <CategoryCard to={`/category/${category.id}`}>
                <CategoryImage
                  style={{
                    background: `url(/images/${category.image}) center center`,
                    backgroundSize: 'cover',
                  }}>
                  <CategoryTextBackground>
                    <CategoryText>
                      {category.displayName[selectedLang] ||
                        category.displayName.lv}
                    </CategoryText>
                  </CategoryTextBackground>
                </CategoryImage>
              </CategoryCard>
            </CategoryItem>
          ))}
          {/* <Spacer /> */}
          {/* <Spacer /> */}
          {/* <Spacer /> */}
        </CardRow>
      )}
      {name && <BigTitle>{name[selectedLang] || name.lv}</BigTitle>}
    </div>
  )
}

export default Categories
