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
import { useSelector } from 'react-redux'

const ProductModal = ({ visible, activeCategory, onClose, catalogue }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
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
        <BigTitle style={{ marginBottom: 15 }}>{lang.add_product}</BigTitle>
        <Row>
          <ModalHalf>
            <SubTitle>{lang.select_existing_products}</SubTitle>
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
          <ModalOr>{lang.or}</ModalOr>
          <ModalHalf>
            <SubTitle>{lang.add_new_product}</SubTitle>
            <Form>
              <CompactInputGroup>
                <Label>
                  {lang.product_name}
                  <StyledInput
                    {...name}
                    style={{ width: '420px', float: 'left', marginLeft: 0 }}
                  />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.description}
                  <TextArea
                    rows={8}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.ingredients}
                  <TextArea
                    rows={6}
                    value={ingredients}
                    onChange={(event) => setIngredients(event.target.value)}
                  />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.weight} ({lang.in_grams})
                  <WideNumberInput {...weight} />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.price} (€ x.xx)
                  <WideNumberInput {...price} />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.energy_content} (kcal)
                  <WideNumberInput {...energy} />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.fat} ({lang.in_grams})
                  <WideNumberInput {...fat} />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.of_which_saturated_fat} ({lang.in_grams})
                  <WideNumberInput {...saturatedFat} />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.carbohydrates} ({lang.in_grams})
                  <WideNumberInput {...carbs} />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.of_which_sugars} ({lang.in_grams})
                  <WideNumberInput {...sugar} />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.fiber} ({lang.in_grams})
                  <WideNumberInput {...fiber} />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.protein} ({lang.in_grams})
                  <WideNumberInput {...protein} />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.salt} ({lang.in_grams})
                  <WideNumberInput {...salt} />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.EAN_code}
                  <StyledInput {...EAN} />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.image_url}
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
                label={lang.add_to_all}
              />
              <Checkbox
                checked={addToNew}
                onChange={() => setAddToNew(!setAddToNew)}
                label={lang.add_to_new}
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
          {lang.cancel}
        </CancelButton>
        <Button
          style={{ margin: 20, float: 'right' }}
          onClick={addProducts}>
          {lang.add}
        </Button>
      </ModalContent>
    </ModalContainer>
  )
}

export default ProductModal
