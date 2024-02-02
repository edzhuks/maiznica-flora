import { useEffect, useState, useContext } from 'react'
import UserContext from '../../contexts/userContext'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import useProductService from '../../services/product'
import StaticInformation from './ProductInformation'
import { useDispatch, useSelector } from 'react-redux'
import { useCartServiceDispatch } from '../../reducers/cartReducer'
import BaseModal from '../basic/BaseModal'
import useField from '../../hooks/useField'
import useToast from '../../util/promiseToast'
import ProductList from '../productList/ProductList'
import Input from '../basic/Input'

const DiscountModal = ({ visible, onSubmit, onCancel }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const startDate = useField('date')
  const endDate = useField('date')
  const discountPrice = useField('number')
  useEffect(() => {
    startDate.changeValue(new Date())
  }, [])
  return (
    <BaseModal
      visible={visible}
      title={lang.create_discount}
      onClose={() => {
        onCancel()
      }}
      onSubmit={() =>
        onSubmit({
          discountPrice: discountPrice.value,
          startDate: startDate.value,
          endDate: endDate.value,
        })
      }>
      <form className="p-m">
        <Input
          {...discountPrice}
          required
          label={`${lang.discount_price} (${lang.in_cents} ${lang.with_VAT})`}
        />
        <Input
          {...startDate}
          required
          label={lang.start_date}
        />
        <Input
          {...endDate}
          required
          label={lang.end_date}
        />
      </form>
    </BaseModal>
  )
}

const Product = () => {
  const productService = useProductService()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  const navigate = useNavigate()
  const { addItem } = useCartServiceDispatch()

  const [user, setUser] = useContext(UserContext)

  const [quantity, setQuantity] = useState(1)
  const [discountModal, setDiscountModal] = useState(false)
  const [product, setProduct] = useState({
    name: '',
    description: '',
    ingredients: '',
    weight: 0,
    price: 0,
    EAN: '',
    image: '',
    bio: false,
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const eis = searchParams.get('eis') === 'true'
  const id = useParams().id
  const dispatch = useDispatch()
  const refresh = () => {
    productService
      .getById(id)
      .then((p) => {
        console.log(p)
        setProduct(p)
        setQuantity(p.bulkThreshold ? p.bulkThreshold : 1)
      })
      .catch((e) => {
        if (e.response.status === 404) {
          navigate('/not-found', { replace: true })
        }
      })
  }
  useEffect(() => {
    refresh()
    window.scrollTo(0, 0)
  }, [id])

  const addToCart = () => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(addItem({ quantity: quantity, productId: product.id }))
    }
  }

  const deleteProduct = () => {
    if (window.confirm(lang.confirm_delete)) {
      productService.deleteProduct(product.id).then(navigate('/'))
    }
  }
  const { showPromiseToast } = useToast()
  const createDiscount = (discount) => {
    const promise = productService.makeDiscount(product.id, discount)
    showPromiseToast({
      promise,
      successMessage: lang.toast_discount_created,
    })
    promise.then((r) => {
      setProduct(r.data)
      setDiscountModal(false)
    })
  }
  const removeDiscount = () => {
    if (window.confirm(lang.confirm_remove_discount)) {
      const promise = productService.removeDiscount(product.id)
      showPromiseToast({
        promise,
        successMessage: lang.toast_discount_removed,
      })
      promise.then((r) => {
        setProduct(r.data)
      })
    }
  }

  if (product)
    return (
      <>
        <DiscountModal
          visible={discountModal}
          onCancel={() => setDiscountModal(false)}
          onSubmit={createDiscount}
        />
        {user && user.admin && (
          <div className="row m-d">
            <button
              className="btn"
              onClick={() => navigate(`/management/new_product/${product.id}`)}>
              {lang.edit_product}
            </button>
            <button
              className="btn"
              onClick={() => setDiscountModal(true)}>
              {lang.create_discount}
            </button>
            {product.discount && (
              <button
                className="btn cancel"
                onClick={removeDiscount}>
                {lang.remove_discount}
              </button>
            )}
            <button
              className="btn cancel"
              onClick={deleteProduct}>
              {lang.delete_product}
            </button>
          </div>
        )}

        <StaticInformation
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
          onOrder={addToCart}
          className="m-d-b"
          eis={eis}
        />
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <>
            <h1 className="big-title m-d">{lang.related_products}</h1>
            <ProductList products={product.relatedProducts} />
          </>
        )}
      </>
    )
}

export default Product
