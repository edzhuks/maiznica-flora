import productService from '../../services/product'
import useField from '../../hooks/useField'
import { useState } from 'react'
import {
  StyledInput,
  TextArea,
  NumberInput,
  Row,
  Button,
  ProductImage,
  WrappableRow,
} from '../styled/base'
import Checkbox from '../basic/Checkbox'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { StaticInformation } from '../productPage/TextualInformation'

const Text = styled.p`
  margin: 3px 0px -5px 0px;
  font-family: 'Roboto', sans-serif;
  color: #333333;
  white-space: pre-line;
`

const Title = styled.span`
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
    border-width: 0px 0px 0px 1px;
    border-style: solid;
    border-color: #333333;
  }
`

const TableRow = styled.tr`
  background-color: f9f9f9;
  &:nth-child(odd) {
    background-color: white;
    input {
      background-color: #f0f0f0;
    }
  }
`

const ShadowInput = styled(StyledInput)`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`

const NameInput = styled(ShadowInput)`
  color: #45941e;
  width: 300px;
  margin: 5px 0px;
`

const GreenNumberInput = styled(NumberInput)`
  color: #45941e;
  width: 100px;
  margin: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`

const ProductTextArea = styled(TextArea)`
  width: 420px;
  margin: 5px 0px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`

