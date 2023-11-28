import { useEffect, useState } from 'react'
import Categories from './productList/Categories'
import Carousel from './basic/Carousel'
import ProductList from './productList/ProductList'
import { useSelector } from 'react-redux'
import useCategoryService from '../services/category'
import useBannerService from '../services/banners'

const HomePage = () => {
  const categoryService = useCategoryService()
  const bannerService = useBannerService()
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const [banners, setBanners] = useState([])
  console.log(banners)
  const [homeItems, setHomeItems] = useState({
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
    categoryService.getCategory('home').then((p) => setHomeItems(p))
    categoryService
      .getDiscountedProducts()
      .then((p) => setDiscountedProducts(p))
    categoryService.getTopCategory().then((p) => setAllProducts(p))
    bannerService.get().then((response) => setBanners(response.data.banners))
  }, [])
  return (
    <div className="row wrap-reverse">
      <div
        className="column no-gap"
        style={{ flex: '2 1 370px' }}>
        <Carousel
          className="m-d"
          banners={banners}
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
        {homeItems.categories &&
          homeItems.categories.map((c) => (
            <div>
              <h1 className="big-title m-d">{c.displayName[selectedLang]}</h1>
              <ProductList products={c.products} />
            </div>
          ))}
        {/* {newProducts.products.length > 0 && (
          <div>
            <h1 className="big-title m-d">
              {newProducts.displayName[selectedLang]}
            </h1>
            <ProductList products={newProducts.products} />
          </div>
        )} */}
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
