import { useEffect, useState } from 'react'
import Categories from './productList/Categories'
import Carousel from './basic/Carousel'
import ProductList from './productList/ProductList'
import { useSelector } from 'react-redux'
import useCategoryService from '../services/category'
import styled from 'styled-components'

const TopRow = styled.div`
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  gap: calc(${(props) => props.theme.padding} / 2);
`

const StyledCarousel = styled.div`
  flex: 1 1 ${(props) => (props.theme.isMobile ? '100%' : '62.2%')};
`
const StyledCategories = styled.div`
  flex: 1 1 37%;
`

const HomePage = () => {
  const categoryService = useCategoryService()
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
    <div className="row wrap-reverse">
      <div
        className="column no-gap"
        style={{ flex: '2 1 370px' }}>
        <Carousel
          className="m-d"
          images={[
            'https://www.maiznica.lv/wp-content/uploads/2022/09/4.png',
            'https://www.maiznica.lv/wp-content/uploads/2019/11/maiznica.png',
            'https://www.maiznica.lv/wp-content/uploads/2022/07/Noform%C4%93jums-bez-nosaukuma-10-1.png',
            'https://www.maiznica.lv/wp-content/uploads/2021/06/maize_slider.jpg',
          ]}
        />
        {discountedProducts.products.length > 0 && (
          <div>
            <h1 className="big-title m-d">
              {discountedProducts.displayName[selectedLang]}
            </h1>
            <ProductList products={discountedProducts.products} />
          </div>
        )}
        {newProducts.products.length > 0 && (
          <div>
            <h1 className="big-title m-d">
              {newProducts.displayName[selectedLang]}
            </h1>
            <ProductList products={newProducts.products} />
          </div>
        )}
      </div>
      <div
        className="column"
        style={{ flex: '1 1 300px' }}>
        <Categories categories={allProducts.categories} />
      </div>
    </div>
  )
}

export default HomePage
