import styled from 'styled-components'
import { centsToEuro, gramsToKilos } from '../../util/convert'
import { useSelector } from 'react-redux'

const Text = styled.p`
  font-family: 'Roboto', sans-serif;
  color: #333333;
  white-space: pre-line;
  max-width: 700px;
`

const Title = styled.p`
  font-family: 'Roboto Slab', serif;
  font-size: 28px;
  color: #45941e;
  font-weight: 400;
`

const TableHeader = styled.th`
  text-align: left;
  border-width: 0px 0px 1px 0px;
  border-color: #333333;
  border-style: solid;
  font-weight: 400;
  padding: 5px 10px;
  &:nth-child(2) {
    text-align: end;
    border-width: 0px 0px 1px 1px;
  }
`

const Table = styled.table`
  border-collapse: collapse;
`

const Cell = styled.td`
  padding: 2px 10px;
  &:nth-child(2) {
    text-align: end;
    border-width: 0px 0px 0px 1px;
    border-style: solid;
    border-color: #333333;
  }
`

const TableRow = styled.tr`
  background-color: white;
  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
`

const StaticInformation = ({ product }) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <Title>
        {product.name[selectedLang] || product.name.lv} &nbsp;
        {gramsToKilos(product.weight)}
      </Title>
      {product.description && (
        <Text>
          {product.description[selectedLang] || product.description.lv}
        </Text>
      )}
      {product.ingredients && (
        <Text>
          {product.ingredients[selectedLang] || product.ingredients.lv}
        </Text>
      )}
      {product.nutrition && (
        <Table>
          <tbody>
            <TableRow>
              <TableHeader>
                <b>{lang.nutritional_info} </b>
              </TableHeader>
              <TableHeader>
                <strong>{lang.g_contains}</strong>
              </TableHeader>
            </TableRow>
            <TableRow>
              <Cell>{lang.energy_content}</Cell>
              <Cell>
                {Math.round(product.nutrition.energy * 4.184)}kJ/
                {product.nutrition.energy}kcal
              </Cell>
            </TableRow>
            <TableRow>
              <Cell>{lang.fat}</Cell>
              <Cell>{product.nutrition.fat}g</Cell>
            </TableRow>
            <TableRow>
              <Cell>&nbsp;&nbsp;&nbsp; {lang.of_which_saturated_fat}</Cell>
              <Cell>{product.nutrition.saturatedFat}g</Cell>
            </TableRow>

            <TableRow>
              <Cell>{lang.carbohydrates}</Cell>
              <Cell>{product.nutrition.carbs}g</Cell>
            </TableRow>
            <TableRow>
              <Cell>&nbsp;&nbsp;&nbsp; {lang.of_which_sugars}</Cell>
              <Cell>{product.nutrition.sugar}g</Cell>
            </TableRow>
            {product.nutrition.fiber !== 0 &&
              product.nutrition.fiber !== '0' &&
              product.nutrition.fiber && (
                <TableRow>
                  <Cell>{lang.fiber}</Cell>
                  <Cell>{product.nutrition.fiber}g</Cell>
                </TableRow>
              )}
            <TableRow>
              <Cell>{lang.protein}</Cell>
              <Cell>{product.nutrition.protein}g</Cell>
            </TableRow>
            <TableRow>
              <Cell>{lang.salt}</Cell>
              <Cell>{product.nutrition.salt}g</Cell>
            </TableRow>
          </tbody>
        </Table>
      )}
      <Text>
        {lang.EAN_code} {product.EAN}
      </Text>
      <Title>{centsToEuro(product.price)}</Title>
      {product.bio && (
        <div style={{ paddingBottom: 30 }}>
          <img
            src="http://www.maiznica.lv/wp-content/uploads/2019/04/eurobio.jpg"
            width={100}
            height={66}
          />
        </div>
      )}
    </div>
  )
}

const TextualInformation = ({ product }) => {
  return (
    <div>
      <StaticInformation product={product} />
    </div>
  )
}

export default TextualInformation
export { StaticInformation }
