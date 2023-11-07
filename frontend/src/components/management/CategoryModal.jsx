import { useEffect } from 'react'
import {
  ModalContainer,
  ModalContent,
  ModalHalf,
  ModalOr,
  Row,
  BigTitle,
  SubTitle,
  Form,
  CompactInputGroup,
  Label,
  StyledInput,
  CancelButton,
  Button,
  ProductImage,
} from '../styled/base'
import Select from 'react-select'
import { useState } from 'react'
import useCategoryService from '../../services/category'
import useField from '../../hooks/useField'
import { useSelector } from 'react-redux'
import BaseModal from './BaseModal'
import useUploadService from '../../services/uploads'
import { backendURL } from '../../util/config'

const CategoryModal = ({ visible, activeCategory, onClose, catalogue }) => {
  const categoryService = useCategoryService()
  const uploadService = useUploadService()
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [allCategories, setAllCategories] = useState([])
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([])
  const name_lv = useField('text')
  const name_en = useField('text')
  const name_de = useField('text')
  const id = useField('text')
  const [image, setImage] = useState(
    'https://shop.mrpinball.com.au/wp-content/uploads/woocommerce-placeholder-510x510.png'
  )

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
        setSelectedCategoryIds(activeCategory.categories.map((c) => c.id))
      })
    }
  }, [selectedLang, activeCategory])

  const clear = () => {
    name_lv.clear()
    name_en.clear()
    name_de.clear()
    id.clear()
    setImage(
      'https://shop.mrpinball.com.au/wp-content/uploads/woocommerce-placeholder-510x510.png'
    )
    setSelectedCategoryIds([])
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
          categoriesToAdd: selectedCategoryIds,
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
      setImage(`${backendURL}${response.data.path}`)
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
      onSubmit={() => addCategories()}
      padding="20px 20px">
      <Row style={{ flexWrap: 'wrap' }}>
        <ModalHalf>
          <SubTitle>{lang.select_existing_categories}</SubTitle>
          <div style={{ width: '360px' }}>
            <Select
              isMulti
              options={allCategories}
              onChange={(e) =>
                setSelectedCategoryIds(e ? e.map((x) => x.value) : [])
              }
              value={allCategories.filter((item) =>
                selectedCategoryIds.includes(item.value)
              )}
            />
          </div>
        </ModalHalf>
        <ModalOr>{lang.or}</ModalOr>
        <ModalHalf>
          <SubTitle>{lang.add_new_category}</SubTitle>
          <Form>
            <CompactInputGroup>
              <Label>
                {lang.product_name} lv
                <StyledInput
                  $isonlightbackground
                  {...name_lv}
                />
              </Label>
            </CompactInputGroup>
            <CompactInputGroup>
              <Label>
                {lang.product_name} en
                <StyledInput
                  $isonlightbackground
                  {...name_en}
                />
              </Label>
            </CompactInputGroup>
            <CompactInputGroup>
              <Label>
                {lang.product_name} de
                <StyledInput
                  $isonlightbackground
                  {...name_de}
                />
              </Label>
            </CompactInputGroup>
            <CompactInputGroup>
              <Label>
                ID
                <StyledInput
                  $isonlightbackground
                  {...id}
                />
              </Label>
            </CompactInputGroup>
            <ProductImage
              style={{ width: '200px' }}
              src={image}
            />
            <CompactInputGroup>
              <Label>
                <input
                  filename={image}
                  onChange={(e) => imageSelected(e)}
                  type="file"
                  accept="image/*"
                />
              </Label>
            </CompactInputGroup>
          </Form>
        </ModalHalf>
      </Row>
    </BaseModal>
  )
}

export default CategoryModal
