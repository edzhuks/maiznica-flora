import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Link, useMatch, useParams } from 'react-router-dom'
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
  padding-inline-start: 0;
`

const ProductItem = ({
  depth,
  product,
  parentCategory,
  removeProduct,
  toggleShow,
  toggleStock,
}) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  return (
    <div
      className="row no-gap"
      style={{ marginLeft: `calc(${depth} * 20px)` }}>
      <div className="depth-indicators">
        {[...Array(depth)].map((e, i) => (
          <div className="depth-indicator" />
        ))}
      </div>
      <Link
        to={`/products/${product.id}`}
        style={{
          color: product.invisible
            ? product.outOfStock
              ? 'color-mix(in srgb,var(--subtle),var(--bad))'
              : 'var(--subtle)'
            : product.outOfStock
            ? 'var(--bad)'
            : 'unset',
          fontWeight:
            product.invisible && product.outOfStock ? 'bold' : 'unset',
        }}>
        <span>
          {product.name[selectedLang] || product.name.lv} {product.weight}g
        </span>
      </Link>
      <button
        className="btn inverted icon-button cancel m-h-s"
        onClick={(e) => {
          e.preventDefault()
          removeProduct(product.id, parentCategory.id)
        }}>
        <Cross className="icon-s" />
      </button>
      <button
        className="btn inverted icon-button m-h-s"
        onClick={() => {
          toggleShow(product)
        }}>
        <Eye className="icon-s" />
      </button>
      <button
        className="btn inverted icon-button m-h-s"
        onClick={() => {
          toggleStock(product)
        }}>
        <BoxSeam className="icon-s" />
      </button>
      <Link to={`/management/new_product/${product.id}`}>
        <button className="btn inverted icon-button m-h-s">
          <Edit className="icon-s" />
        </button>
      </Link>
    </div>
  )
}

const CategoryItem = ({
  depth,
  category,
  removeCategory,
  parentCategory,
  handleCategoryButton,
  handleProductButton,
  toggleShowCategory,
}) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      {category.displayName && (
        <div
          className="row no-gap"
          style={{ marginLeft: `calc(${depth} * 20px)` }}>
          <div className="depth-indicators">
            {[...Array(depth)].map((e, i) => (
              <div className="depth-indicator big" />
            ))}
          </div>
          <Link
            to={`/category/${category.id}`}
            style={{
              textDecoration: 'none',
              color: category.invisible ? 'var(--subtle)' : 'unset',
            }}>
            <span className="card-heading">
              {category.displayName[selectedLang] || category.displayName.lv}
            </span>
          </Link>
          {category.id !== 'all' && category.id !== 'new' && (
            <>
              <button
                className="btn inverted icon-button m-h-s cancel"
                onClick={(e) => {
                  e.preventDefault()
                  removeCategory(category.id, parentCategory.id)
                }}>
                <Cross className="icon-m" />
              </button>
              <Link to={`/management/new_category/${category.id}`}>
                <button className="btn inverted icon-button m-h-s">
                  <Edit className="icon-m" />
                </button>
              </Link>
              <button
                className="btn inverted icon-button m-h-s"
                onClick={() => {
                  toggleShowCategory(category)
                }}>
                <Eye className="icon-m" />
              </button>
            </>
          )}

          <button
            className="btn m-h"
            onClick={handleProductButton}>
            + {lang.products}
          </button>
          <button
            className="btn"
            onClick={handleCategoryButton}>
            + {lang.category}
          </button>
        </div>
      )}
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
  toggleShowCategory,
  depth,
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
        depth={depth}
        category={category}
        removeCategory={removeCategory}
        parentCategory={parentCategory}
        handleCategoryButton={handleCategoryButton}
        handleProductButton={handleProductButton}
        toggleShowCategory={toggleShowCategory}
      />
      <CategoryList>
        {category.products &&
          category.products.map((product) => (
            <ProductItem
              depth={depth + 1}
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
              depth={depth + 1}
              key={c.id}
              category={c}
              handleCategory={handleCategory}
              handleProduct={handleProduct}
              removeProduct={removeProduct}
              toggleShow={toggleShow}
              toggleStock={toggleStock}
              removeCategory={removeCategory}
              parentCategory={category}
              toggleShowCategory={toggleShowCategory}
            />
          ))}
      </CategoryList>
    </div>
  )
}

const CategoryManagement = ({}) => {
  const match = useMatch('/management/categories/:category')
  const category = match.params.category

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
  const toggleShowCategory = (category) => {
    if (category.invisible) {
      categoryService.showCategory(category.id).then(() => refresh())
    } else {
      categoryService.hideCategory(category.id).then(() => refresh())
    }
  }
  const toggleStock = (product) => {
    if (product.outOfStock) {
      productService.inStock(product.id).then(() => refresh())
    } else {
      productService.outOfStock(product.id).then(() => refresh())
    }
  }
  const refresh = () => {
    categoryService.getCategory(category).then((result) => {
      setCatalogue(result)
    })
  }

  useEffect(() => {
    refresh()
  }, [category])

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
      <ul style={{ listStyle: 'none', paddingInlineStart: '0' }}>
        {catalogue ? (
          <CategoryTab
            depth={0}
            handleProduct={clickProduct}
            handleCategory={clickCategory}
            removeProduct={removeProduct}
            toggleShow={toggleShow}
            toggleStock={toggleStock}
            removeCategory={removeCategory}
            toggleShowCategory={toggleShowCategory}
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
