import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import useBannerService from '../../services/banners'
import { Cross } from '@styled-icons/entypo/Cross'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import useField from '../../hooks/useField'
import Input from '../basic/Input'
import { useSelector } from 'react-redux'
import { gramsToKilos, toEnglishAlphabet } from '../../util/convert'
import useUploadService from '../../services/uploads'
import useCategoryService from '../../services/category'
import useProductService from '../../services/product'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'

const SortableBanner = ({ id, category, product, image, remove }) => {
  const productService = useProductService()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  const [productName, setProductName] = useState(product)
  useEffect(() => {
    if (product) {
      productService
        .getById(product)
        .then((response) =>
          setProductName(`${response.name.lv} ${gramsToKilos(response.weight)}`)
        )
    }
  }, [])

  return (
    <div
      className="card"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}>
      <div
        className="row no-gap align-cross-center"
        style={{ minHeight: '150px' }}>
        <img
          src={`/images/xl_${image}`}
          style={{ width: '300px', height: 'auto' }}
        />
        {category ? (
          <p className=" p card-text">
            {lang.links_to}
            {category}
          </p>
        ) : product ? (
          <p className=" p card-text">
            {lang.links_to}
            {productName}
          </p>
        ) : (
          <p className=" p card-text">{lang.links_to_nowhere}</p>
        )}
        <div className="spacer" />
        <button
          data-no-dnd="true"
          onClick={(e) => {
            remove()
          }}
          className="btn inverted cancel">
          <Cross className="icon-b" />
        </button>
      </div>
    </div>
  )
}
const NewBanner = ({ createBanner }) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const image = useField('image')
  const category = useField('select')
  const product = useField('select')
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const uploadService = useUploadService()
  const categoryService = useCategoryService()
  const productService = useProductService()
  const [allCategories, setAllCategories] = useState([])
  const [allProducts, setAllProducts] = useState([])
  useEffect(() => {
    categoryService.getAll().then((response) => {
      setAllCategories(
        response.map((c) => {
          return {
            value: c,
            label: c.displayName[selectedLang] || c.displayName.lv,
          }
        })
      )
    })
    productService.getAll().then((response) => {
      setAllProducts(
        response.map((p) => {
          return {
            value: p,
            label: `${p.name[selectedLang] || p.name.lv} ${gramsToKilos(
              p.weight
            )}`,
          }
        })
      )
    })
  }, [])
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
    uploadService.uploadBanner(formData).then((response) => {
      image.changeValue(`${response.data.path}`)
    })
  }

  return (
    <div className="row align-cross-end card p p-t-0 between">
      <Input
        label={lang.image}
        filename={image.value}
        onChange={(e) => imageSelected(e)}
        type="file"
        accept="image/*"
        required
      />
      <Input
        {...category}
        width={200}
        options={allCategories}
        label={lang.select_category}
      />
      <Input
        {...product}
        width={200}
        options={allProducts}
        label={lang.select_product}
      />
      <button
        onClick={() =>
          createBanner({
            image: image.value,
            category: category.value.value
              ? category.value.value.id
              : undefined,
            product: product.value.value ? product.value.value.id : undefined,
            id: image.value,
          })
        }
        className="btn">
        {lang.create}
      </button>
    </div>
  )
}

const BannerManagement = () => {
  const bannerService = useBannerService()
  const [bannerItems, setBannerItems] = useState([])
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  useEffect(() => {
    bannerService.get().then((response) =>
      setBannerItems(
        response.data.banners.map((b) => {
          return { ...b, id: b._id }
        })
      )
    )
  }, [])
  console.log(bannerItems)
  const handleDragEndBanner = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setBannerItems((categoryItems) => {
        const oldIndex = categoryItems.findIndex((i) => i.id === active.id)
        const newIndex = categoryItems.findIndex((i) => i.id === over.id)

        return arrayMove(categoryItems, oldIndex, newIndex)
      })
    }
  }
  const createBanner = (banner) => {
    setBannerItems([banner, ...bannerItems])
  }
  const update = () => {
    bannerService.update(bannerItems).then((response) => {
      toast.success(lang.toast_changes_saved)
    })
  }
  const removeBanner = (banner) => {
    setBannerItems(bannerItems.filter((c) => c.id !== banner.id))
  }
  return (
    <div className="m-t">
      <div className="row between align-cross-end m-d">
        <NewBanner createBanner={createBanner} />
        <button
          className="btn"
          onClick={update}>
          {lang.save_changes}
        </button>
      </div>
      <div className="column">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEndBanner}>
          <SortableContext
            items={bannerItems}
            strategy={verticalListSortingStrategy}>
            {bannerItems.map((c) => (
              <SortableBanner
                key={c.id}
                id={c.id}
                image={c.image}
                remove={() => removeBanner(c)}
                category={c.category}
                product={c.product}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
export default BannerManagement
