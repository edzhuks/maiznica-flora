import { useState } from 'react'
import Categories from './Categories'
import { useNavigate, useParams } from 'react-router-dom'
import ProductList from './ProductList'
import { useEffect } from 'react'
import useCategoryService from '../../services/category'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'

const ProductListWithCategories = () => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const categoryService = useCategoryService()
  let { category } = useParams()
  const navigate = useNavigate()
  const [categoryData, setCategoryData] = useState({
    categories: [],
    products: [],
  })

  useEffect(() => {
    categoryService
      .getCategory(category)
      .then((p) => setCategoryData(p))
      .catch((e) => {
        if (e.response.status === 404) {
          navigate('/not-found')
        }
      })
  }, [category])

  return (
    <div>
      <Categories
        categories={categoryData.categories}
        name={categoryData.displayName}
      />
      {categoryData.displayName && (
        <h1 className="big-title m-d">
          <Helmet>
            <title>
              {categoryData.displayName[selectedLang] ||
                categoryData.displayName.lv}
            </title>
          </Helmet>
          {categoryData.displayName[selectedLang] ||
            categoryData.displayName.lv}
        </h1>
      )}
      <ProductList products={categoryData.products} />
    </div>
  )
}

export default ProductListWithCategories
