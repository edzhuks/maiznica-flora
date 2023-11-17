import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import CategoryModal from './CategoryModal'
import ProductModal from './ProductModal'
import { useSelector } from 'react-redux'
import useCategoryService from '../../services/category'
import { Edit } from '@styled-icons/evaicons-solid/Edit'
import { Cross } from '@styled-icons/entypo/Cross'
import { BoxSeam } from '@styled-icons/bootstrap/BoxSeam'
import useProductService from '../../services/product'
import { Eye } from '@styled-icons/heroicons-solid/Eye'

const CategoryList = styled.ul`
  list-style: none;
  position: relative;
  padding: 0;
  margin: 0;
  margin-left: 30px;
`

const ProductItemm = styled.li`
  span {
    color: ${(props) => (props.outOfStock ? props.theme.light : 'black')};
    text-decoration: ${(props) => (props.invisible ? 'line-through' : 'none')};
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
// const RemoveButton = styled.button`
//   border-radius: 3px;
//   padding: 3px;
//   background: transparent;
//   border: 0px;
//   color: red;
//   &:hover {
//     background: red;
//     color: ${(props) => props.theme.white};
//   }
// `
// const EditButton = styled(RemoveButton)`
//   color: ${(props) => props.theme.main};
//   &:hover {
//     background: ${(props) => props.theme.main};
//     color: ${(props) => props.theme.white};
//   }
// `

const CategoryItemm = styled(ProductItemm)`
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

const ProductItem = ({
  product,
  parentCategory,
  removeProduct,
  toggleShow,
  toggleStock,
}) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  return (
    <div>
      <Link
        to={`/products/${product.id}`}
        style={{ textDecoration: 'none' }}>
        <span>
          {product.name[selectedLang] || product.name.lv} {product.weight}g
        </span>
      </Link>
      <button
        className="inverted icon-button cancel m-h-s"
        onClick={(e) => {
          e.preventDefault()
          removeProduct(product.id, parentCategory.id)
        }}>
        <Cross className="icon-s" />
      </button>
      <button
        className="inverted icon-button m-h-s"
        onClick={() => {
          toggleShow(product)
        }}>
        <Eye className="icon-s" />
      </button>
      <button
        className="inverted icon-button m-h-s"
        onClick={() => {
          toggleStock(product)
        }}>
        <BoxSeam className="icon-s" />
      </button>
      <Link to={`/management/new_product/${product.id}`}>
        <button className="inverted icon-button m-h-s">
          <Edit className="icon-s" />
        </button>
      </Link>
    </div>
  )
}

const CategoryItem = ({
  category,
  removeCategory,
  parentCategory,
  handleCategoryButton,
  handleProductButton,
}) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <Link
        to={`/category/${category.id}`}
        style={{ textDecoration: 'none' }}>
        <span>
          {category.displayName[selectedLang] || category.displayName.lv}
          {category.id !== 'all' && category.id !== 'new' && (
            <button
              className="inverted icon-button m-h-s cancel"
              onClick={(e) => {
                e.preventDefault()
                removeCategory(category.id, parentCategory.id)
              }}>
              <Cross className="icon-m" />
            </button>
          )}
        </span>
      </Link>

      <button onClick={handleProductButton}>+ {lang.product}</button>
      <button onClick={handleCategoryButton}>+ {lang.category}</button>
    </div>
  )
}

const CategoryTab = ({
  category,
  handleCategory,
  handleProduct,
  removeProduct,
  removeCategory,
  parentCategory,
  toggleShow,
  toggleStock,
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
    <div>
      <CategoryItem
        category={category}
        removeCategory={removeCategory}
        parentCategory={parentCategory}
        handleCategoryButton={handleCategoryButton}
        handleProductButton={handleProductButton}
      />
      <CategoryList>
        {category.categories &&
          category.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              parentCategory={category}
              removeProduct={removeProduct}
              toggleShow={toggleShow}
              toggleStock={toggleStock}
            />
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
              removeProduct={removeProduct}
              toggleShow={toggleShow}
              toggleStock={toggleStock}
              removeCategory={removeCategory}
              parentCategory={category}
            />
          ))}
      </CategoryList>
    </div>
  )
}

const CategoryManagement = () => {
  const categoryService = useCategoryService()
  const productService = useProductService()
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

  const removeProduct = (id, parentCategory) => {
    categoryService
      .removeProducts({ productId: id, parentCategory })
      .then(() => refresh())
  }
  const removeCategory = (id, parentCategory) => {
    categoryService
      .removeCategories({ categoryId: id, parentCategory })
      .then(() => refresh())
  }
  const toggleShow = (product) => {
    if (product.invisible) {
      productService.showProduct(product.id).then(() => refresh())
    } else {
      productService.hideProduct(product.id).then(() => refresh())
    }
  }
  const toggleStock = (product) => {
    if (product.inStock) {
      productService.outOfStock(product.id).then(() => refresh())
    } else {
      productService.inStock(product.id).then(() => refresh())
    }
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
        {catalogue ? (
          <CategoryTab
            handleProduct={clickProduct}
            handleCategory={clickCategory}
            removeProduct={removeProduct}
            toggleShow={toggleShow}
            toggleStock={toggleStock}
            removeCategory={removeCategory}
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
