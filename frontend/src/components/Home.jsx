import { useEffect, useState } from 'react'
import { BigTitle } from './styled/base'
import Categories from './productList/Categories'
import Carousel from './basic/Carousel'
import categoryService from '../services/category'
import ProductList from './productList/ProductList'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const [newProducts, setNewProducts] = useState({
    products: [],
    displayName: '',
  })
  const [discountedProducts, setDiscountedProducts] = useState({
    products: [],
    displayName: '',
  })
  const [allProducts, setAllProducts] = useState({
    categories: [],
    displayName: '',
  })

  useEffect(() => {
    categoryService.getNewProducts().then((p) => setNewProducts(p))
    categoryService
      .getDiscountedProducts()
      .then((p) => setDiscountedProducts(p))
    categoryService.getTopCategory().then((p) => setAllProducts(p))
  }, [])
  return (
    <div>
      <Carousel
        images={[
          'https://www.maiznica.lv/wp-content/uploads/2022/09/4.png',
          'https://www.maiznica.lv/wp-content/uploads/2019/11/maiznica.png',
          'https://www.maiznica.lv/wp-content/uploads/2022/07/Noform%C4%93jums-bez-nosaukuma-10-1.png',
          'https://www.maiznica.lv/wp-content/uploads/2021/06/maize_slider.jpg',
        ]}
      />
      {newProducts.products.length && (
        <div>
          <BigTitle>{newProducts.displayName[selectedLang]}</BigTitle>
          <ProductList products={newProducts.products} />
        </div>
      )}

      {discountedProducts.products.length > 0 && (
        <div>
          <BigTitle>{discountedProducts.displayName[selectedLang]}</BigTitle>
          <ProductList products={discountedProducts.products} />
        </div>
      )}

      <BigTitle>{allProducts.displayName[selectedLang]}</BigTitle>
      <Categories categories={allProducts.categories} />
    </div>
  )
}

export default HomePage
