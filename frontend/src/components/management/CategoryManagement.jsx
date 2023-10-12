import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../styled/base'

import categoryService from '../../services/category'
import { Link } from 'react-router-dom'
import CategoryModal from './CategoryModal'
import ProductModal from './ProductModal'
import { useSelector } from 'react-redux'

const CategoryList = styled.ul`
  list-style: none;
  position: relative;
  padding: 0;
  margin: 0;
  margin-left: 30px;
`

const Clearer = styled.div`
  background: #fafafa;
  z-index: -1;
  position: absolute;
  height: 170px;
  width: 100%;
  top: 0;
  left: 0;
`

const SmallButton = styled(Button)`
  padding: 2px 5px;
  margin: 0px 5px;
  height: auto;
`

const ProductItem = styled.li`
  span {
    color: black;
  }
  position: relative;
  background: #fafafa;
  span::before {
    content: '';
    height: 1500%;
    width: 10px;
    border-bottom: 2px solid rgb(69, 148, 30);
    border-left: 2px solid rgb(69, 148, 30);
    position: absolute;
    bottom: 10px;
    left: -10px;
    z-index: -2;
  }
  span::after {
    content: '';
    height: 33px;
    width: 400px;
    background: #fafafa;
    position: absolute;
    bottom: 10px;
    left: 0px;
    z-index: -1;
  }
  span {
    button {
      border-radius: 3px;
      padding: 0px 3px 3px 3px;
      background: transparent;
      border: 0px;
      color: red;
      &:hover {
        background: red;
        color: white;
      }
    }
  }
`
const CategoryItem = styled(ProductItem)`
  font-weight: bold;
  margin: 5px 0px;
`

const CategoryTab = ({
  category,
  handleCategory,
  handleProduct,
  handleDeleteProduct,
  handleDeleteCategory,
  parentCategory,
}) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  const handleCategoryButton = () => {
    handleCategory(category)
  }
  const handleProductButton = () => {
    handleProduct(category)
  }

  return (
    <>
      <CategoryItem>
        <Link
          to={`/category/${category.id}`}
          style={{ textDecoration: 'none' }}>
          <span>
            {category.displayName[selectedLang] || category.displayName.lv}
            {category.id !== 'all' && category.id !== 'new' && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleDeleteCategory(category.id, parentCategory.id)
                }}>
                ╳
              </button>
            )}
          </span>
        </Link>

        <SmallButton onClick={handleProductButton}>
          + {lang.product}
        </SmallButton>
        <SmallButton onClick={handleCategoryButton}>
          + {lang.category}
        </SmallButton>
      </CategoryItem>
      <CategoryList>
        {category.categories &&
          category.products.map((p) => (
            <ProductItem key={p.id}>
              <Link
                to={`/products/${p.id}`}
                style={{ textDecoration: 'none' }}>
                <span>
                  {p.name[selectedLang] || p.name.lv} {p.weight}g
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleDeleteProduct(p.id, category.id)
                    }}>
                    ╳
                  </button>
                </span>
              </Link>
            </ProductItem>
          ))}
      </CategoryList>
      <CategoryList>
        {category.categories &&
          category.categories.map((c) => (
            <CategoryTab
              key={c._id}
              category={c}
              handleCategory={handleCategory}
              handleProduct={handleProduct}
              handleDeleteProduct={handleDeleteProduct}
              handleDeleteCategory={handleDeleteCategory}
              parentCategory={category}
            />
          ))}
      </CategoryList>
    </>
  )
}

const CategoryManagement = () => {
  const [catalogue, setCatalogue] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [addingProduct, setAddingProduct] = useState(false)
  const [addingCategory, setAddingCategory] = useState(false)

  const clickCategory = (category) => {
    setActiveCategory(category)
    setAddingCategory(true)
  }
  const clickProduct = (category) => {
    setActiveCategory(category)
    setAddingProduct(true)
  }

  const onModalClose = () => {
    setActiveCategory(null)
    setAddingCategory(false)
    setAddingProduct(false)
    refresh()
  }

  const handleDeleteProduct = (id, parentCategory) => {
    categoryService
      .removeProducts({ productId: id, parentCategory })
      .then(() => refresh())
  }
  const handleDeleteCategory = (id, parentCategory) => {
    categoryService
      .removeCategories({ categoryId: id, parentCategory })
      .then(() => refresh())
  }

  const refresh = () => {
    categoryService.getFullCatalogue().then((result) => {
      setCatalogue(result)
    })
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <>
      <CategoryModal
        visible={addingCategory}
        activeCategory={activeCategory}
        onClose={onModalClose}
        catalogue={catalogue}
      />
      <ProductModal
        visible={addingProduct}
        activeCategory={activeCategory}
        onClose={onModalClose}
        catalogue={catalogue}
      />
      <ul style={{ listStyle: 'none' }}>
        <Clearer />
        {catalogue ? (
          <CategoryTab
            handleProduct={clickProduct}
            handleCategory={clickCategory}
            handleDeleteProduct={handleDeleteProduct}
            handleDeleteCategory={handleDeleteCategory}
            category={catalogue}
          />
        ) : (
          <p>wait</p>
        )}
      </ul>
    </>
  )
}
export default CategoryManagement
