import { useEffect } from 'react'
import {
  ModalContainer,
  ModalContent,
  ModalHalf,
  ModalOr,
  Row,
  BigTitle,
  SubTitle,
  Form,
  CompactInputGroup,
  Label,
  StyledInput,
  CancelButton,
  Button,
  WideNumberInput,
  TextArea,
} from '../styled/base'
import Select from 'react-select'
import { useState } from 'react'
import productService from '../../services/product'
import categoryService from '../../services/category'
import useField from '../../hooks/useField'
import Checkbox from '../basic/Checkbox'

const ProductModal = ({ visible, activeCategory, onClose, catalogue }) => {
  const [allProducts, setAllProducts] = useState([])
  const [selectedProductIds, setSelectedProductIds] = useState([])

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
  const [addToAll, setAddToAll] = useState(true)
  const [addToNew, setAddToNew] = useState(true)

  useEffect(() => {
    productService.getAll().then((result) => {
      setAllProducts(
        result.map((product) => ({
          value: product.id,
          label: product.name,
        }))
      )
    })
  }, [])

  const clear = () => {
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
    setSelectedProductIds([])
  }

  const addProducts = () => {
    if (selectedProductIds.length) {
      categoryService
        .addProducts({
          productsToAdd: selectedProductIds,
          parentCategory: activeCategory.id,
        })
        .then((newCatalogue) => {
          clear()
          onClose(newCatalogue)
        })
    } else {
      productService
        .create({
          product: {
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
          },
          parentCategory: activeCategory.id,
          addToAll,
          addToNew,
        })
        .then((newCatalogue) => {
          clear()
          onClose(newCatalogue)
        })
    }
  }

  return (
    <ModalContainer style={{ display: visible ? 'block' : 'none' }}>
      <ModalContent>
        <BigTitle style={{ marginBottom: 15 }}>Add Product</BigTitle>
        <Row>
          <ModalHalf>
            <SubTitle>Select existing products</SubTitle>
            <Select
              isMulti
              options={allProducts}
              onChange={(e) =>
                setSelectedProductIds(e ? e.map((x) => x.value) : [])
              }
              value={allProducts.filter((item) =>
                selectedProductIds.includes(item.value)
              )}
            />
          </ModalHalf>
          <ModalOr>OR</ModalOr>
          <ModalHalf>
            <SubTitle>Add a new product</SubTitle>
            <Form>
              <CompactInputGroup>
                <Label>
                  name
                  <StyledInput
                    {...name}
                    style={{ width: '420px', float: 'left', marginLeft: 0 }}
                  />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  description
                  <TextArea
                    rows={8}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  ingredients
                  <TextArea
                    rows={6}
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
              <Checkbox
                checked={addToAll}
                onChange={() => setAddToAll(!addToAll)}
                label="Add to category 'all'"
              />
              <Checkbox
                checked={addToNew}
                onChange={() => setAddToNew(!setAddToNew)}
                label="Add to category 'new'"
              />
            </Form>
          </ModalHalf>
        </Row>
        <CancelButton
          onClick={() => {
            clear()
            onClose(catalogue)
          }}
          style={{ margin: 20 }}>
          Cancel
        </CancelButton>
        <Button
          style={{ margin: 20, float: 'right' }}
          onClick={addProducts}>
          Add
        </Button>
      </ModalContent>
    </ModalContainer>
  )
}

export default ProductModal
