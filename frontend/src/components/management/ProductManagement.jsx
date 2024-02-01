import { useEffect, useState } from 'react'

import { Link, useMatch, useParams } from 'react-router-dom'
import CategoryModal from './CategoryModal'
import ProductModal from './ProductModal'
import { useSelector } from 'react-redux'
import { Edit } from '@styled-icons/evaicons-solid/Edit'
import { BoxSeam } from '@styled-icons/bootstrap/BoxSeam'
import useProductService from '../../services/product'
import { Eye } from '@styled-icons/heroicons-solid/Eye'
import { gramsToKilos } from '../../util/convert'
import { ContentCopy } from '@styled-icons/material-rounded/ContentCopy'

const ProductItem = ({ product, toggleShow, toggleStock }) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  return (
    <tr className="m-d">
      <td>
        <Link to={`/products/${product.prettyID}`}>
          <img
            className="image-xs"
            src={`https://www.maiznica.lv/images/xs_${product.image}`}
          />
        </Link>
      </td>
      <td>
        <Link
          to={`/products/${product.prettyID}`}
          className="p-v"
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
          <h3 className="product-title-small ">
            {product.name[selectedLang] || product.name.lv}{' '}
            {gramsToKilos(product.weight)}
          </h3>
        </Link>
      </td>
      <td>
        <button
          className="btn inverted icon-button "
          onClick={() => {
            toggleShow(product)
          }}>
          <Eye className="icon-m" />
        </button>
      </td>
      <td>
        <button
          className="btn inverted icon-button "
          onClick={() => {
            toggleStock(product)
          }}>
          <BoxSeam className="icon-m" />
        </button>
      </td>
      <td>
        <Link to={`/management/new_product/${product.id}`}>
          <button className="btn inverted icon-button ">
            <Edit className="icon-m" />
          </button>
        </Link>
      </td>
      <td>
        <Link
          to={`/products/${product.prettyID}?eis=true`}
          className="p-v">
          <h3 className="product-title-small ">EIS</h3>
        </Link>
      </td>
      <td>
        <button
          className="btn inverted icon-button"
          onClick={() =>
            navigator.clipboard.writeText(
              `https://www.maiznica.lv/products/${product.prettyID}?eis=true`
            )
          }>
          <ContentCopy className="icon-m" />
        </button>
      </td>
    </tr>
  )
}

const CategoryTab = ({
  category,
  removeProduct,
  toggleShow,
  toggleStock,
  depth,
}) => {
  return (
    <div>
      <div className="order-table cart-table">
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
      </div>
    </div>
  )
}

const ProductManagement = ({}) => {
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

  const toggleShow = (product) => {
    if (product.invisible) {
      productService.showProduct(product.id).then(() => refresh())
    } else {
      productService.hideProduct(product.id).then(() => refresh())
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
    productService.getAll().then((result) => {
      setCatalogue({
        products: result.sort((a, b) => {
          a = a.name.lv.replace(/\W/g, '')
          b = b.name.lv.replace(/\W/g, '')
          if (a < b) {
            return -1
          } else if (a > b) {
            return 1
          }
          return 0
        }),
      })
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
      <ul style={{ listStyle: 'none', paddingInlineStart: '0' }}>
        {catalogue ? (
          <CategoryTab
            depth={0}
            handleProduct={clickProduct}
            handleCategory={clickCategory}
            toggleShow={toggleShow}
            toggleStock={toggleStock}
            category={catalogue}
          />
        ) : (
          <p>wait</p>
        )}
      </ul>
    </>
  )
}
export default ProductManagement
