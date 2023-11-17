import { useState } from 'react'
import useProductService from '../services/product'
import { useEffect } from 'react'
import Fuse from 'fuse.js'
import { useSearchParams } from 'react-router-dom'
import useCategoryService from '../services/category'
import Categories from './productList/Categories'
import { useSelector } from 'react-redux'
import { useContext } from 'react'
import MobileContext from '../contexts/mobileContext'
import Search from './basic/Search'

const { default: ProductList } = require('./productList/ProductList')

const SearchPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const productService = useProductService()
  const categoryService = useCategoryService()
  const [searchedProducts, setSearchedProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [searchedCategories, setSearchedCategories] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [productFuse, setProductFuse] = useState(new Fuse([]))
  const [categoryFuse, setCategoryFuse] = useState(new Fuse([]))
  const [mobile, setIsMobile] = useContext(MobileContext)
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (mobile) {
        const query = searchQuery
        setSearchParams({ query: searchQuery })
        if (query) {
          setSearchedProducts(productFuse.search(query).map((r) => r.item))
          setSearchedCategories(categoryFuse.search(query).map((r) => r.item))
        } else {
          setSearchedProducts(allProducts)
          setSearchedCategories(allCategories)
        }
      } else if (searchParams) {
        const query = searchParams.get('query')
        if (query) {
          setSearchedProducts(productFuse.search(query).map((r) => r.item))
          setSearchedCategories(categoryFuse.search(query).map((r) => r.item))
        } else {
          setSearchedProducts(allProducts)
          setSearchedCategories(allCategories)
        }
      }
    }, 500)
    return () => clearTimeout(timeOutId)
  }, [
    searchParams,
    productFuse,
    categoryFuse,
    allCategories,
    allProducts,
    searchQuery,
  ])

  useEffect(() => {
    productService.getAll().then((products) => {
      setAllProducts(products)
      setProductFuse(
        new Fuse(products, {
          keys: [
            'name.lv',
            'name.en',
            'name.de',
            'ingredients.lv',
            'ingredients.en',
            'ingredients.de',
            'badges',
          ],
          ignoreLocation: true,
          threshold: 0.5,
        })
      )
    })
    categoryService.getAll().then((categories) => {
      console.log(categories)
      setAllCategories(categories)
      setCategoryFuse(
        new Fuse(categories, {
          keys: ['displayName.lv', 'displayName.en', 'displayName.de'],
          ignoreLocation: true,
          threshold: 0.5,
        })
      )
    })
    setSearchQuery(searchParams.get('query'))
  }, [])

  return (
    <div>
      {mobile && (
        <Search
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
          onClear={() => setSearchQuery('')}
        />
      )}
      {searchedCategories.length > 0 && (
        <h1 className="big-title m-d">{lang.found_categories}</h1>
      )}
      <Categories categories={searchedCategories} />
      {searchedProducts.length > 0 && (
        <h1 className="big-title m-d">{lang.found_products}</h1>
      )}
      <ProductList products={searchedProducts} />
    </div>
  )
}

export default SearchPage
