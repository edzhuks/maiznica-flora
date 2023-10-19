import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../styled/base'

import { Link } from 'react-router-dom'
import CategoryModal from './CategoryModal'
import ProductModal from './ProductModal'
import { useSelector } from 'react-redux'
import useCategoryService from '../../services/category'
import { Edit } from '@styled-icons/evaicons-solid/Edit'
import { Cross } from '@styled-icons/entypo/Cross'

const CategoryList = styled.ul`
  list-style: none;
  position: relative;
  padding: 0;
  margin: 0;
  margin-left: 30px;
`

const Clearer = styled.div`
  background: ${(props) => props.theme.background};
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
  background: ${(props) => props.theme.background};
  span::before {
    content: '';
    height: 10000%;
    width: 10px;
    border-bottom: 2px solid ${(props) => props.theme.main};
    border-left: 2px solid ${(props) => props.theme.main};
    position: absolute;
    bottom: 10px;
    left: -10px;
    z-index: -2;
  }
  span::after {
    content: '';
    height: 33px;
    width: 400px;
    background: ${(props) => props.theme.background};
    position: absolute;
    bottom: 10px;
    left: 0px;
    z-index: -1;
  }
  span {
  }

  button {
  }
`
const RemoveButton = styled.button`
  border-radius: 3px;
  padding: 3px;
  background: transparent;
  border: 0px;
  color: red;
  &:hover {
    background: red;
    color: ${(props) => props.theme.white};
  }
`
const EditButton = styled(RemoveButton)`
  color: ${(props) => props.theme.main};
  &:hover {
    background: ${(props) => props.theme.main};
    color: ${(props) => props.theme.white};
  }
`
const CategoryItem = styled(ProductItem)`
  font-weight: bold;
  margin: 5px 0px;
  button {
    border-radius: 3px;
    padding: 0px 3px 3px 3px;
    background: transparent;
    border: 0px;
    color: ${(props) => props.theme.main};
    &:hover {
      background: ${(props) => props.theme.main};
      color: ${(props) => props.theme.white};
    }
  }
  span::after {
    height: 43px;
  }
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
                <Cross />
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
                </span>
              </Link>
              <RemoveButton
                onClick={(e) => {
                  e.preventDefault()
                  handleDeleteProduct(p.id, category.id)
                }}>
                <Cross size="20px" />
              </RemoveButton>
              <Link to={`/management/new_product/${p.id}`}>
                <EditButton>
                  <Edit size="20px" />
                </EditButton>
              </Link>
            </ProductItem>
          ))}
      </CategoryList>
      <CategoryList>
        {category.categories &&
          category.categories.map((c) => (
            <CategoryTab
              key={c.id}
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
  const categoryService = useCategoryService()
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
