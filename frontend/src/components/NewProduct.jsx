import productService from '../services/product'
import useField from '../hooks/useField'
import { useState } from 'react'

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
          name: <input {...name} />
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
          weight: <input {...weight} />
        </div>
        <div>
          price: <input {...price} />
        </div>
        <div>
          energy: <input {...energy} />
        </div>
        <div>
          fat: <input {...fat} />
        </div>
        <div>
          saturated fat: <input {...saturatedFat} />
        </div>
        <div>
          carbs: <input {...carbs} />
        </div>
        <div>
          sugar: <input {...sugar} />
        </div>
        <div>
          fiber: <input {...fiber} />
        </div>
        <div>
          protein: <input {...protein} />
        </div>
        <div>
          salt: <input {...salt} />
        </div>
        <div>
          EAN: <input {...EAN} />
        </div>
        <div>
          image: <input {...image} />
        </div>

        <div>
          <input
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
