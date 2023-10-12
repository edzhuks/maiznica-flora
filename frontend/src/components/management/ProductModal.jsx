import { useEffect } from 'react'
import {
  ModalContainer,
  ModalContent,
  BigTitle,
  SubTitle,
  CancelButton,
  Button,
} from '../styled/base'
import Select from 'react-select'
import { useState } from 'react'
import productService from '../../services/product'
import categoryService from '../../services/category'
import { useSelector } from 'react-redux'
import { gramsToKilos } from '../../util/convert'

const ProductModal = ({ visible, activeCategory, onClose, catalogue }) => {
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
    <ModalContainer style={{ display: visible ? 'block' : 'none' }}>
      <ModalContent>
        <BigTitle style={{ marginBottom: 15 }}>{lang.add_product}</BigTitle>
        <div style={{ padding: '30px 100px' }}>
          <SubTitle>{lang.select_existing_products}</SubTitle>
          <div style={{ width: '600px' }}>
            <Select
              closeMenuOnSelect={false}
              menuIsOpen={true}
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
        </div>
        <CancelButton
          onClick={() => {
            clear()
            onClose(catalogue)
          }}
          style={{ margin: 20 }}>
          {lang.cancel}
        </CancelButton>
        <Button
          style={{ margin: 20, float: 'right' }}
          onClick={addProducts}>
          {lang.add}
        </Button>
      </ModalContent>
    </ModalContainer>
  )
}

export default ProductModal
