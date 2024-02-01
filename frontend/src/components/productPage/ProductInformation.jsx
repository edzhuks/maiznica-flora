import { gramsToKilos } from '../../util/convert'
import { useSelector } from 'react-redux'
import { Barcode } from '@styled-icons/icomoon/Barcode'
import Price from '../basic/Price'
import Input from '../basic/Input'
import { Warning } from '@styled-icons/ionicons-solid/Warning'
import { Helmet } from 'react-helmet'
const StaticInformation = ({
  product,
  quantity,
  setQuantity,
  onOrder,
  className,
  eis,
}) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div className={`row center ${className ? className : ''}`}>
      {product.image && (
        <Helmet>
          <title>{product.name[selectedLang] || product.name.lv}</title>
          <meta
            property="og:image"
            content={`https://www.maiznica.lv/images/xs_${product.image}`}
          />
          <meta
            property="og:image:secure_url"
            content={`https://www.maiznica.lv/images/xs_${product.image}`}
          />
          <meta
            property="og:title"
            content={product.name[selectedLang] || product.name.lv}
          />
          <meta
            property="og:type"
            content="website"
          />
          <meta
            property="og:url"
            content={`https://www.maiznica.lv/products/${product.prettyID}`}
          />
        </Helmet>
      )}
      <img
        className="product-image"
        src={`https://www.maiznica.lv/images/${product.image}`}
      />
      <div
        className="column align-cross-start"
        style={{ maxWidth: 'min(100vw,600px)', flex: '1 1 500px' }}>
        <div className="card p column self-stretch align-cross-center">
          <h2 className="title">
            {product.name[selectedLang] || product.name.lv} &nbsp;
            {gramsToKilos(product.weight)}
          </h2>
          {product.badges && product.badges.length > 0 && (
            <div className="row">
              {product.badges.map((b) => (
                <span
                  className="badge"
                  key={b}>
                  {lang[b]}
                </span>
              ))}
            </div>
          )}
          {!eis && (
            <>
              {!product.invisible ? (
                <>
                  <Price
                    price={product.price}
                    discount={product.discount}
                    weight={product.weight}
                    bulkPrice={product.bulkPrice}
                    bulkThreshold={product.bulkThreshold}
                    isSmall={false}
                  />
                  {product.outOfStock && (
                    <div className="row p-h-b no-wrap bad align-cross-center">
                      <Warning
                        className="icon-b "
                        style={{ flexShrink: '0' }}
                      />
                      <p className="card-text wrap-n">{lang.special_order}</p>
                    </div>
                  )}
                  <div className="row align-cross-end">
                    <Input
                      value={quantity}
                      onChange={(event) => setQuantity(event.target.value)}
                      type="number"
                      width={150}
                      className="m-0"
                    />
                    <button
                      className="btn"
                      onClick={onOrder}>
                      {lang.add_to_cart}
                    </button>
                  </div>
                </>
              ) : (
                <p className="hint-text m-m">{lang.currently_unavailable}</p>
              )}
            </>
          )}
        </div>
        {(product.description.lv ||
          product.bio ||
          product.spoonGreen ||
          product.spoonRed ||
          product.expiration) && (
          <div className="card p column ">
            {product.description.lv && (
              <p className="card-text">
                {product.description[selectedLang] || product.description.lv}
              </p>
            )}
            {(product.bio || product.spoonGreen || product.spoonRed) && (
              <div className="row align-cross-center">
                {product.bio && (
                  <img
                    src="https://www.maiznica.lv/images/eurobio.jpg"
                    width={100}
                    height={66}
                  />
                )}
                {product.spoonRed && (
                  <>
                    <img
                      src="https://maiznica.lv/images/bordo-intro-logo.png"
                      width={100}
                      height={66}
                    />
                    {eis && (
                      <p className="card-text">{lang.cert_no} 247-80-16/1</p>
                    )}
                  </>
                )}
                {product.spoonGreen && (
                  <>
                    <img
                      src="https://maiznica.lv/images/green-intro-logo.png"
                      width={100}
                      height={66}
                    />
                    {eis && (
                      <p className="card-text">{lang.cert_no} 88-80-16/4</p>
                    )}
                  </>
                )}
              </div>
            )}

            {product.expiration && (
              <>
                <p className="product-text ">
                  {lang.expiration_time}{' '}
                  <strong>
                    {product.expiration.number} {lang[product.expiration.word]}
                  </strong>
                </p>
                {product.expiration.afterOpening && (
                  <p className="product-text m-t">
                    {lang.after_opening}{' '}
                    <strong>
                      {product.expiration.afterOpening.number}{' '}
                      {lang[product.expiration.afterOpening.word]}
                    </strong>
                  </p>
                )}
              </>
            )}

            {product.ingredients && (
              <p className="card-text">
                {product.ingredients[selectedLang] || product.ingredients.lv}
              </p>
            )}
          </div>
        )}
        {product.nutrition && (
          <div className="card">
            <table className="nutrition-table">
              <tbody>
                <tr>
                  <th>
                    <b>{lang.nutritional_info} </b>
                  </th>
                  <th>
                    <strong>{lang.g_contains}</strong>
                  </th>
                </tr>
                <tr>
                  <td>{lang.energy_content}</td>
                  <td>
                    {Math.round(product.nutrition.energy * 4.184)}kJ/
                    {product.nutrition.energy}kcal
                  </td>
                </tr>
                <tr>
                  <td>{lang.fat}</td>
                  <td>{product.nutrition.fat}g</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp; {lang.of_which_saturated_fat}</td>
                  <td>{product.nutrition.saturatedFat}g</td>
                </tr>

                <tr>
                  <td>{lang.carbohydrates}</td>
                  <td>{product.nutrition.carbs}g</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp; {lang.of_which_sugars}</td>
                  <td>{product.nutrition.sugar}g</td>
                </tr>
                {product.nutrition.fiber !== 0 &&
                  product.nutrition.fiber !== '0' &&
                  product.nutrition.fiber && (
                    <tr>
                      <td>{lang.fiber}</td>
                      <td>{product.nutrition.fiber}g</td>
                    </tr>
                  )}
                <tr>
                  <td>{lang.protein}</td>
                  <td>{product.nutrition.protein}g</td>
                </tr>
                <tr>
                  <td>{lang.salt}</td>
                  <td>{product.nutrition.salt}g</td>
                </tr>
                {product.nutrition.d3 !== 0 &&
                  product.nutrition.d3 !== '0' &&
                  product.nutrition.d3 && (
                    <tr>
                      <td>{lang.d3}</td>
                      <td>{product.nutrition.d3}µg</td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        )}
        {product.EAN && product.EAN !== '0' && (
          <div className="card p">
            <p className="product-text">
              <Barcode className="icon-b m-r" />
              {product.EAN}
            </p>
          </div>
        )}
        {eis && (
          <>
            <div className="card p">
              <p className="card-text">
                <b>Alergēni</b>: graudaugi, kas satur lipekli, piens un tā
                produkti, rieksti un to produkti, sojas pupas un to produkti,
                olas un to produkti, sezama sēklas un to produkti.
              </p>
              <p className="card-text m-t">
                <b>Uzglabāšanas nosacījumi</b>: uzglabāšanas temperatūra no 10°C
                līdz 25°C. Uzglabāt sausā un vēsā vietā, neuzglabāt tiešos
                saules staros.
              </p>
              <p className="card-text m-t">
                <b>Derīgs līdz</b>: skatīt uz iepakojuma.
              </p>
            </div>
            <div className="card p">
              <p className="card-text">
                <b>Zīmols</b>: Maiznīca Flora
              </p>
              <p className="card-text m-t">
                <b>Ražotājs</b>: SIA Maiznīca Flora, “Vecvaltes” Krimuldas
                pagasts, Siguldas novads.
              </p>
              <p className="card-text m-t">
                <b>Izplatītājs un piegādātājs</b>: SIA Maiznīca Flora,
                “Vecvaltes” Krimuldas pagasts, Siguldas novads, LV2144, e-pasts:
                flora@maiznica.lv, www.maiznica.lv, tālrunis +37167521291
              </p>
              <p className="card-text m-t">
                <b>Izcelsmes valsts</b>: Latvija
              </p>
            </div>
            <div className="card p">
              <p className="card-text">
                <i>
                  Nosaukums, Zīmols, Marķējums, Daudzums, Izcelsmes valsts,
                  Ražotājs- Atbilstoši vispārīgo obligāto prasību pārtikas
                  precēm 10.punktam
                </i>
              </p>
              <p className="card-text m-t">
                <i>
                  Daudzums – atbisltoši tehniskās specifikācijas prasībām
                  pozīcijā.
                </i>
              </p>
              <p className="card-text m-t">
                <i>
                  Nosaukums, Sastāvdaļas, Alergēni, Uzturvērtība, Daudzums,
                  Uzglabāšanas un lietošanas noteikumi, Izcelsmes valsts,
                  Izplatītājs – Atbilstoši regulas Nr.1169/2011 prasībām
                </i>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default StaticInformation
