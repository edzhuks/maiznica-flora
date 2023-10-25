import styled from 'styled-components'
import { addVat, centsToEuro, gramsToKilos } from '../../util/convert'
import { useSelector } from 'react-redux'
import {
  NumberInput,
  Button,
  BigProductTitle,
  ProductText,
  NutritionTable,
  NutritionTableRow,
  NutritionTableHeader,
  NutritionTableCell,
  Badges,
} from '../styled/base'
import { Barcode } from '@styled-icons/icomoon/Barcode'
import Price from '../styled/Price'

const ShadowDiv = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  width: fit-content;
  button {
    box-shadow: none;
  }
  margin: 30px 0px 40px 0px;
`

const CertImg = styled.img`
  width: auto;
  height: 70px;
  margin: 0px 20px 0px 0px;
`
const StaticInformation = ({ product, quantity, setQuantity, onOrder }) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div style={{ maxWidth: '800px' }}>
      <BigProductTitle>
        {product.name[selectedLang] || product.name.lv} &nbsp;
        {gramsToKilos(product.weight)}
      </BigProductTitle>
      {product.badges && product.badges.length > 0 && (
        <Badges>
          {product.badges.map((b) => (
            <span key={b}>{lang[b]}</span>
          ))}
        </Badges>
      )}
      {!product.outOfStock ? (
        <>
          <Price
            price={product.price}
            discount={product.discount}
            weight={product.weight}
          />
          <ShadowDiv>
            <NumberInput
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              type="number"
            />
            <Button onClick={onOrder}>{lang.add_to_cart}</Button>
          </ShadowDiv>
        </>
      ) : (
        <p></p>
      )}

      {product.bio && (
        <CertImg
          src="http://www.maiznica.lv/wp-content/uploads/2019/04/eurobio.jpg"
          width={100}
          height={66}
        />
      )}
      {product.spoonRed && (
        <CertImg
          src="http://karotite.lv/img/bordo-intro-logo.png"
          width={100}
          height={66}
        />
      )}
      {product.spoonGreen && (
        <CertImg
          src="http://karotite.lv/img/green-intro-logo.png"
          width={100}
          height={66}
        />
      )}
      {product.expiration && (
        <>
          <ProductText>
            {lang.expiration_time}{' '}
            <strong>
              {product.expiration.number} {lang[product.expiration.word]}
            </strong>
          </ProductText>
          {product.expiration.afterOpening && (
            <ProductText style={{ marginTop: '-20px' }}>
              {lang.after_opening}{' '}
              <strong>
                {product.expiration.afterOpening.number}{' '}
                {lang[product.expiration.afterOpening.word]}
              </strong>
            </ProductText>
          )}
        </>
      )}
      {/* {product.description && (
        <Text>
          {product.description[selectedLang] || product.description.lv}
        </Text>
      )} */}
      {product.ingredients && (
        <ProductText>
          {product.ingredients[selectedLang] || product.ingredients.lv}
        </ProductText>
      )}
      {product.nutrition && (
        <NutritionTable>
          <tbody>
            <NutritionTableRow>
              <NutritionTableHeader>
                <b>{lang.nutritional_info} </b>
              </NutritionTableHeader>
              <NutritionTableHeader>
                <strong>{lang.g_contains}</strong>
              </NutritionTableHeader>
            </NutritionTableRow>
            <NutritionTableRow>
              <NutritionTableCell>{lang.energy_content}</NutritionTableCell>
              <NutritionTableCell>
                {Math.round(product.nutrition.energy * 4.184)}kJ/
                {product.nutrition.energy}kcal
              </NutritionTableCell>
            </NutritionTableRow>
            <NutritionTableRow>
              <NutritionTableCell>{lang.fat}</NutritionTableCell>
              <NutritionTableCell>{product.nutrition.fat}g</NutritionTableCell>
            </NutritionTableRow>
            <NutritionTableRow>
              <NutritionTableCell>
                &nbsp;&nbsp;&nbsp; {lang.of_which_saturated_fat}
              </NutritionTableCell>
              <NutritionTableCell>
                {product.nutrition.saturatedFat}g
              </NutritionTableCell>
            </NutritionTableRow>

            <NutritionTableRow>
              <NutritionTableCell>{lang.carbohydrates}</NutritionTableCell>
              <NutritionTableCell>
                {product.nutrition.carbs}g
              </NutritionTableCell>
            </NutritionTableRow>
            <NutritionTableRow>
              <NutritionTableCell>
                &nbsp;&nbsp;&nbsp; {lang.of_which_sugars}
              </NutritionTableCell>
              <NutritionTableCell>
                {product.nutrition.sugar}g
              </NutritionTableCell>
            </NutritionTableRow>
            {product.nutrition.fiber !== 0 &&
              product.nutrition.fiber !== '0' &&
              product.nutrition.fiber && (
                <NutritionTableRow>
                  <NutritionTableCell>{lang.fiber}</NutritionTableCell>
                  <NutritionTableCell>
                    {product.nutrition.fiber}g
                  </NutritionTableCell>
                </NutritionTableRow>
              )}
            <NutritionTableRow>
              <NutritionTableCell>{lang.protein}</NutritionTableCell>
              <NutritionTableCell>
                {product.nutrition.protein}g
              </NutritionTableCell>
            </NutritionTableRow>
            <NutritionTableRow>
              <NutritionTableCell>{lang.salt}</NutritionTableCell>
              <NutritionTableCell>{product.nutrition.salt}g</NutritionTableCell>
            </NutritionTableRow>
            {product.nutrition.d3 !== 0 &&
              product.nutrition.d3 !== '0' &&
              product.nutrition.d3 && (
                <NutritionTableRow>
                  <NutritionTableCell>{lang.d3}</NutritionTableCell>
                  <NutritionTableCell>
                    {product.nutrition.d3}µg
                  </NutritionTableCell>
                </NutritionTableRow>
              )}
          </tbody>
        </NutritionTable>
      )}
      {product.EAN && (
        <ProductText>
          <Barcode
            size={30}
            style={{ marginRight: '10px' }}
          />
          {product.EAN}
        </ProductText>
      )}
    </div>
  )
}

export default StaticInformation
