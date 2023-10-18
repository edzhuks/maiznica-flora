import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  InvertedButton,
  NumberInput,
  RowSpaceBetween,
  Title,
  SubTitle,
  ProductCard,
} from '../styled/base'
import { Plus } from '@styled-icons/entypo/Plus'
import { Minus } from '@styled-icons/entypo/Minus'
import { Trash } from '@styled-icons/boxicons-solid/Trash'
import { centsToEuro, gramsToKilos } from '../../util/convert'
import { useDispatch, useSelector } from 'react-redux'
import {
  addItem,
  changeQuantityOfItem,
  removeItem,
  useCartServiceDispatch,
} from '../../reducers/cartReducer'
import UserContext from '../../contexts/userContext'

const CardLink = styled(Link)`
  text-decoration: none;
  &:hover p {
    color: #45941e;
  }
  &:hover img {
    transform: scale(1.3) translateY(-40px);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }
  margin-bottom: auto;
  flex-grow: 10;
`
const CenteredTitle = styled(Title)`
  text-align: center;
`

const CenteredSubTitle = styled(SubTitle)`
  text-align: center;
  margin-top: auto;
  margin-bottom: 0;
`
const ImageWrapper = styled.div`
  /* overflow: hidden; */
  background-color: white;
  text-align: center;
  width: 100%;
`
const ProductImage = styled.img`
  /* transform: scale(0.9); */
  border-radius: 5px;
  transition: 0.3s cubic-bezier(0.31, 0.27, 0, 1.61);
  object-fit: contain;
  z-index: 1000;
  background: white;
`

const BuyButton = styled(Button)`
  max-width: 50%;
`

const ProductListItem = ({ inCart, product, quantity }) => {
  const { addItem, removeItem, changeQuantityOfItem } = useCartServiceDispatch()
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [user] = useContext(UserContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantityToAdd, setQuantityToAdd] = useState(1)

  const addToCart = () => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(addItem({ quantity: quantityToAdd, product }))
    }
  }

  const removeFromCart = () => {
    dispatch(removeItem(product))
  }

  const addMore = async () => {
    dispatch(changeQuantityOfItem({ product, quantity: quantity + 1 }))
  }

  const removeSome = async () => {
    dispatch(changeQuantityOfItem({ product, quantity: quantity - 1 }))
  }

  return (
    <ProductCard>
      <CardLink to={`/products/${product.id}`}>
        <ImageWrapper>
          <ProductImage
            src={product.image}
            width={256}
            height={256}
          />
        </ImageWrapper>

        <CenteredTitle style={{ marginLeft: 20, marginRight: 20 }}>
          {product.name[selectedLang] || product.name.lv}
        </CenteredTitle>
      </CardLink>
      <CenteredSubTitle>
        {gramsToKilos(product.weight)}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {centsToEuro(product.price)}
      </CenteredSubTitle>
      {inCart ? (
        <RowSpaceBetween style={{ margin: 20, alignItems: 'center' }}>
          <InvertedButton onClick={removeSome}>
            <Minus />
          </InvertedButton>
          <SubTitle style={{ margin: 0 }}>{quantity}</SubTitle>
          <InvertedButton onClick={addMore}>
            <Plus />
          </InvertedButton>
          <InvertedButton onClick={removeFromCart}>
            <Trash />
          </InvertedButton>
        </RowSpaceBetween>
      ) : (
        <RowSpaceBetween style={{ margin: 20 }}>
          <NumberInput
            value={quantityToAdd}
            onChange={(event) => setQuantityToAdd(event.target.value)}
            type="number"
            $isonlightbackground
          />
          <BuyButton onClick={addToCart}>{lang.buy}</BuyButton>
        </RowSpaceBetween>
      )}
    </ProductCard>
  )
}

export default ProductListItem
