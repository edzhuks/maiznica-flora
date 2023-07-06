import useResource from '../../hooks/useResource'
import ProductListItem from './ProductListItem'
import UserContext from '../../contexts/userContext'
import { useContext } from 'react'
import styled from 'styled-components'
import { EmptyProductItem, ProductRow } from '../styled/base'
import Categories from './Categories'
import { useParams } from 'react-router-dom'

const ProductList = () => {
  let { category } = useParams()
  console.log(category)
  const [products, productService] = useResource(
    `http://localhost:3001/api/categories/${category ?? 'all'}`
  )

  return (
    <div>
      {products && products.categories && (
        <Categories categories={products.categories} />
      )}
      {products && products.products && (
        <ProductRow>
          {products.products.map((product) => (
            <ProductListItem
              product={product}
              key={product.id}
            />
          ))}

          <EmptyProductItem />
          <EmptyProductItem />
          <EmptyProductItem />
        </ProductRow>
      )}
    </div>
  )
}

export default ProductList
