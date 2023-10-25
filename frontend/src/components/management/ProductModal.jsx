import { useEffect } from 'react'
import {
  ModalContainer,
  ModalContent,
  BigTitle,
  SubTitle,
  CancelButton,
  Button,
  Row,
} from '../styled/base'
import Select from 'react-select'
import { useState } from 'react'
import useCategoryService from '../../services/category'
import { useSelector } from 'react-redux'
import { gramsToKilos } from '../../util/convert'
import useProductService from '../../services/product'
import BaseModal from './BaseModal'

const ProductModal = ({ visible, activeCategory, onClose }) => {
  const categoryService = useCategoryService()
  const productService = useProductService()
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [allProducts, setAllProducts] = useState([])
  const [selectedProductIds, setSelectedProductIds] = useState([])

  useEffect(() => {
    productService.getAll().then((result) => {
      setAllProducts(
        result.map((product) => ({
          value: product.id,
          label: `${
            product.name[selectedLang] || product.name.lv
          } ${gramsToKilos(product.weight)}`,
        }))
      )
      if (activeCategory) {
        setSelectedProductIds(activeCategory.products.map((p) => p.id))
      }
    })
  }, [selectedLang, activeCategory])

  const clear = () => {
    setSelectedProductIds([])
  }

  const addProducts = () => {
    if (selectedProductIds.length) {
      categoryService
        .addProducts({
          productsToAdd: selectedProductIds,
          parentCategory: activeCategory.id,
        })
        .then((newCatalogue) => {
          clear()
          onClose(newCatalogue)
        })
    }
  }

  return (
    <BaseModal
      visible={visible}
      title={lang.add_product}
      onClose={() => {
        clear()
        onClose()
      }}
      onSubmit={() => addProducts()}
      padding="20px 100px">
      <SubTitle>{lang.select_existing_products}</SubTitle>
      <div style={{ width: '600px' }}>
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={allProducts}
          onChange={(e) =>
            setSelectedProductIds(e ? e.map((x) => x.value) : [])
          }
          value={allProducts.filter((item) =>
            selectedProductIds.includes(item.value)
          )}
        />
      </div>
    </BaseModal>
  )
}

export default ProductModal