const NewProductFrom = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const allLang = useSelector((state) => state.lang)
  const name_lv = useField('text')
  const name_en = useField('text')
  const name_de = useField('text')
  const weight = useField('number')
  const price = useField('number')
  const energy = useField('number')
  const fat = useField('number')
  const saturatedFat = useField('number')
  const carbs = useField('number')
  const sugar = useField('number')
  const fiber = useField('number')
  const protein = useField('number')
  const salt = useField('number')
  const EAN = useField('text')
  const [image, setImage] = useState(
    'https://shop.mrpinball.com.au/wp-content/uploads/woocommerce-placeholder-510x510.png'
  )

  const [description_lv, setDescription_lv] = useState('')
  const [description_en, setDescription_en] = useState('')
  const [description_de, setDescription_de] = useState('')
  const [ingredients_lv, setIngredients_lv] = useState('')
  const [ingredients_en, setIngredients_en] = useState('')
  const [ingredients_de, setIngredients_de] = useState('')

  const [bio, setBio] = useState(false)
  const [addToAll, setAddToAll] = useState(true)
  const [addToNew, setAddToNew] = useState(true)

  const onSubmit = (event) => {
    event.preventDefault()
    productService.create({
      product: {
        name: { lv: name_lv.value, en: name_en.value, de: name_de.value },
        weight: weight.value,
        price: price.value,
        nutrition:
          energy.value ||
          fat.value ||
          saturatedFat.value ||
          carbs.value ||
          sugar.value ||
          fiber.value ||
          protein.value ||
          salt.value
            ? {
                energy: energy.value,
                fat: fat.value,
                saturatedFat: saturatedFat.value,
                carbs: carbs.value,
                sugar: sugar.value,
                fiber: fiber.value,
                protein: protein.value,
                salt: salt.value,
              }
            : null,
        EAN: EAN.value,
        image: image,
        description: {
          lv: description_lv,
          en: description_en,
          de: description_de,
        },
        ingredients: {
          lv: ingredients_lv,
          en: ingredients_en,
          de: ingredients_de,
        },
        bio,
      },
      addToAll,
      addToNew,
    })
    name_lv.clear()
    name_en.clear()
    name_de.clear()
    weight.clear()
    price.clear()
    energy.clear()
    fat.clear()
    saturatedFat.clear()
    sugar.clear()
    fiber.clear()
    protein.clear()
    salt.clear()
    EAN.clear()
    setDescription_lv('')
    setDescription_en('')
    setDescription_de('')
    setIngredients_lv('')
    setIngredients_en('')
    setIngredients_de('')
    setBio(false)
    setAddToAll(false)
    setAddToNew(false)
  }

  const imageDropped = (event) => {
    event.preventDefault()
    const imageObj = event.dataTransfer.getData('text/html')
    let src = new DOMParser()
      .parseFromString(imageObj, 'text/html')
      .querySelector('img').src
    setImage(src)
  }

  return (
    <div
      style={{
        marginTop: '20px',
        flexWrap: 'wrap',
        position: 'relative',
        minHeight: '2500px',
      }}>
      <div style={{ position: 'absolute', left: '-450px' }}>
        <Row>
          <div>
            <NameInput {...name_lv} />
            <br />
            <NameInput {...name_en} />
            <br />
            <NameInput {...name_de} />
          </div>
          <GreenNumberInput {...weight} />
          <Title>g</Title>
        </Row>
        <Text>{allLang.lv.description}</Text>
        <ProductTextArea
          rows={7}
          value={description_lv}
          onChange={(event) => setDescription_lv(event.target.value)}
        />
        <Text>{allLang.en.description}</Text>
        <ProductTextArea
          rows={7}
          value={description_en}
          onChange={(event) => setDescription_en(event.target.value)}
        />
        <Text>{allLang.de.description}</Text>
        <ProductTextArea
          rows={7}
          value={description_de}
          onChange={(event) => setDescription_de(event.target.value)}
        />
        <Text>{allLang.lv.ingredients}</Text>
        <ProductTextArea
          rows={4}
          value={ingredients_lv}
          onChange={(event) => setIngredients_lv(event.target.value)}
        />
        <Text>{allLang.en.ingredients}</Text>
        <ProductTextArea
          rows={4}
          value={ingredients_en}
          onChange={(event) => setIngredients_en(event.target.value)}
        />
        <Text>{allLang.de.ingredients}</Text>
        <ProductTextArea
          rows={4}
          value={ingredients_de}
          onChange={(event) => setIngredients_de(event.target.value)}
        />
        <Table style={{ marginBottom: '20px', marginTop: '20px' }}>
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
                <NumberInput {...energy} />
                kcal
              </Cell>
            </TableRow>
            <TableRow>
              <Cell>{lang.fat}</Cell>
              <Cell>
                <NumberInput {...fat} />g
              </Cell>
            </TableRow>
            <TableRow>
              <Cell>&nbsp;&nbsp;&nbsp; {lang.of_which_saturated_fat}</Cell>
              <Cell>
                <NumberInput {...saturatedFat} />g
              </Cell>
            </TableRow>

            <TableRow>
              <Cell>{lang.carbohydrates}</Cell>
              <Cell>
                <NumberInput {...carbs} />g
              </Cell>
            </TableRow>
            <TableRow>
              <Cell>&nbsp;&nbsp;&nbsp; {lang.of_which_sugars}</Cell>
              <Cell>
                <NumberInput {...sugar} />g
              </Cell>
            </TableRow>
            <TableRow>
              <Cell>{lang.fiber}</Cell>
              <Cell>
                <NumberInput {...fiber} />g
              </Cell>
            </TableRow>
            <TableRow>
              <Cell>{lang.protein}</Cell>
              <Cell>
                <NumberInput {...protein} />g
              </Cell>
            </TableRow>
            <TableRow>
              <Cell>{lang.salt}</Cell>
              <Cell>
                <NumberInput {...salt} />g
              </Cell>
            </TableRow>
          </tbody>
        </Table>
        {lang.EAN_code}
        <ShadowInput
          style={{ marginBottom: 20, marginLeft: '20px' }}
          {...EAN}
        />
        <br />
        <GreenNumberInput {...price} />
        {lang.in_cents}
        <br />
        <Checkbox
          checked={bio}
          onChange={() => setBio(!bio)}
          label="bio"
        />
        <Checkbox
          checked={addToAll}
          onChange={() => setAddToAll(!addToAll)}
          label={lang.add_to_all}
        />
        <Checkbox
          checked={addToNew}
          onChange={() => setAddToNew(!setAddToNew)}
          label={lang.add_to_new}
        />
      </div>
      <WrappableRow style={{ width: '1350px' }}>
        <ProductImage
          onDrop={(e) => imageDropped(e)}
          src={image}
        />
        <div>
          <StaticInformation
            product={{
              name: { lv: name_lv.value, en: name_en.value, de: name_de.value },
              description: {
                lv: description_lv,
                en: description_en,
                de: description_de,
              },
              ingredients: {
                lv: ingredients_lv,
                en: ingredients_en,
                de: ingredients_de,
              },
              nutrition:
                energy.value ||
                fat.value ||
                saturatedFat.value ||
                carbs.value ||
                sugar.value ||
                fiber.value ||
                protein.value ||
                salt.value
                  ? {
                      energy: energy.value,
                      fat: fat.value,
                      saturatedFat: saturatedFat.value,
                      carbs: carbs.value,
                      sugar: sugar.value,
                      fiber: fiber.value,
                      protein: protein.value,
                      salt: salt.value,
                    }
                  : null,
              price: price.value,
              EAN: EAN.value,
              bio: bio,
              weight: weight.value,
            }}
          />
          <Button onClick={onSubmit}>{lang.create}</Button>
        </div>
      </WrappableRow>
    </div>
  )
}

export default NewProductFrom
