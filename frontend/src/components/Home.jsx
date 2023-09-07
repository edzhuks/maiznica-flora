import useResource from '../hooks/useResource'
import ProductListItem from './productList/ProductListItem'
import UserContext from '../contexts/userContext'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { EmptyProductItem, ProductRow, Center, BigTitle } from './styled/base'
import Categories from './productList/Categories'
import { useParams } from 'react-router-dom'
import Carousel from './basic/Carousel'
import axios from 'axios'
import categoryService from '../services/category'
import ProductList from './productList/ProductList'

const HomePage = () => {
  const [newProducts, setNewProducts] = useState({ products: [] })

  useEffect(() => {
    categoryService.getNewProducts().then((p) => setNewProducts(p))
  }, [])
  return (
    <Center>
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
    </Center>
  )
}

export default HomePage
