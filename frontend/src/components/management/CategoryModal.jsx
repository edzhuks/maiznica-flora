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
  const name_lv = useField('text')
  const name_en = useField('text')
  const name_de = useField('text')
  const id = useField('text')
  const [image, setImage] = useState('placeholder.jpeg')

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
    name_lv.clear()
    name_en.clear()
    name_de.clear()
    id.clear()
    setImage('placeholder.jpeg')
    selectedCategories.clear()
  }

  const addCategories = () => {
    if (name_lv.value) {
      categoryService
        .addNew({
          newCategory: {
            displayName: {
              lv: name_lv.value,
              en: name_en.value,
              de: name_de.value,
            },
            id: id.value,
            image,
          },
          parentCategory: activeCategory.id,
        })
        .then(() => {
          clear()
          onClose()
        })
    } else {
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
  }
  const imageSelected = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('image', event.target.files[0])
    uploadService.uploadImage(formData).then((response) => {
      setImage(`${response.data.path}`)
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
          />
          {/* <Select
            isMulti
            options={allCategories}
            onChange={(e) =>
              setSelectedCategoryIds(e ? e.map((x) => x.value) : [])
            }
            value={allCategories.filter((item) =>
              selectedCategoryIds.includes(item.value)
            )}
          /> */}
        </div>
        <div
          className="column p"
          style={{ flex: '1 1 60px' }}>
          <h2 className="title text-center">{lang.or}</h2>
        </div>
        <div
          className="column p"
          style={{ flex: '10 1 300px' }}>
          <h2 className="title text-center">{lang.add_new_category}</h2>
          <form>
            <Input
              label={`${lang.product_name} lv`}
              {...name_lv}
              required
            />
            <Input
              label={`${lang.product_name} en`}
              {...name_en}
            />{' '}
            <Input
              label={`${lang.product_name} de`}
              {...name_de}
            />
            <Input
              label="ID"
              {...id}
              required
            />
            <img
              className="m-t"
              style={{ width: '200px' }}
              src={`/images/${image}`}
            />
            <Input
              required
              label=""
              filename={image}
              onChange={(e) => imageSelected(e)}
              type="file"
              accept="image/*"
            />
          </form>
        </div>
      </div>
    </BaseModal>
  )
}

export default CategoryModal
