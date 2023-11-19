import { useEffect } from 'react'
import { useState } from 'react'
import useCategoryService from '../../services/category'
import { useSelector } from 'react-redux'
import { gramsToKilos } from '../../util/convert'
import useProductService from '../../services/product'
import BaseModal from '../basic/BaseModal'
import useField from '../../hooks/useField'
import Input from '../basic/Input'

const ProductModal = ({ visible, activeCategory, onClose }) => {
  const categoryService = useCategoryService()
  const productService = useProductService()
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [allProducts, setAllProducts] = useState([])
  const selectedProducts = useField('select')

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
        selectedProducts.changeValue(
          activeCategory.products.map((product) => ({
            value: product.id,
            label: `${
              product.name[selectedLang] || product.name.lv
            } ${gramsToKilos(product.weight)}`,
          }))
        )
      }
    })
  }, [selectedLang, activeCategory])

  const clear = () => {
    selectedProducts.clear()
  }

  const addProducts = () => {
    if (selectedProducts.value.length) {
      categoryService
        .addProducts({
          productsToAdd: selectedProducts.value.map((p) => p.value),
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
      onSubmit={() => addProducts()}>
      <h2 className="title m text-center">{lang.select_existing_products}</h2>
      <div className="m p-h-b">
        <Input
          options={allProducts}
          {...selectedProducts}
          isMulti={true}
          label={lang.products}
        />
      </div>
    </BaseModal>
  )
}

export default ProductModal
