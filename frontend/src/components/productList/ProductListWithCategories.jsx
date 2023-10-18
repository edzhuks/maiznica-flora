import { useState } from 'react'
import Categories from './Categories'
import { useParams } from 'react-router-dom'
import ProductList from './ProductList'
import { useEffect } from 'react'
import useCategoryService from '../../services/category'

const ProductListWithCategories = () => {
  const categoryService = useCategoryService()
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
