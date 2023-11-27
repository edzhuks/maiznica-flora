import { useState } from 'react'
import Categories from './Categories'
import { useParams } from 'react-router-dom'
import ProductList from './ProductList'
import { useEffect } from 'react'
import useCategoryService from '../../services/category'
import { useSelector } from 'react-redux'

const ProductListWithCategories = () => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
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
      {categoryData.displayName && (
        <h1 className="big-title m-d">
          {categoryData.displayName[selectedLang] ||
            categoryData.displayName.lv}
        </h1>
      )}
      <ProductList products={categoryData.products} />
    </div>
  )
}

export default ProductListWithCategories
