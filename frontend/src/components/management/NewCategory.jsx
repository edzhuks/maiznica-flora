import { useEffect } from 'react'
import useCategoryService from '../../services/category'
import useField from '../../hooks/useField'
import { useSelector } from 'react-redux'
import useUploadService from '../../services/uploads'
import Input from '../basic/Input'
import { toEnglishAlphabet } from '../../util/convert'
import { useParams } from 'react-router-dom'
import CategoryItem from '../productList/CategoryItem'
import useToast from '../../util/promiseToast'

const NewCategory = () => {
  const categoryId = useParams().categoryId
  const categoryService = useCategoryService()
  const uploadService = useUploadService()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const name_lv = useField('text')
  const name_en = useField('text')
  const name_de = useField('text')
  const id = useField('text')
  const image = useField('image')
  const { showPromiseToast } = useToast()

  const clear = () => {
    name_lv.clear()
    name_en.clear()
    name_de.clear()
    id.clear()
    image.clear()
  }

  useEffect(() => {
    if (categoryId) {
      categoryService.getCategory(categoryId).then((response) => {
        name_lv.changeValue(response.displayName.lv)
        name_de.changeValue(response.displayName.de)
        name_en.changeValue(response.displayName.en)
        image.changeValue(response.image)
        id.changeValue(response.id)
      })
    }
  }, [categoryId])

  const saveCategory = () => {
    if (!categoryId) {
      const promise = categoryService.addNew({
        newCategory: {
          displayName: {
            lv: name_lv.value,
            en: name_en.value,
            de: name_de.value,
          },
          id: id.value,
          image: image.value,
        },
      })
      showPromiseToast({
        promise,
        successMessage: lang.toast_changes_saved,
      })
      promise.then((response) => {
        clear()
      })
    } else {
      const promise = categoryService.edit({
        newCategory: {
          displayName: {
            lv: name_lv.value,
            en: name_en.value,
            de: name_de.value,
          },
          image: image.value,
        },
        id: id.value,
      })
      showPromiseToast({ promise, successMessage: lang.toast_changes_saved })
    }
  }

  const imageSelected = (event) => {
    event.preventDefault()
    const formData = new FormData()
    const blob = event.target.files[0]
    const noDiacritics = new File(
      [blob],
      toEnglishAlphabet(blob.name),

      {
        type: blob.type,
      }
    )
    formData.append('image', noDiacritics)
    uploadService.uploadImage(formData).then((response) => {
      image.changeValue(`${response.data.path}`)
    })
  }

  return (
    <div className="row full-width m-t">
      <div className=" p card">
        <h2 className="title text-center">{lang.add_new_category}</h2>
        <div>
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
            disabled={categoryId !== undefined}
          />
          <Input
            label={lang.image}
            filename={image.value}
            onChange={(e) => imageSelected(e)}
            type="file"
            accept="image/*"
            required
          />
          <button
            type="submit"
            onClick={saveCategory}
            className="btn m-t">
            {lang.save}
          </button>
        </div>
      </div>
      <div
        className="row"
        style={{ flex: '1 0 400px' }}>
        <CategoryItem
          name={name_lv.value || ' '}
          category={{ id: 1, image: image.value }}
        />
        <CategoryItem
          name={name_en.value || ' '}
          category={{ id: 2, image: image.value }}
        />
        <CategoryItem
          name={name_de.value || ' '}
          category={{ id: 3, image: image.value }}
        />
      </div>
    </div>
  )
}

export default NewCategory
