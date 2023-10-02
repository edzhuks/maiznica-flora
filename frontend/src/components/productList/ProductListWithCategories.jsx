import { useState } from 'react'
import Categories from './Categories'
import { useParams } from 'react-router-dom'
import ProductList from './ProductList'
import { useEffect } from 'react'
import categoryService from '../../services/category'

const ProductListWithCategories = () => {
  let { category } = useParams()
  const [categoryData, setCategoryData] = useState({
    categories: [],
    products: [],
  })

  useEffect(() => {
    categoryService.getCategory(category).then((p) => setCategoryData(p))
  }, [category])

  return (
    <div>
      <Categories
        categories={categoryData.categories}
        name={categoryData.displayName}
      />
      <ProductList products={categoryData.products} />
    </div>
  )
}

export default ProductListWithCategories
