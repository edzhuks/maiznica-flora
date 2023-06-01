import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Product = () => {
  const [product, setProduct] = useState()
  const id = useParams().id

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((g) => setProduct(g.data))
  }, [])

  if (product)
    return (
      <div style={{ display: 'flex' }}>
        <div>
          <img
            src={product.image}
            width={500}
            height={500}
          />
        </div>
        <div>
          <h3>
            {product.name} {product.weight}g
          </h3>
          {product.rating && <h4>rating: {product.rating}</h4>}
          {product.description && <p>{product.description}</p>}
          {product.ingredients && <p>{product.ingredients}</p>}
          {product.nutrition && (
            <table>
              <tbody>
                <tr>
                  <td>
                    <b>Nutritional info </b>
                  </td>
                  <td>
                    <strong>100g contains</strong>
                  </td>
                </tr>
                <tr>
                  <td>Energy content</td>
                  <td>
                    {Math.round(product.nutrition.energy * 4.184)}kJ/
                    {product.nutrition.energy}kcal
                  </td>
                </tr>
                <tr>
                  <td>Fat</td>
                  <td>{product.nutrition.fat}g</td>
                </tr>
                <tr>
                  <td>of which saturated fat</td>
                  <td>{product.nutrition.saturatedFat}g</td>
                </tr>

                <tr>
                  <td>Carbohydrates</td>
                  <td>{product.nutrition.carbs}g</td>
                </tr>
                <tr>
                  <td>of which sugars</td>
                  <td>{product.nutrition.sugar}g</td>
                </tr>
                {product.nutrition.fiber && (
                  <tr>
                    <td>Fiber</td>
                    <td>{product.nutrition.fiber}g</td>
                  </tr>
                )}
                <tr>
                  <td>Protein</td>
                  <td>{product.nutrition.protein}g</td>
                </tr>
                <tr>
                  <td>Salt</td>
                  <td>{product.nutrition.salt}g</td>
                </tr>
              </tbody>
            </table>
          )}
          <p>€ {product.price}</p>
          <p>EAN code {product.EAN}</p>
          {product.bio && (
            <img
              src="http://www.maiznica.lv/wp-content/uploads/2019/04/eurobio.jpg"
              width={100}
              height={66}
            />
          )}
        </div>
      </div>
    )
}

export default Product
