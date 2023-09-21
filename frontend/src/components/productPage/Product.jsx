import { useEffect, useState, useContext } from 'react'
import UserContext from '../../contexts/userContext'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import cartService from '../../services/cart'
import styled from 'styled-components'
import {
  NumberInput,
  Button,
  FullWidthButton,
  HalfWidth,
  Row,
  FullWidthCancelButton,
} from '../styled/base'
import productService from '../../services/product'
import TextualInformation from './TextualInformation'
import useField from '../../hooks/useField'

const Image = styled.img`
  width: 500px;
  height: 500px;
  object-fit: contain;
  /* transform: scale(0.8); */
`

const Product = () => {
  const [editMode, setEditMode] = useState(false)

  const navigate = useNavigate()

  const [user, setUser] = useContext(UserContext)

  const [quantity, setQuantity] = useState(1)

  const [product, setProduct] = useState({
    name: '',
    description: '',
    ingredients: '',
    weight: 0,
    price: 0,
    EAN: '',
    image: '',
    bio: false,
  })

  const [description, setDescription] = useState(product.description)
  const [ingredients, setIngredients] = useState(product.ingredients)

  const [bio, setBio] = useState(product.bio)

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

  const id = useParams().id

  useEffect(() => {
    productService.getById(id).then((p) => {
      console.log(p)
      setProduct(p)
      setFields(p)
    })
  }, [])

  const setFields = (p) => {
    setIngredients(p.ingredients)
    setDescription(p.description)
    setBio(p.bio)
    name.changeValue(p.name)
    weight.changeValue(p.weight)
    price.changeValue(p.price)
    if (p.nutrition) {
      energy.changeValue(p.nutrition.energy)
      fat.changeValue(p.nutrition.fat)
      saturatedFat.changeValue(p.nutrition.saturatedFat)
      carbs.changeValue(p.nutrition.carbs)
      sugar.changeValue(p.nutrition.sugar)
      fiber.changeValue(p.nutrition.fiber)
      protein.changeValue(p.nutrition.protein)
      salt.changeValue(p.nutrition.salt)
    }
    EAN.changeValue(p.EAN)
  }

  const addToCart = () => {
    cartService.addToCart({ quantity, product })
  }

  const deleteProduct = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      productService.deleteProduct(id).then(navigate('/'))
    }
  }

  const updateProduct = () => {
    if (window.confirm('Are you sure you want to save these changes?')) {
      productService
        .update(id, {
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
          // image: image.value,
          description,
          ingredients,
          bio,
        })
        .then((p) => {
          setProduct(p)
          setFields(p)
          setEditMode(false)
        })
    }
  }

  const discardChanges = () => {
    setFields(product)
    setEditMode(false)
  }

  if (product)
    return (
      <>
        {user && user.admin && (
          <>
            {editMode ? (
              <Row>
                <HalfWidth>
                  <FullWidthButton onClick={updateProduct}>
                    Save changes
                  </FullWidthButton>
                </HalfWidth>
                <HalfWidth>
                  <FullWidthCancelButton onClick={discardChanges}>
                    Discard changes
                  </FullWidthCancelButton>
                </HalfWidth>
              </Row>
            ) : (
              <Row>
                <HalfWidth>
                  <FullWidthButton onClick={() => setEditMode(true)}>
                    Edit product
                  </FullWidthButton>
                </HalfWidth>
                <HalfWidth>
                  <FullWidthCancelButton onClick={deleteProduct}>
                    Delete product
                  </FullWidthCancelButton>
                </HalfWidth>
              </Row>
            )}
          </>
        )}
        <div style={{ display: 'flex' }}>
          <div>
            <Image
              src={product.image}
              // width="500px"
              // height="500px"
            />
          </div>
          <div>
            <TextualInformation
              product={product}
              editMode={editMode}
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
            <NumberInput
              style={{ marginRight: 20 }}
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              type="number"
            />
            <Button onClick={addToCart}>Add to cart</Button>

            {product.bio && (
              <div style={{ paddingTop: 30 }}>
                <img
                  src="http://www.maiznica.lv/wp-content/uploads/2019/04/eurobio.jpg"
                  width={100}
                  height={66}
                />
              </div>
            )}
          </div>
        </div>
      </>
    )
}

export default Product
