import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import cartService from '../../services/cart'
import styled from 'styled-components'
import { NumberInput, Button } from '../styled/base'

const Text = styled.p`
  font-family: 'Roboto', sans-serif;
  color: #333333;
`

const Title = styled.p`
  font-family: 'Roboto Slab', serif;
  font-size: 28px;
  color: #45941e;
  font-weight: 400;
`

const Image = styled.img`
  transform: scale(0.8);
`

const TableHeader = styled.th`
  text-align: left;
  border-width: 0px 0px 1px 0px;
  border-color: #333333;
  border-style: solid;
  font-weight: 400;
  padding: 5px 10px;
  &:nth-child(2) {
    text-align: end;
    border-width: 0px 0px 1px 1px;
  }
`

const Table = styled.table`
  border-collapse: collapse;
`

const Cell = styled.td`
  padding: 2px 10px;
  &:nth-child(2) {
    text-align: end;
    border-width: 0px 0px 0px 1px;
    border-style: solid;
    border-color: #333333;
  }
`

const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
`
const Product = () => {
  const [quantity, setQuantity] = useState(1)

  const [product, setProduct] = useState()
  const id = useParams().id

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((g) => setProduct(g.data))
  }, [])

  const addToCart = () => {
    cartService.addToCart({ quantity, product })
  }

  if (product)
    return (
      <div style={{ display: 'flex' }}>
        <div>
          <Image
            src={product.image}
            width={500}
            height={500}
          />
        </div>
        <div>
          <Title>
            {product.name} {product.weight}g
          </Title>
          {product.rating && <h4>rating: {product.rating}</h4>}
          <Text>
            {product.description && <p>{product.description}</p>}
            {product.ingredients && <p>{product.ingredients}</p>}
            {product.nutrition && (
              <Table>
                <tbody>
                  <TableRow>
                    <TableHeader>
                      <b>Nutritional info </b>
                    </TableHeader>
                    <TableHeader>
                      <strong>100g contains</strong>
                    </TableHeader>
                  </TableRow>
                  <TableRow>
                    <Cell>Energy content</Cell>
                    <Cell>
                      {Math.round(product.nutrition.energy * 4.184)}kJ/
                      {product.nutrition.energy}kcal
                    </Cell>
                  </TableRow>
                  <TableRow>
                    <Cell>Fat</Cell>
                    <Cell>{product.nutrition.fat}g</Cell>
                  </TableRow>
                  <TableRow>
                    <Cell>&nbsp;&nbsp;&nbsp; Of which saturated fat</Cell>
                    <Cell>{product.nutrition.saturatedFat}g</Cell>
                  </TableRow>

                  <TableRow>
                    <Cell>Carbohydrates</Cell>
                    <Cell>{product.nutrition.carbs}g</Cell>
                  </TableRow>
                  <TableRow>
                    <Cell>&nbsp;&nbsp;&nbsp; Of which sugars</Cell>
                    <Cell>{product.nutrition.sugar}g</Cell>
                  </TableRow>
                  {product.nutrition.fiber && (
                    <TableRow>
                      <Cell>Fiber</Cell>
                      <Cell>{product.nutrition.fiber}g</Cell>
                    </TableRow>
                  )}
                  <TableRow>
                    <Cell>Protein</Cell>
                    <Cell>{product.nutrition.protein}g</Cell>
                  </TableRow>
                  <TableRow>
                    <Cell>Salt</Cell>
                    <Cell>{product.nutrition.salt}g</Cell>
                  </TableRow>
                </tbody>
              </Table>
            )}
            <p>EAN code {product.EAN}</p>
            <Title>€ {product.price}</Title>
          </Text>

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
    )
}

export default Product
