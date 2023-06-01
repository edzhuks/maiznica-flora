import productService from '../services/product'
import useField from '../hooks/useField'
import { useState } from 'react'
import Input from './basic/Input'

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
      <form onSubmit={onSubmit}>
        <div>
          name: <Input {...name} />
        </div>
        <div>
          description:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          ingredients:
          <textarea
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
          />
        </div>
        <div>
          weight: <Input {...weight} />
        </div>
        <div>
          price: <Input {...price} />
        </div>
        <div>
          energy: <Input {...energy} />
        </div>
        <div>
          fat: <Input {...fat} />
        </div>
        <div>
          saturated fat: <Input {...saturatedFat} />
        </div>
        <div>
          carbs: <Input {...carbs} />
        </div>
        <div>
          sugar: <Input {...sugar} />
        </div>
        <div>
          fiber: <Input {...fiber} />
        </div>
        <div>
          protein: <Input {...protein} />
        </div>
        <div>
          salt: <Input {...salt} />
        </div>
        <div>
          EAN: <Input {...EAN} />
        </div>
        <div>
          image: <Input {...image} />
        </div>

        <div>
          <Input
            type="checkbox"
            checked={bio}
            onChange={() => setBio(!bio)}
          />
          bio
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default NewProductFrom
