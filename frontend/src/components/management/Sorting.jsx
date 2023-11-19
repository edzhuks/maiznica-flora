import React, { useEffect, useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useCategoryService from '../../services/category'
import useField from '../../hooks/useField'
import Input from '../basic/Input'
import { useSelector } from 'react-redux'
import { gramsToKilos } from '../../util/convert'
import { toast } from 'react-toastify'
import { Cross } from '@styled-icons/entypo/Cross'
import useProductService from '../../services/product'

const SortableItem = ({ id, label, image, remove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      className="card"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}>
      <div className="row no-gap align-cross-center">
        <img
          src={`/images/${image}`}
          width={55}
          height={55}
        />
        <p className=" p card-text">{label}</p>
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

export const Sorting = () => {
  const categoryService = useCategoryService()
  const productService = useProductService()
  const [allCategories, setAllCategories] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const activeCategory = useField('select')
  const newCategory = useField('select')
  const [newCategories, setNewCategories] = useState([])
  const newProduct = useField('select')
  const [newProducts, setNewProducts] = useState([])
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[selectedLang])
  const [categoryItems, setCategoryItems] = useState([])
  const [productItems, setProductItems] = useState([])
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
  useEffect(() => {
    if (allCategories.length > 0) {
      selectCategory(allCategories[0])
    }
  }, [allCategories])

  const selectCategory = (category) => {
    setCategoryItems(category.value.categories)
    setProductItems(category.value.products)
    activeCategory.changeValue(category)
  }
  useEffect(() => {
    setNewCategories(
      allCategories
        .filter((c) => c.value.id !== activeCategory.value.value.id)
        .filter((c) => !categoryItems.find((cc) => cc.id === c.value.id))
    )
  }, [categoryItems])

  useEffect(() => {
    setNewProducts(
      allProducts.filter(
        (c) => !productItems.find((cc) => cc.id === c.value.id)
      )
    )
  }, [productItems])

  const saveChanges = () => {
    categoryService
      .addExisting({
        categoriesToAdd: categoryItems.map((c) => c.id),
        parentCategory: activeCategory.value.value.id,
      })
      .then(() => toast.success(lang.toast_changes_saved))
    categoryService.addProducts({
      productsToAdd: productItems.map((c) => c.id),
      parentCategory: activeCategory.value.value.id,
    })
  }
  const addNewCategory = (start) => {
    if (start) {
      setCategoryItems([newCategory.value.value, ...categoryItems])
    } else {
      setCategoryItems([...categoryItems, newCategory.value.value])
    }
    newCategory.clear()
  }
  const removeCategory = (category) => {
    setCategoryItems(categoryItems.filter((c) => c.id !== category.id))
  }
  const addNewProduct = (start) => {
    if (start) {
      setProductItems([newProduct.value.value, ...productItems])
    } else {
      setProductItems([...productItems, newProduct.value.value])
    }
    newProduct.clear()
  }
  const removeProduct = (product) => {
    setProductItems(productItems.filter((c) => c.id !== product.id))
  }

  return (
    <div>
      <div className="row between align-cross-end no-wrap card p m-t p-t-0">
        <Input
          width={300}
          {...activeCategory}
          options={allCategories}
          onChange={(item) => {
            selectCategory(item)
          }}
          label={lang.select_category}
        />
        <button
          onClick={saveChanges}
          className="btn">
          {lang.save}
        </button>
      </div>

      <div className="row m-t">
        <div className="column">
          <div className="card p-h p-d row align-cross-end">
            <Input
              width={300}
              {...newCategory}
              options={newCategories}
              label={lang.select_category}
            />
            <button
              onClick={() => addNewCategory(true)}
              className="btn">
              {lang.add}
            </button>
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEndCategories}>
            <SortableContext
              items={categoryItems}
              strategy={verticalListSortingStrategy}>
              {categoryItems.map((c) => (
                <SortableItem
                  key={c.id}
                  label={c.displayName[selectedLang] || c.displayName.lv}
                  id={c.id}
                  image={c.image}
                  remove={() => removeCategory(c)}
                />
              ))}
            </SortableContext>
          </DndContext>
          {categoryItems.length > 0 && (
            <div className="card p-h p-d row align-cross-end">
              <Input
                width={300}
                {...newCategory}
                options={newCategories}
                label={lang.select_category}
              />
              <button
                onClick={() => addNewCategory(false)}
                className="btn">
                {lang.add}
              </button>
            </div>
          )}
        </div>
        <div className="column no-gap">
          <div className="card p-h p-d row align-cross-end">
            <Input
              width={300}
              {...newProduct}
              options={newProducts}
              label={lang.select_product}
            />
            <button
              onClick={() => addNewProduct(true)}
              className="btn">
              {lang.add}
            </button>
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEndProducts}>
            <SortableContext
              items={productItems}
              strategy={verticalListSortingStrategy}>
              {productItems.map((p) => (
                <SortableItem
                  key={p.id}
                  label={`${p.name[selectedLang] || p.name.lv} ${gramsToKilos(
                    p.weight
                  )}`}
                  id={p.id}
                  image={p.image}
                  remove={() => removeProduct(p)}
                />
              ))}
            </SortableContext>
          </DndContext>
          {productItems.length > 0 && (
            <div className="card p-h p-d row align-cross-end">
              <Input
                width={300}
                {...newProduct}
                options={newProducts}
                label={lang.select_product}
              />
              <button
                onClick={() => addNewProduct(false)}
                className="btn">
                {lang.add}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  function handleDragEndCategories(event) {
    const { active, over } = event

    if (active.id !== over.id) {
      setCategoryItems((categoryItems) => {
        const oldIndex = categoryItems.findIndex((i) => i.id === active.id)
        const newIndex = categoryItems.findIndex((i) => i.id === over.id)

        return arrayMove(categoryItems, oldIndex, newIndex)
      })
    }
  }
  function handleDragEndProducts(event) {
    const { active, over } = event

    if (active.id !== over.id) {
      setProductItems((productItems) => {
        const oldIndex = productItems.findIndex((i) => i.id === active.id)
        const newIndex = productItems.findIndex((i) => i.id === over.id)

        return arrayMove(productItems, oldIndex, newIndex)
      })
    }
  }
}
