import { useEffect, useState, useContext } from 'react'
import UserContext from '../../contexts/userContext'
import { useParams, useNavigate } from 'react-router-dom'
import cartService from '../../services/cart'
import styled from 'styled-components'
import {
  NumberInput,
  Button,
  FullWidthButton,
  HalfWidth,
  Row,
  FullWidthCancelButton,
  ProductImage,
  WrappableRow,
} from '../styled/base'
import productService from '../../services/product'
import TextualInformation from './TextualInformation'
import useField from '../../hooks/useField'
import { useSelector } from 'react-redux'

const Product = () => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
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
    if (window.confirm(lang.confirm_delete)) {
      productService.deleteProduct(id).then(navigate('/'))
    }
  }

  const updateProduct = () => {
    if (window.confirm(lang.confirm_save_changes)) {
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
                    {lang.save_changes}
                  </FullWidthButton>
                </HalfWidth>
                <HalfWidth>
                  <FullWidthCancelButton onClick={discardChanges}>
                    {lang.discard_changes}
                  </FullWidthCancelButton>
                </HalfWidth>
              </Row>
            ) : (
              <Row>
                <HalfWidth>
                  <FullWidthButton onClick={() => setEditMode(true)}>
                    {lang.edit_product}
                  </FullWidthButton>
                </HalfWidth>
                <HalfWidth>
                  <FullWidthCancelButton onClick={deleteProduct}>
                    {lang.delete_product}
                  </FullWidthCancelButton>
                </HalfWidth>
              </Row>
            )}
          </>
        )}
        <WrappableRow>
          <ProductImage src={product.image} />
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
            <Button onClick={addToCart}>{lang.add_to_cart}</Button>

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
        </WrappableRow>
      </>
    )
}

export default Product
