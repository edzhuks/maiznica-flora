import { useEffect, useState } from 'react'
import { BigTitle, TightBigTitle, WrappableRow } from './styled/base'
import Categories from './productList/Categories'
import Carousel from './basic/Carousel'
import ProductList from './productList/ProductList'
import { useSelector } from 'react-redux'
import useCategoryService from '../services/category'
import { ScrollRestoration } from 'react-router-dom'
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
    <div>
      <TopRow>
        <StyledCarousel>
          <Carousel
            images={[
              'https://www.maiznica.lv/wp-content/uploads/2022/09/4.png',
              'https://www.maiznica.lv/wp-content/uploads/2019/11/maiznica.png',
              'https://www.maiznica.lv/wp-content/uploads/2022/07/Noform%C4%93jums-bez-nosaukuma-10-1.png',
              'https://www.maiznica.lv/wp-content/uploads/2021/06/maize_slider.jpg',
            ]}
          />
        </StyledCarousel>
        <StyledCategories>
          <Categories
            categories={allProducts.categories}
            tight={true}
          />
        </StyledCategories>
      </TopRow>
      {discountedProducts.products.length > 0 && (
        <div>
          <TightBigTitle>
            {discountedProducts.displayName[selectedLang]}
          </TightBigTitle>
          <ProductList products={discountedProducts.products} />
        </div>
      )}
      {newProducts.products.length > 0 && (
        <div>
          <TightBigTitle>{newProducts.displayName[selectedLang]}</TightBigTitle>
          <ProductList products={newProducts.products} />
        </div>
      )}
    </div>
  )
}

export default HomePage
