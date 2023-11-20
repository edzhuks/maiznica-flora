import useField from '../../hooks/useField'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import StaticInformation from '../productPage/ProductInformation'
import { useParams } from 'react-router-dom'
import useProductService from '../../services/product'
import { BoxArrowLeft } from '@styled-icons/bootstrap/BoxArrowLeft'
import { BoxArrowRight } from '@styled-icons/bootstrap/BoxArrowRight'
import useToast from '../../util/promiseToast'
import { gramsToKilos, toEnglishAlphabet } from '../../util/convert'
import useUploadService from '../../services/uploads'
import Input from '../basic/Input'

const EditTab = styled.div`
  max-width: 600px;
  position: absolute;
  left: ${(props) => (props.editTabOpen ? '00px' : '-485px')};
  background: color-mix(in srgb, var(--surface) 90%, transparent);
  z-index: 2;
  box-shadow: ${(props) => props.theme.shadow};
  padding: var(--space);
  transition: 0.5s;
`

const EditTabButton = styled.button`
  position: absolute;
  right: -50px;
  width: 50px;
  height: 50px;
  top: -0px;
`

const BadgeSelection = ({
  badges,
  selectedBadges,
  setSelectedBadges,
  className,
}) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const badgeClicked = (name, selected) => {
    if (selected) {
      setSelectedBadges(selectedBadges.filter((b) => b !== name))
    } else {
      setSelectedBadges(selectedBadges.concat(name))
    }
  }
  return (
    <div className={`row ${className ? className : ''}`}>
      {badges.map((badge) => {
        const selected = selectedBadges.find((b) => b === badge)
        return (
          <button
            key={badge}
            className={`badge ${selected ? 'active' : ''}`}
            selected={selected}
            onClick={() => badgeClicked(badge, selected)}>
            {lang[badge]}
          </button>
        )
      })}
    </div>
  )
}
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
  const image = useField('image')

  const description_lv = useField('textarea')
  const description_en = useField('textarea')
  const description_de = useField('textarea')
  const ingredients_lv = useField('textarea')
  const ingredients_en = useField('textarea')
  const ingredients_de = useField('textarea')

  const [badges, setBadges] = useState([])
  const bio = useField('checkbox')
  const spoonGreen = useField('checkbox')
  const spoonRed = useField('checkbox')
  const expiryTimeDays = useField('toggle')
  const expiryTimeDaysAfter = useField('toggle')
  const addToAll = useField('checkbox')
  const addToNew = useField('checkbox')

  const [editTabOpen, setEditTabOpen] = useState(true)

  const { showPromiseToast } = useToast()
  const selectedLang = useSelector((state) => state.lang.selectedLang)

  const [allProducts, setAllProducts] = useState([])
  const relatedProducts = useField('select')

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
        description_lv.changeValue(product.description.lv)
        description_en.changeValue(product.description.en)
        description_de.changeValue(product.description.de)
        ingredients_lv.changeValue(product.ingredients.lv)
        ingredients_en.changeValue(product.ingredients.en)
        ingredients_de.changeValue(product.ingredients.de)
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
        image.changeValue(product.image)
        bio.changeValue(product.bio)
        spoonGreen.changeValue(product.spoonGreen)
        spoonRed.changeValue(product.spoonRed)
        expiryTimeDays.changeValue(true)
        expiryTimeDaysAfter.changeValue(true)
        if (product.expiration) {
          expiryTimeDays.changeValue(product.expiration.word === 'days')
          expiryTime.changeValue(product.expiration.number)
          if (product.expiration.afterOpening) {
            expiryTimeAfter.changeValue(product.expiration.afterOpening.number)
            expiryTimeDaysAfter.changeValue(
              product.expiration.afterOpening.word === 'days'
            )
          }
        }
        if (product.relatedProducts && product.relatedProducts.length > 0) {
          relatedProducts.changeValue(
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
        lv: description_lv.value,
        en: description_en.value,
        de: description_de.value,
      },
      ingredients: {
        lv: ingredients_lv.value,
        en: ingredients_en.value,
        de: ingredients_de.value,
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
      bio: bio.value,
      spoonGreen: spoonGreen.value,
      spoonRed: spoonRed.value,
      weight: weight.value,
      badges,
      expiration: expiryTime.value && {
        number: expiryTime.value,
        word: expiryTimeDays.value ? 'days' : 'months',
        afterOpening: expiryTimeAfter.value
          ? {
              number: expiryTimeAfter.value,
              word: expiryTimeDaysAfter.value ? 'days' : 'months',
            }
          : undefined,
      },
      relatedProducts: relatedProducts.value.map((p) => p.value),
      image: image.value,
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
        addToAll: addToAll.value,
        addToNew: addToNew.value,
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
        expiryTimeDays.clear()
        expiryTimeDaysAfter.clear()
        spoonGreen.clear()
        spoonRed.clear()
        EAN.clear()
        image.clear()
        description_lv.clear()
        description_en.clear()
        description_de.clear()
        ingredients_lv.clear()
        ingredients_en.clear()
        ingredients_de.clear()
        bio.clear()
        addToAll.clear()
        addToNew.clear()
        relatedProducts.clear()
      })
    }
  }

  const imageSelected = (event) => {
    event.preventDefault()
    const formData = new FormData()
    const blob = event.target.files[0]
    const noDiacritics = new File(
      [blob],
      toEnglishAlphabet(blob.name),

      {
        type: blob.type,
      }
    )
    formData.append('image', noDiacritics)
    uploadService.uploadImage(formData).then((response) => {
      image.changeValue(`${response.data.path}`)
    })
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
        <EditTabButton
          onClick={(e) => {
            e.preventDefault()
            setEditTabOpen(!editTabOpen)
          }}>
          {editTabOpen ? <BoxArrowLeft /> : <BoxArrowRight />}
        </EditTabButton>
        <div className="row align-cross-end">
          <Input
            label={lang.image}
            filename={image.value}
            onChange={(e) => imageSelected(e)}
            type="file"
            accept="image/*"
            required
          />
          <button
            className="btn"
            onClick={onSubmit}>
            {productId ? lang.save : lang.create}
          </button>
        </div>

        <Input
          width="100%"
          {...name_lv}
          label={`${lang.product_name} lv`}
          required
        />
        <Input
          width="100%"
          {...name_en}
          label={`${lang.product_name} en`}
        />
        <Input
          width="100%"
          {...name_de}
          label={`${lang.product_name} de`}
        />
        <Input
          width="250px"
          {...weight}
          required
          label={`${lang.weight} (${lang.in_grams})`}
        />
        <BadgeSelection
          className="m-t"
          badges={[
            'vegan',
            'iodine',
            'vitamin_d',
            'no_conservants',
            'no_added_yeast',
            'handmade',
            'high_fiber',
            'high_protein',
          ]}
          selectedBadges={badges}
          setSelectedBadges={setBadges}
        />

        <Input
          width="250px"
          {...price}
          label={`${lang.price} (${lang.in_cents}, ${lang.with_VAT})`}
          required
        />
        <div className="row">
          <Input
            {...bulkThreshold}
            label={lang.when_buying_x}
            width={160}
          />
          <Input
            {...bulkPrice}
            label={`${lang.price_per_one} (${lang.in_cents}, ${lang.with_VAT})`}
            width={250}
          />
        </div>

        <div className="row p-t">
          <Input
            {...bio}
            label="BIO"
          />
          <Input
            {...spoonRed}
            label="Sarkanā karotīte"
          />
          <Input
            {...spoonGreen}
            label="Zaļā karotīte"
          />
        </div>
        <div className="row align-cross-end">
          <Input
            label={lang.expiration_time}
            {...expiryTime}
          />
          <Input
            {...expiryTimeDays}
            option1={lang.days}
            option2={lang.months}
          />
        </div>
        <div className="row align-cross-end">
          <Input
            label={lang.after_opening}
            {...expiryTimeAfter}
          />
          <Input
            {...expiryTimeDaysAfter}
            option1={lang.days}
            option2={lang.months}
          />
        </div>
        <Input
          {...description_lv}
          width="100%"
          label={allLang.lv.description}
        />
        <Input
          {...description_en}
          width="100%"
          label={allLang.en.description}
        />
        <Input
          {...description_de}
          width="100%"
          label={allLang.de.description}
        />

        <Input
          width="100%"
          {...ingredients_lv}
          required
          label={allLang.lv.ingredients}
        />
        <Input
          width="100%"
          {...ingredients_en}
          label={allLang.en.ingredients}
        />
        <Input
          width="100%"
          {...ingredients_de}
          label={allLang.de.ingredients}
        />

        <table
          className="nutrition-table"
          style={{ marginBottom: '20px', marginTop: '20px' }}>
          <tbody>
            <tr>
              <th>
                <b>{lang.nutritional_info}</b>
              </th>
              <th>
                <strong>{lang.g_contains}</strong>
              </th>
            </tr>
            <tr>
              <td>{lang.energy_content}</td>
              <td>
                <Input
                  className="m-0 inline-block"
                  {...energy}
                  width={100}
                />
                <span>kcal</span>
              </td>
            </tr>
            <tr>
              <td>{lang.fat}</td>
              <td>
                <Input
                  className="m-0 inline-block"
                  width={100}
                  {...fat}
                />
                g
              </td>
            </tr>
            <tr>
              <td>&nbsp;&nbsp;&nbsp; {lang.of_which_saturated_fat}</td>
              <td>
                <Input
                  className="m-0 inline-block"
                  width={100}
                  {...saturatedFat}
                />
                g
              </td>
            </tr>
            <tr>
              <td>{lang.carbohydrates}</td>
              <td>
                <Input
                  className="m-0 inline-block"
                  width={100}
                  {...carbs}
                />
                g
              </td>
            </tr>
            <tr>
              <td>&nbsp;&nbsp;&nbsp; {lang.of_which_sugars}</td>
              <td>
                <Input
                  className="m-0 inline-block"
                  width={100}
                  {...sugar}
                />
                g
              </td>
            </tr>
            <tr>
              <td>{lang.fiber}</td>
              <td>
                <Input
                  className="m-0 inline-block"
                  width={100}
                  {...fiber}
                />
                g
              </td>
            </tr>
            <tr>
              <td>{lang.protein}</td>
              <td>
                <Input
                  className="m-0 inline-block"
                  width={100}
                  {...protein}
                />
                g
              </td>
            </tr>
            <tr>
              <td>{lang.salt}</td>
              <td>
                <Input
                  className="m-0 inline-block"
                  width={100}
                  {...salt}
                />
                g
              </td>
            </tr>
            <tr>
              <td>{lang.d3}</td>
              <td>
                <Input
                  className="m-0 inline-block"
                  width={100}
                  {...d3}
                />
                µg
              </td>
            </tr>
          </tbody>
        </table>
        <Input
          label={lang.EAN_code}
          {...EAN}
        />
        <Input
          options={allProducts}
          {...relatedProducts}
          label={lang.related_products}
          isMulti={true}
        />
        {!productId && (
          <div className="row m-t">
            <Input
              {...addToAll}
              label={lang.add_to_all}
            />
            <Input
              {...addToNew}
              label={lang.add_to_new}
            />
          </div>
        )}
      </EditTab>

      <StaticInformation product={formProduct()} />
    </div>
  )
}

export default NewProductFrom
