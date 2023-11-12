import useField from '../../hooks/useField'
import { useEffect, useState } from 'react'
import {
  ShadowInput,
  TextArea,
  NumberInput,
  Row,
  Button,
  ProductImage,
  WrappableRow,
  Label,
  BigProductTitle,
  ProductText,
  NutritionTable,
  NutritionTableRow,
  NutritionTableHeader,
  NutritionTableCell,
  Toggle,
  ShadowTextArea,
} from '../styled/base'
import Checkbox from '../basic/Checkbox'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import StaticInformation from '../productPage/TextualInformation'
import { Form, useParams } from 'react-router-dom'
import useProductService from '../../services/product'
import { BoxArrowLeft } from '@styled-icons/bootstrap/BoxArrowLeft'
import { BoxArrowRight } from '@styled-icons/bootstrap/BoxArrowRight'
import useToast from '../../util/promiseToast'
import { Badges } from '../styled/base'
import { gramsToKilos } from '../../util/convert'
import Select from 'react-select'
import { backendURL } from '../../util/config'
import useUploadService from '../../services/uploads'

const NameInput = styled(ShadowInput)`
  color: ${(props) => props.theme.main};
  width: 300px;
  margin: 5px 0px;
`

const GreenNumberInput = styled(NumberInput)`
  color: ${(props) => props.theme.main};
  width: 100px;
  margin: 5px;
  box-shadow: ${(props) => props.theme.shadow};
`

const ProductTextArea = styled(ShadowTextArea)`
  width: 420px;
  font-size: small;
  margin: 5px 0px;
`

const EditableBadges = styled(Badges)`
  max-width: 450px;
`

const EditTab = styled.div`
  position: absolute;
  left: ${(props) => (props.editTabOpen ? '00px' : '-485px')};
  background: #ffffffaa;

  box-shadow: ${(props) => props.theme.shadow};
  padding: 30px;
  transition: 0.5s;
`

const EditTabButton = styled(Button)`
  position: absolute;
  right: -50px;
  width: 50px;
  height: 50px;
  top: -0px;
`

const BadgeButton = styled.button`
  color: ${(props) => (props.selected ? props.theme.white : props.theme.main)};
  padding: 5px 15px;
  background-color: ${(props) =>
    props.selected ? props.theme.main : props.theme.white};
  border-radius: 20px;
  box-shadow: ${(props) => props.theme.shadow};
  border: 0;
  font-size: 16px;
`

const ShortLabel = styled(Label)`
  line-height: normal;
`

