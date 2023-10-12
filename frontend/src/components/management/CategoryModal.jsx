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
import categoryService from '../../services/category'
import useField from '../../hooks/useField'
import { useSelector } from 'react-redux'

const CategoryModal = ({ visible, activeCategory, onClose, catalogue }) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [allCategories, setAllCategories] = useState([])
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([])
  const name = useField('text')
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
    name.clear()
    id.clear()
    image.clear()
    setSelectedCategoryIds([])
  }

  const addCategories = () => {
    if (selectedCategoryIds.length) {
      categoryService
        .addExisting({
          categoriesToAdd: selectedCategoryIds,
          parentCategory: activeCategory.id,
        })
        .then(() => {
          clear()
          onClose()
        })
    } else {
      categoryService
        .addNew({
          newCategory: {
            displayName: name.value,
            id: id.value,
            image: image.value,
          },
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
                  {lang.product_name}
                  <StyledInput
                    style={{ marginLeft: 20 }}
                    {...name}
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
