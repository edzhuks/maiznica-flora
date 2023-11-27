import { useEffect } from 'react'
import { useState } from 'react'
import useCategoryService from '../../services/category'
import useField from '../../hooks/useField'
import { useSelector } from 'react-redux'
import BaseModal from '../basic/BaseModal'
import useUploadService from '../../services/uploads'
import Input from '../basic/Input'

const CategoryModal = ({ visible, activeCategory, onClose, catalogue }) => {
  const categoryService = useCategoryService()
  const uploadService = useUploadService()
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [allCategories, setAllCategories] = useState([])
  const selectedCategories = useField('select')

  useEffect(() => {
    if (activeCategory) {
      categoryService.getAllIds().then((result) => {
        setAllCategories(
          result
            .map((category) => ({
              value: category.id,
              label:
                category.displayName[selectedLang] || category.displayName.lv,
            }))
            .filter((c) => c.value !== activeCategory.id)
        )
        selectedCategories.changeValue(
          activeCategory.categories.map((category) => ({
            value: category.id,
            label:
              category.displayName[selectedLang] || category.displayName.lv,
          }))
        )
      })
    }
  }, [selectedLang, activeCategory])

  const clear = () => {
    selectedCategories.clear()
  }

  const addCategories = () => {
    categoryService
      .addExisting({
        categoriesToAdd: selectedCategories.value.map((c) => c.value),
        parentCategory: activeCategory.id,
      })
      .then(() => {
        clear()
        onClose()
      })
  }

  return (
    <BaseModal
      visible={visible}
      title={lang.add_category}
      onClose={() => {
        clear()
        onClose()
      }}
      onSubmit={() => addCategories()}>
      <div className="row full-width">
        <div
          className="column p"
          style={{ flex: '10 1 300px', maxWidth: '1000px' }}>
          <h2 className="title text-center">
            {lang.select_existing_categories}
          </h2>
          <Input
            options={allCategories}
            {...selectedCategories}
            label={lang.categories}
            isMulti={true}
          />
        </div>
      </div>
    </BaseModal>
  )
}

export default CategoryModal