const NewProductFrom = () => {
  const productService = useProductService()
  const uploadService = useUploadService()
  const productId = useParams().productId
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const allLang = useSelector((state) => state.lang)
  const name_lv = useField('text')
  const name_en = useField('text')
  const name_de = useField('text')
  const weight = useField('number')
  const price = useField('number')
  const bulkPrice = useField('number')
  const bulkThreshold = useField('number')
  const energy = useField('number')
  const fat = useField('number')
  const saturatedFat = useField('number')
  const carbs = useField('number')
  const sugar = useField('number')
  const fiber = useField('number')
  const protein = useField('number')
  const salt = useField('number')
  const d3 = useField('number')
  const expiryTime = useField('number')
  const expiryTimeAfter = useField('number')
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
  const [badges, setBadges] = useState([])
  const [bio, setBio] = useState(false)
  const [spoonGreen, setSpoonGreen] = useState(false)
  const [expiryTimeDays, setExpiryTimeDays] = useState(true)
  const [expiryTimeDaysAfter, setExpiryTimeDaysAfter] = useState(true)
  const [spoonRed, setSpoonRed] = useState(false)
  const [addToAll, setAddToAll] = useState(false)
  const [addToNew, setAddToNew] = useState(false)

  const [editTabOpen, setEditTabOpen] = useState(true)

  const { showPromiseToast } = useToast()
  const selectedLang = useSelector((state) => state.lang.selectedLang)

  const [allProducts, setAllProducts] = useState([])
  const [selectedProductIds, setSelectedProductIds] = useState([])

  useEffect(() => {
    productService.getAll().then((result) => {
      setAllProducts(
        result
          .filter((p) => p.id !== productId)
          .map((product) => ({
            value: product.id,
            label: `${
              product.name[selectedLang] || product.name.lv
            } ${gramsToKilos(product.weight)}`,
          }))
      )

      if (productId) {
        console.log('blerp')
        const product = result.find((p) => p.id === productId)
        name_lv.changeValue(product.name.lv)
        name_en.changeValue(product.name.en)
        name_de.changeValue(product.name.de)
        setDescription_lv(product.description.lv)
        setDescription_en(product.description.en)
        setDescription_de(product.description.de)
        setIngredients_lv(product.ingredients.lv)
        setIngredients_en(product.ingredients.en)
        setIngredients_de(product.ingredients.de)
        weight.changeValue(product.weight)
        price.changeValue(product.price)
        EAN.changeValue(product.EAN)
        bulkPrice.changeValue(product.bulkPrice)
        bulkThreshold.changeValue(product.bulkThreshold)
        if (product.nutrition) {
          energy.changeValue(product.nutrition.energy)
          fat.changeValue(product.nutrition.fat)
          saturatedFat.changeValue(product.nutrition.saturatedFat)
          carbs.changeValue(product.nutrition.carbs)
          sugar.changeValue(product.nutrition.sugar)
          fiber.changeValue(product.nutrition.fiber)
          protein.changeValue(product.nutrition.protein)
          salt.changeValue(product.nutrition.salt)
          d3.changeValue(product.nutrition.d3)
        }
        setBadges(product.badges ? product.badges : [])
        setImage(product.image)
        setBio(product.bio)
        setSpoonGreen(product.spoonGreen)
        setSpoonRed(product.spoonRed)
        if (product.expiration) {
          setExpiryTimeDays(product.expiration.word === 'days')
          expiryTime.changeValue(product.expiration.number)
          if (product.expiration.afterOpening) {
            expiryTimeAfter.changeValue(product.expiration.afterOpening.number)
            setExpiryTimeDaysAfter(
              product.expiration.afterOpening.word === 'days'
            )
          }
        }
        if (product.relatedProducts && product.relatedProducts.length > 0) {
          setSelectedProductIds(
            product.relatedProducts.map((product) => ({
              value: product.id,
              label: `${
                product.name[selectedLang] || product.name.lv
              } ${gramsToKilos(product.weight)}`,
            }))
          )
        }
      }
    })
  }, [productId])

  const formProduct = () => {
    return {
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
        d3.value ||
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
              d3: d3.value,
            }
          : null,
      price: price.value,
      bulkPrice: bulkPrice.value,
      bulkThreshold: bulkThreshold.value,
      EAN: EAN.value,
      bio,
      spoonGreen,
      spoonRed,
      weight: weight.value,
      badges,
      expiration: expiryTime.value && {
        number: expiryTime.value,
        word: expiryTimeDays ? 'days' : 'months',
        afterOpening: expiryTimeAfter.value
          ? {
              number: expiryTimeAfter.value,
              word: expiryTimeDaysAfter ? 'days' : 'months',
            }
          : undefined,
      },
      relatedProducts: selectedProductIds.map((p) => p.value),
      image,
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const product = formProduct()
    if (productId) {
      const promise = productService.update(productId, product)
      showPromiseToast({ promise, successMessage: lang.toast_changes_saved })
    } else {
      const promise = productService.create({
        product,
        addToAll,
        addToNew,
      })
      showPromiseToast({ promise, successMessage: lang.toast_product_created })
      promise.then((reponse) => {
        name_lv.clear()
        name_en.clear()
        name_de.clear()
        weight.clear()
        price.clear()
        bulkPrice.clear()
        bulkThreshold.clear()
        energy.clear()
        fat.clear()
        saturatedFat.clear()
        carbs.clear()
        sugar.clear()
        fiber.clear()
        protein.clear()
        salt.clear()
        d3.clear()
        expiryTime.clear()
        expiryTimeAfter.clear()
        setExpiryTimeDays(true)
        setExpiryTimeDaysAfter(true)
        setSpoonGreen(false)
        setSpoonRed(false)
        EAN.clear()
        setImage(
          'https://shop.mrpinball.com.au/wp-content/uploads/woocommerce-placeholder-510x510.png'
        )
        setDescription_lv('')
        setDescription_en('')
        setDescription_de('')
        setIngredients_lv('')
        setIngredients_en('')
        setIngredients_de('')
        setBio(false)
        setAddToAll(false)
        setAddToNew(false)
        setSelectedProductIds([])
      })
    }
  }

  const imageSelected = (event) => {
    event.preventDefault()
    const formData = new FormData()
    const blob = event.target.files[0]
    const noDiacritics = new File(
      [blob],
      blob.name
        .replace('ā', 'a')
        .replace('č', 'c')
        .replace('ē', 'e')
        .replace('ģ', 'g')
        .replace('ļ', 'l')
        .replace('ķ', 'k')
        .replace('ī', 'i')
        .replace('ņ', 'n')
        .replace('š', 's')
        .replace('ū', 'u')
        .replace('ž', 'z')
        .replace('ŗ', 'r')
        .replace('Ā', 'A')
        .replace('Č', 'C')
        .replace('Ē', 'E')
        .replace('Ģ', 'G')
        .replace('Ļ', 'L')
        .replace('Ķ', 'K')
        .replace('Ī', 'I')
        .replace('Ņ', 'N')
        .replace('Š', 'S')
        .replace('Ū', 'U')
        .replace('Ž', 'Z')
        .replace('Ŗ', 'R'),
      {
        type: blob.type,
      }
    )
    formData.append('image', noDiacritics)
    uploadService.uploadImage(formData).then((response) => {
      setImage(`${response.data.path}`)
    })
  }

  const badgeClicked = (name) => {
    if (badges.find((b) => b === name)) {
      setBadges(badges.filter((b) => b !== name))
    } else {
      setBadges(badges.concat(name))
    }
  }

  return (
    <div
      style={{
        marginTop: '20px',
        flexWrap: 'wrap',
        position: 'relative',
        minHeight: '2500px',
      }}>
      <EditTab editTabOpen={editTabOpen}>
        <EditTabButton>
          {editTabOpen ? (
            <BoxArrowLeft
              onClick={(e) => {
                e.preventDefault()
                setEditTabOpen(false)
              }}
            />
          ) : (
            <BoxArrowRight
              onClick={(e) => {
                e.preventDefault()
                setEditTabOpen(true)
              }}
            />
          )}
        </EditTabButton>
        <Row>
          <div>
            <NameInput {...name_lv} />
            <br />
            <NameInput {...name_en} />
            <br />
            <NameInput {...name_de} />
          </div>
          <GreenNumberInput {...weight} />
          <BigProductTitle>g</BigProductTitle>
        </Row>
        <EditableBadges>
          <BadgeButton
            selected={badges.find((b) => b === 'vegan')}
            onClick={() => badgeClicked('vegan')}>
            {lang.vegan}
          </BadgeButton>
          <BadgeButton
            selected={badges.find((b) => b === 'high_protein')}
            onClick={() => badgeClicked('high_protein')}>
            {lang.high_protein}
          </BadgeButton>
          <BadgeButton
            selected={badges.find((b) => b === 'high_fiber')}
            onClick={() => badgeClicked('high_fiber')}>
            {lang.high_fiber}
          </BadgeButton>
          <BadgeButton
            selected={badges.find((b) => b === 'handmade')}
            onClick={() => badgeClicked('handmade')}>
            {lang.handmade}
          </BadgeButton>
          <BadgeButton
            selected={badges.find((b) => b === 'no_added_yeast')}
            onClick={() => badgeClicked('no_added_yeast')}>
            {lang.no_added_yeast}
          </BadgeButton>
          <BadgeButton
            selected={badges.find((b) => b === 'no_conservants')}
            onClick={() => badgeClicked('no_conservants')}>
            {lang.no_conservants}
          </BadgeButton>
          <BadgeButton
            selected={badges.find((b) => b === 'vitamin_d')}
            onClick={() => badgeClicked('vitamin_d')}>
            {lang.vitamin_d}
          </BadgeButton>
          <BadgeButton
            selected={badges.find((b) => b === 'iodine')}
            onClick={() => badgeClicked('iodine')}>
            {lang.iodine}
          </BadgeButton>
        </EditableBadges>
        <GreenNumberInput {...price} />
        {`${lang.in_cents} ${lang.with_VAT}`}
        <br />
        {lang.when_buying}
        <GreenNumberInput {...bulkThreshold} />
        ,
        <GreenNumberInput {...bulkPrice} />
        {`${lang.in_cents} ${lang.with_VAT}`}
        <br />
        <Checkbox
          checked={bio}
          onChange={() => setBio(!bio)}
          label="BIO"
        />
        <Checkbox
          checked={spoonRed}
          onChange={() => setSpoonRed(!spoonRed)}
          label="Sarkanā karotīte"
        />
        <Checkbox
          checked={spoonGreen}
          onChange={() => setSpoonGreen(!spoonGreen)}
          label="Zaļā karotīte"
        />
        <Label>
          {lang.expiration_time}
          <GreenNumberInput {...expiryTime} />
          <Toggle
            onClick={() => setExpiryTimeDays(!expiryTimeDays)}
            true={expiryTimeDays}>
            <span>{lang.days}</span>
            <span>{lang.months}</span>
          </Toggle>
        </Label>
        <Label>
          {lang.after_opening}
          <GreenNumberInput {...expiryTimeAfter} />
          <Toggle
            onClick={() => setExpiryTimeDaysAfter(!expiryTimeDaysAfter)}
            true={expiryTimeDaysAfter}>
            <span>{lang.days}</span>
            <span>{lang.months}</span>
          </Toggle>
        </Label>
        <ShortLabel>{allLang.lv.description}</ShortLabel>
        <ProductTextArea
          rows={12}
          value={description_lv}
          onChange={(event) => setDescription_lv(event.target.value)}
        />
        {/* <Text>{allLang.en.description}</Text>
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
        /> */}
        <ShortLabel>{allLang.lv.ingredients}</ShortLabel>
        <ProductTextArea
          rows={4}
          value={ingredients_lv}
          onChange={(event) => setIngredients_lv(event.target.value)}
        />
        <ShortLabel>{allLang.en.ingredients}</ShortLabel>
        <ProductTextArea
          rows={4}
          value={ingredients_en}
          onChange={(event) => setIngredients_en(event.target.value)}
        />
        <ShortLabel>{allLang.de.ingredients}</ShortLabel>
        <ProductTextArea
          rows={4}
          value={ingredients_de}
          onChange={(event) => setIngredients_de(event.target.value)}
        />
        <NutritionTable style={{ marginBottom: '20px', marginTop: '20px' }}>
          <tbody>
            <NutritionTableRow>
              <NutritionTableHeader>
                <b>{lang.nutritional_info}</b>
              </NutritionTableHeader>
              <NutritionTableHeader>
                <strong>{lang.g_contains}</strong>
              </NutritionTableHeader>
            </NutritionTableRow>
            <NutritionTableRow>
              <NutritionTableCell>{lang.energy_content}</NutritionTableCell>
              <NutritionTableCell>
                <NumberInput
                  {...energy}
                  $isonlightbackground
                />
                kcal
              </NutritionTableCell>
            </NutritionTableRow>
            <NutritionTableRow>
              <NutritionTableCell>{lang.fat}</NutritionTableCell>
              <NutritionTableCell>
                <NumberInput {...fat} />g
              </NutritionTableCell>
            </NutritionTableRow>
            <NutritionTableRow>
              <NutritionTableCell>
                &nbsp;&nbsp;&nbsp; {lang.of_which_saturated_fat}
              </NutritionTableCell>
              <NutritionTableCell>
                <NumberInput
                  $isonlightbackground
                  {...saturatedFat}
                />
                g
              </NutritionTableCell>
            </NutritionTableRow>

            <NutritionTableRow>
              <NutritionTableCell>{lang.carbohydrates}</NutritionTableCell>
              <NutritionTableCell>
                <NumberInput {...carbs} />g
              </NutritionTableCell>
            </NutritionTableRow>
            <NutritionTableRow>
              <NutritionTableCell>
                &nbsp;&nbsp;&nbsp; {lang.of_which_sugars}
              </NutritionTableCell>
              <NutritionTableCell>
                <NumberInput
                  $isonlightbackground
                  {...sugar}
                />
                g
              </NutritionTableCell>
            </NutritionTableRow>
            <NutritionTableRow>
              <NutritionTableCell>{lang.fiber}</NutritionTableCell>
              <NutritionTableCell>
                <NumberInput {...fiber} />g
              </NutritionTableCell>
            </NutritionTableRow>
            <NutritionTableRow>
              <NutritionTableCell>{lang.protein}</NutritionTableCell>
              <NutritionTableCell>
                <NumberInput
                  $isonlightbackground
                  {...protein}
                />
                g
              </NutritionTableCell>
            </NutritionTableRow>
            <NutritionTableRow>
              <NutritionTableCell>{lang.salt}</NutritionTableCell>
              <NutritionTableCell>
                <NumberInput {...salt} />g
              </NutritionTableCell>
            </NutritionTableRow>
            <NutritionTableRow>
              <NutritionTableCell>{lang.d3}</NutritionTableCell>
              <NutritionTableCell>
                <NumberInput
                  $isonlightbackground
                  {...d3}
                />
                µg
              </NutritionTableCell>
            </NutritionTableRow>
          </tbody>
        </NutritionTable>
        {lang.EAN_code}
        <ShadowInput
          style={{ marginBottom: 20, marginLeft: '20px' }}
          {...EAN}
        />
        <br />
        {lang.related_products}
        <div style={{ maxWidth: '420px' }}>
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={allProducts}
            onChange={(e) => setSelectedProductIds(e ? e : [])}
            value={selectedProductIds}
          />
        </div>
        {!productId && (
          <div>
            <Checkbox
              checked={addToAll}
              onChange={() => setAddToAll(!addToAll)}
              label={lang.add_to_all}
            />
            <Checkbox
              checked={addToNew}
              onChange={() => setAddToNew(!addToNew)}
              label={lang.add_to_new}
            />
          </div>
        )}
      </EditTab>
      <WrappableRow style={{ justifyContent: 'end' }}>
        <form>
          <ProductImage src={`/images/${image}`} />
          <br />
          <input
            filename={image}
            onChange={(e) => imageSelected(e)}
            type="file"
            accept="image/*"
          />
          <br />
          {image}
        </form>

        <div>
          <StaticInformation product={formProduct()} />
          <Button onClick={onSubmit}>
            {productId ? lang.save : lang.create}
          </Button>
        </div>
      </WrappableRow>
    </div>
  )
}

export default NewProductFrom
