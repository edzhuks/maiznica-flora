import productService from '../../services/product'
import useField from '../../hooks/useField'
import { useState } from 'react'
import {
  WideNumberInput,
  StyledInput,
  CompactInputGroup,
  Label,
  TextArea,
  Form,
} from '../styled/base'
import Checkbox from '../basic/Checkbox'

const NewProductFrom = () => {
  const name = useField('text')
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
  const image = useField('url')

  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')

  const [bio, setBio] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault()
    productService.create({
      name: name.value,
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
      image: image.value,
      description,
      ingredients,
      bio,
    })
    name.clear()
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
    image.clear()
    setDescription('')
    setIngredients('')
    setBio(false)
  }

  return (
    <div>
      <h1>Add a new product</h1>
      <Form onSubmit={onSubmit}>
        <CompactInputGroup>
          <Label>
            name
            <StyledInput {...name} />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            description
            <TextArea
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            ingredients
            <TextArea
              rows={4}
              value={ingredients}
              onChange={(event) => setIngredients(event.target.value)}
            />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            weight (grams)
            <WideNumberInput {...weight} />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            price (€ x.xx)
            <WideNumberInput {...price} />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            energy (kcal)
            <WideNumberInput {...energy} />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            fat (grams)
            <WideNumberInput {...fat} />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            saturated fat (grams)
            <WideNumberInput {...saturatedFat} />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            carbs (grams)
            <WideNumberInput {...carbs} />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            sugar (grams)
            <WideNumberInput {...sugar} />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            fiber (grams)
            <WideNumberInput {...fiber} />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            protein (grams)
            <WideNumberInput {...protein} />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            salt (grams)
            <WideNumberInput {...salt} />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            EAN
            <StyledInput {...EAN} />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            image url
            <StyledInput {...image} />
          </Label>
        </CompactInputGroup>

        <Checkbox
          checked={bio}
          onChange={() => setBio(!bio)}
          label="bio"
        />
        <button type="submit">Add</button>
      </Form>
    </div>
  )
}

export default NewProductFrom
