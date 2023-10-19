import styled from 'styled-components'
import { addVat, centsToEuro, gramsToKilos } from '../../util/convert'
import { useSelector } from 'react-redux'
import { NumberInput, Button } from '../styled/base'
import { Barcode } from '@styled-icons/icomoon/Barcode'
const Text = styled.p`
  font-family: 'Roboto', sans-serif;
  color: #333333;
  white-space: pre-line;
  max-width: 700px;
  margin: 30px 0px;
`

const Title = styled.h1`
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

const Badges = styled.div`
  margin: 20px 0px 30px 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  row-gap: 10px;
  span {
    color: white;
    padding: 5px 15px;
    background-color: #45941e;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }
`
const Price = styled.div`
  margin: 30px 0px;
  span {
    color: #aaaaaa;
    font-size: 14px;
    margin-left: 10px;
    font-weight: normal;
  }
  p {
    margin-top: 0px;
    margin-left: 20px;
    color: #45941e;
  }
  h1 {
    margin-bottom: 0;
    font-weight: bold;
  }
`
const ShadowDiv = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  width: fit-content;
  button {
    box-shadow: none;
  }
  margin: 30px 0px 40px 0px;
`

const CertImg = styled.img`
  width: auto;
  height: 70px;
  margin: 0px 20px 0px 0px;
`
const StaticInformation = ({ product, quantity, setQuantity, onOrder }) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <Title>
        {product.name[selectedLang] || product.name.lv} &nbsp;
        {gramsToKilos(product.weight)}
      </Title>
      {product.badges && (
        <Badges>
          {product.badges.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </Badges>
      )}
      <Price>
        <Title>
          {centsToEuro(addVat(product.price))}
          <span>{lang.with_VAT}</span>
        </Title>

        <p>
          {centsToEuro(
            (addVat(product.price) / product.weight) * 1000
          ).substring(1)}{' '}
          € / kg
        </p>
      </Price>
      <ShadowDiv>
        <NumberInput
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          type="number"
        />
        <Button onClick={onOrder}>{lang.add_to_cart}</Button>
      </ShadowDiv>
      {product.bio && (
        <CertImg
          src="http://www.maiznica.lv/wp-content/uploads/2019/04/eurobio.jpg"
          width={100}
          height={66}
        />
      )}
      {product.spoonRed && (
        <CertImg
          src="http://karotite.lv/img/bordo-intro-logo.png"
          width={100}
          height={66}
        />
      )}
      {product.spoonGreen && (
        <CertImg
          src="http://karotite.lv/img/green-intro-logo.png"
          width={100}
          height={66}
        />
      )}
      {product.expiration && (
        <>
          <Text>
            {lang.expiration_time}{' '}
            <strong>
              {product.expiration.number} {lang[product.expiration.word]}
            </strong>
          </Text>
          {product.expiration.afterOpening && (
            <Text style={{ marginTop: '-20px' }}>
              {lang.after_opening}{' '}
              <strong>
                {product.expiration.afterOpening.number}{' '}
                {lang[product.expiration.afterOpening.word]}
              </strong>
            </Text>
          )}
        </>
      )}
      {/* {product.description && (
        <Text>
          {product.description[selectedLang] || product.description.lv}
        </Text>
      )} */}
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
        <Barcode
          size={30}
          style={{ marginRight: '10px' }}
        />
        {product.EAN}
      </Text>
    </div>
  )
}

export default StaticInformation
