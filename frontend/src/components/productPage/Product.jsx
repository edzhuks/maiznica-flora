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
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>
          {product.price} euro <br />
          {product.weight} grams
        </p>
        <h4>rating: {product.rating}</h4>
      </div>
    )
}

export default Product
