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
} from '../styled/base'
import useProductService from '../../services/product'
import StaticInformation from './TextualInformation'
import { useDispatch, useSelector } from 'react-redux'
import { useCartServiceDispatch } from '../../reducers/cartReducer'

const Product = () => {
  const productService = useProductService()
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  const navigate = useNavigate()
  const { addItem } = useCartServiceDispatch()

  const [user, setUser] = useContext(UserContext)

  const [quantity, setQuantity] = useState(1)

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

  useEffect(() => {
    productService.getById(id).then((p) => {
      console.log(p)
      setProduct(p)
    })
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

  if (product)
    return (
      <>
        {user && user.admin && (
          <Row style={{ gap: '20px', marginBottom: '20px' }}>
            <Button onClick={() => navigate(`/management/new_product/${id}`)}>
              {lang.edit_product}
            </Button>

            <CancelButton onClick={deleteProduct}>
              {lang.delete_product}
            </CancelButton>
          </Row>
        )}
        <WrappableRow>
          <ProductImage src={product.image} />
          <div>
            <StaticInformation
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
              onOrder={addToCart}
            />
          </div>
        </WrappableRow>
      </>
    )
}

export default Product
