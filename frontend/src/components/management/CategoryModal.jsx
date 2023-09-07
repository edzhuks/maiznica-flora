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
import axios from 'axios'
import { useState } from 'react'
import categoryService from '../../services/category'
import useField from '../../hooks/useField'

const CategoryModal = ({ visible, activeCategory, onClose, catalogue }) => {
  const [allCategories, setAllCategories] = useState([])
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([])
  const name = useField('text')
  const id = useField('text')
  const image = useField('text')

  useEffect(() => {
    categoryService.getAllIds().then((result) => {
      setAllCategories(
        result.data.map((category) => ({
          value: category._id,
          label: category.displayName,
        }))
      )
    })
  }, [])

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
          parentCategory: activeCategory._id,
        })
        .then((newCatalogue) => {
          clear()
          onClose(newCatalogue)
        })
    } else {
      categoryService
        .addNew({
          newCategory: {
            displayName: name.value,
            _id: id.value,
            image: image.value,
          },
          parentCategory: activeCategory._id,
        })
        .then((newCatalogue) => {
          clear()
          onClose(newCatalogue)
        })
    }
  }

  return (
    <ModalContainer style={{ display: visible ? 'block' : 'none' }}>
      <ModalContent style={{ maxWidth: '720px' }}>
        <BigTitle style={{ marginBottom: 15 }}>Add Category</BigTitle>
        <Row>
          <ModalHalf>
            <SubTitle>Select existing categories</SubTitle>
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
          </ModalHalf>
          <ModalOr>OR</ModalOr>
          <ModalHalf>
            <SubTitle>Add a new category</SubTitle>
            <Form>
              <CompactInputGroup>
                <Label>
                  Name
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
                  Image url
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
          Cancel
        </CancelButton>
        <Button
          style={{ margin: 20, float: 'right' }}
          onClick={addCategories}>
          Add
        </Button>
      </ModalContent>
    </ModalContainer>
  )
}

export default CategoryModal
