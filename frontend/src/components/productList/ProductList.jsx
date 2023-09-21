import ProductListItem from './ProductListItem'
import styled from 'styled-components'

const ProductRow = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 30px;
`

const EmptyProductItem = styled.div`
  width: calc(100% / 4 - 23px);
  height: 0;
`

const ProductList = ({ products }) => {
  return (
    <ProductRow>
      {products.map((product) => (
        <ProductListItem
          product={product}
          key={product.id}
        />
      ))}

      <EmptyProductItem />
      <EmptyProductItem />
      <EmptyProductItem />
    </ProductRow>
  )
}

export default ProductList
