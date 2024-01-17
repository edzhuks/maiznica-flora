import { gramsToKilos } from '../../util/convert'
import { useSelector } from 'react-redux'
import { Barcode } from '@styled-icons/icomoon/Barcode'
import Price from '../basic/Price'
import Input from '../basic/Input'
import { Warning } from '@styled-icons/ionicons-solid/Warning'
const StaticInformation = ({
  product,
  quantity,
  setQuantity,
  onOrder,
  className,
}) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div className={`row center ${className ? className : ''}`}>
      <img
        className="product-image"
        src={`https://www.maiznica.lv/images/${product.image}`}
      />
      <div
        className="column align-cross-start"
        style={{ maxWidth: 'min(100vw,600px)', flex: '1 1 600px' }}>
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
              <div className="row ">
                {product.bio && (
                  <img
                    src="https://www.maiznica.lv/images/eurobio.jpg"
                    width={100}
                    height={66}
                  />
                )}
                {product.spoonRed && (
                  <img
                    src="http://karotite.lv/img/bordo-intro-logo.png"
                    width={100}
                    height={66}
                  />
                )}
                {product.spoonGreen && (
                  <img
                    src="http://karotite.lv/img/green-intro-logo.png"
                    width={100}
                    height={66}
                  />
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
      </div>
    </div>
  )
}

export default StaticInformation
