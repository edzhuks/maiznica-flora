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
} from '../styled/base'
import Select from 'react-select'
import { useState } from 'react'
import useCategoryService from '../../services/category'
import useField from '../../hooks/useField'
import { useSelector } from 'react-redux'

const CategoryModal = ({ visible, activeCategory, onClose, catalogue }) => {
  const categoryService = useCategoryService()
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [allCategories, setAllCategories] = useState([])
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([])
  const name_lv = useField('text')
  const name_en = useField('text')
  const name_de = useField('text')
  const id = useField('text')
  const image = useField('text')

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
    image.clear()
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
            image: image.value,
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

  return (
    <ModalContainer style={{ display: visible ? 'block' : 'none' }}>
      <ModalContent>
        <BigTitle style={{ marginBottom: 15 }}>{lang.add_category}</BigTitle>
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
                    style={{ marginLeft: 20 }}
                    {...name_lv}
                  />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.product_name} en
                  <StyledInput
                    style={{ marginLeft: 20 }}
                    {...name_en}
                  />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.product_name} de
                  <StyledInput
                    style={{ marginLeft: 20 }}
                    {...name_de}
                  />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  ID
                  <StyledInput
                    style={{ marginLeft: 20 }}
                    {...id}
                  />
                </Label>
              </CompactInputGroup>
              <CompactInputGroup>
                <Label>
                  {lang.image_url}
                  <StyledInput
                    style={{ marginLeft: 20 }}
                    {...image}
                  />
                </Label>
              </CompactInputGroup>
            </Form>
          </ModalHalf>
        </Row>
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
          onClick={addCategories}>
          {lang.add}
        </Button>
      </ModalContent>
    </ModalContainer>
  )
}

export default CategoryModal
