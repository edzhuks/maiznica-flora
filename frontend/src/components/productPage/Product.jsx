import { useEffect, useState, useContext } from 'react'
import UserContext from '../../contexts/userContext'
import { useParams, useNavigate } from 'react-router-dom'
import {
  NumberInput,
  Button,
  Row,
  CancelButton,
  ProductImage,
  WrappableRow,
  Centerer,
  SubTitle,
  InputGroup,
  Label,
  ShadowInput,
  CompactInputGroup,
  Form,
  StyledInput,
} from '../styled/base'
import useProductService from '../../services/product'
import StaticInformation from './TextualInformation'
import { useDispatch, useSelector } from 'react-redux'
import { useCartServiceDispatch } from '../../reducers/cartReducer'
import styled from 'styled-components'
import BaseModal from '../management/BaseModal'
import useField from '../../hooks/useField'
import useToast from '../../util/promiseToast'

// const Center = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 100%;
//   flex-shrink: 10;
// `
const TipText = styled.span`
  color: ${(props) => props.theme.light};
  font-size: 0.7rem;
  font-weight: normal;
`
const DiscountModal = ({ visible, onSubmit, onCancel }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const discountPrice = useField('number')
  useEffect(() => {
    setStartDate(new Date())
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
          startDate: startDate,
          endDate: endDate,
        })
      }
      padding="20px 100px">
      <Form style={{ width: '300px' }}>
        <CompactInputGroup>
          <Label>
            {lang.discount_price}

            <NumberInput
              $isonlightbackground
              {...discountPrice}
            />
          </Label>
          <TipText>{lang.without_vat_cents}</TipText>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            {lang.start_date}
            <StyledInput
              type="date"
              $isonlightbackground
              valueAsDate={startDate}
              onChange={(e) => setStartDate(e.target.valueAsDate)}
            />
          </Label>
        </CompactInputGroup>
        <CompactInputGroup>
          <Label>
            {lang.end_date}
            <StyledInput
              type="date"
              $isonlightbackground
              valueAsDate={endDate}
              onChange={(e) => setEndDate(e.target.valueAsDate)}
            />
          </Label>
        </CompactInputGroup>
      </Form>
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

  const id = useParams().id
  const dispatch = useDispatch()
  const refresh = () => {
    productService.getById(id).then((p) => {
      console.log(p)
      setProduct(p)
      setQuantity(p.bulkThreshold ? p.bulkThreshold : 1)
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
      dispatch(addItem({ quantity: quantity, product }))
    }
  }

  const deleteProduct = () => {
    if (window.confirm(lang.confirm_delete)) {
      productService.deleteProduct(id).then(navigate('/'))
    }
  }
  const { showPromiseToast } = useToast()
  const createDiscount = (discount) => {
    const promise = productService.makeDiscount(id, discount)
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
      const promise = productService.removeDiscount(id)
      showPromiseToast({
        promise,
        successMessage: lang.toast_discount_removed,
      })
      promise.then((r) => {
        setProduct(r)
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
          <Row
            style={{
              gap: '20px',
              marginBottom: '20px',
            }}>
            <Button onClick={() => navigate(`/management/new_product/${id}`)}>
              {lang.edit_product}
            </Button>
            <Button onClick={() => setDiscountModal(true)}>
              {lang.create_discount}
            </Button>
            {product.discount && (
              <CancelButton onClick={removeDiscount}>
                {lang.remove_discount}
              </CancelButton>
            )}
            <CancelButton onClick={deleteProduct}>
              {lang.delete_product}
            </CancelButton>
          </Row>
        )}
        <WrappableRow
          style={{
            justifyContent: 'center',
          }}>
          <Centerer>
            {' '}
            <ProductImage src={product.image} />
          </Centerer>

          <StaticInformation
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            onOrder={addToCart}
          />
        </WrappableRow>
      </>
    )
}

export default Product
