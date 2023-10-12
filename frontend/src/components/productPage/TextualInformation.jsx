import styled from 'styled-components'
import { StyledInput, TextArea, NumberInput } from '../styled/base'
import Checkbox from '../basic/Checkbox'
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
            {product.nutrition.fiber && (
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
    </div>
  )
}

const EditableInformation = ({
  name,
  weight,
  description,
  ingredients,
  energy,
  fat,
  saturatedFat,
  carbs,
  sugar,
  fiber,
  protein,
  salt,
  EAN,
  price,
  bio,
  setBio,
  setDescription,
  setIngredients,
}) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <StyledInput
        style={{ color: '#45941e' }}
        {...name}
      />
      {'    '}
      <NumberInput
        style={{ color: '#45941e' }}
        {...weight}
      />
      g<br />
      <Text>{lang.description}</Text>
      <TextArea
        rows={10}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        style={{
          width: 600,
          fontSize: 16,
          color: '#333333',
          fontFamily: 'Roboto',
        }}
      />
      <br />
      <Text>{lang.ingredients}</Text>
      <TextArea
        rows={4}
        value={ingredients}
        onChange={(event) => setIngredients(event.target.value)}
        style={{
          width: 600,
          fontSize: 16,
          color: '#333333',
          fontFamily: 'Roboto',
          marginBottom: 20,
        }}
      />
      <Table style={{ marginBottom: 20 }}>
        <tbody>
          <TableRow>
            <TableHeader>
              <b>{lang.nutritional_info}</b>
            </TableHeader>
            <TableHeader>
              <strong>{lang.g_contains}</strong>
            </TableHeader>
          </TableRow>
          <TableRow>
            <Cell>{lang.energy_content}</Cell>
            <Cell>
              <NumberInput
                style={{ color: '#333333' }}
                {...energy}
              />
              kcal
            </Cell>
          </TableRow>
          <TableRow>
            <Cell>{lang.fat}</Cell>
            <Cell>
              <NumberInput
                style={{ color: '#333333' }}
                {...fat}
              />
              g
            </Cell>
          </TableRow>
          <TableRow>
            <Cell>&nbsp;&nbsp;&nbsp; {lang.of_which_saturated_fat}</Cell>
            <Cell>
              <NumberInput
                style={{ color: '#333333' }}
                {...saturatedFat}
              />
              g
            </Cell>
          </TableRow>

          <TableRow>
            <Cell>{lang.carbohydrates}</Cell>
            <Cell>
              <NumberInput
                style={{ color: '#333333' }}
                {...carbs}
              />
              g
            </Cell>
          </TableRow>
          <TableRow>
            <Cell>&nbsp;&nbsp;&nbsp; {lang.of_which_sugars}</Cell>
            <Cell>
              <NumberInput
                style={{ color: '#333333' }}
                {...sugar}
              />
              g
            </Cell>
          </TableRow>
          <TableRow>
            <Cell>{lang.fiber}</Cell>
            <Cell>
              <NumberInput
                style={{ color: '#333333' }}
                {...fiber}
              />
              g
            </Cell>
          </TableRow>
          <TableRow>
            <Cell>{lang.protein}</Cell>
            <Cell>
              <NumberInput
                style={{ color: '#333333' }}
                {...protein}
              />
              g
            </Cell>
          </TableRow>
          <TableRow>
            <Cell>{lang.salt}</Cell>
            <Cell>
              <NumberInput
                style={{ color: '#333333' }}
                {...salt}
              />
              g
            </Cell>
          </TableRow>
        </tbody>
      </Table>
      {lang.EAN_code}
      <StyledInput
        style={{ marginBottom: 20 }}
        {...EAN}
      />
      <br />
      <NumberInput
        style={{ color: '#45941e', marginBottom: 20 }}
        {...price}
      />
      €<br />
      <Checkbox
        checked={bio}
        onChange={() => setBio(!bio)}
        label="bio"
      />
    </div>
  )
}

const TextualInformation = ({
  product,
  editMode,
  name,
  weight,
  description,
  ingredients,
  energy,
  fat,
  saturatedFat,
  carbs,
  sugar,
  fiber,
  protein,
  salt,
  EAN,
  price,
  bio,
  setBio,
  setDescription,
  setIngredients,
}) => {
  return (
    <div>
      {editMode ? (
        <EditableInformation
          name={name}
          weight={weight}
          description={description}
          ingredients={ingredients}
          setDescription={setDescription}
          setIngredients={setIngredients}
          energy={energy}
          fat={fat}
          saturatedFat={saturatedFat}
          carbs={carbs}
          sugar={sugar}
          fiber={fiber}
          protein={protein}
          salt={salt}
          EAN={EAN}
          price={price}
          bio={bio}
          setBio={setBio}
        />
      ) : (
        <StaticInformation product={product} />
      )}
    </div>
  )
}

export default TextualInformation
export { StaticInformation }
