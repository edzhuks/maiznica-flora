import { useEffect, useState } from 'react'
import { BigTitle } from './styled/base'
import Categories from './productList/Categories'
import Carousel from './basic/Carousel'
import categoryService from '../services/category'
import ProductList from './productList/ProductList'

const HomePage = () => {
  const [newProducts, setNewProducts] = useState({ products: [] })
  const [allProducts, setAllProducts] = useState({ categories: [] })

  useEffect(() => {
    categoryService.getNewProducts().then((p) => setNewProducts(p))
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
      <BigTitle>New Products</BigTitle>
      <ProductList products={newProducts.products} />

      <BigTitle>Special Offers</BigTitle>
      <ProductList products={newProducts.products} />

      <BigTitle>Prodcuts</BigTitle>
      <Categories categories={allProducts.categories} />
    </div>
  )
}

export default HomePage
