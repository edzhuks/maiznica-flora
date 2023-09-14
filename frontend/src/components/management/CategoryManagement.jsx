import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  BigTitle,
  Button,
  CancelButton,
  CenteredTitle,
  Centerer,
  FullWidthButton,
  InputGroup,
  Label,
  Row,
  StyledInput,
  Title,
  Form,
  CompactInputGroup,
  SubTitle,
} from '../styled/base'
import useField from '../../hooks/useField'
import Select from 'react-select'
import categoryService from '../../services/category'
import { Link } from 'react-router-dom'
import CategoryModal from './CategoryModal'
import ProductModal from './ProductModal'

const CategoryList = styled.ul`
  list-style: none;
  position: relative;
  padding: 0;
  margin: 0;
  margin-left: 30px;

  /* margin-top: 10px; */
`

const Clearer = styled.div`
  background: white;
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
  background: white;
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
    height: 27px;
    width: 1000px;
    background: white;
    position: absolute;
    bottom: 10px;
    left: 0px;
    z-index: -1;
  }
`
const CategoryItem = styled(ProductItem)`
  font-weight: bold;
  margin: 5px 0px;
`

const CategoryTab = ({ category, handleCategory, handleProduct }) => {
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
          to={`/category/${category._id}`}
          style={{ textDecoration: 'none' }}>
          <span>{category.displayName}</span>
        </Link>
        <SmallButton onClick={handleProductButton}>+ product</SmallButton>
        <SmallButton onClick={handleCategoryButton}>+ category</SmallButton>
      </CategoryItem>
      <CategoryList>
        {category.categories &&
          category.products.map((p) => (
            <ProductItem key={p.id}>
              <Link
                to={`/products/${p.id}`}
                style={{ textDecoration: 'none' }}>
                <span>{p.name}</span>
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

  const onModalClose = (newCatalogue) => {
    setCatalogue(newCatalogue)
    setActiveCategory(null)
    setAddingCategory(false)
    setAddingProduct(false)
  }

  useEffect(() => {
    categoryService.getFullCatalogue().then((result) => {
      setCatalogue(result)
    })
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
