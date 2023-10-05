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
} from '../styled/base'
import { Plus } from '@styled-icons/entypo/Plus'
import { Minus } from '@styled-icons/entypo/Minus'
import { Trash } from '@styled-icons/boxicons-solid/Trash'
import { centsToEuro, gramsToKilos } from '../../util/convert'
import { useDispatch } from 'react-redux'
import {
  addItem,
  changeQuantityOfItem,
  removeItem,
} from '../../reducers/cartReducer'
import UserContext from '../../contexts/userContext'

const ProductCard = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  width: calc(100% / 4 - 23px);
  min-width: 243px;
  background-color: #fbfbfb;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`
const CardLink = styled(Link)`
  text-decoration: none;
  &:hover p {
    color: #45941e;
  }
  &:hover img {
    transform: scale(1.1);
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
  overflow: hidden;
  background-color: white;
  text-align: center;
  width: 100%;
`
const ProductImage = styled.img`
  transform: scale(0.9);
  border-radius: 5px;
  transition: 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  object-fit: contain;
`

const BuyButton = styled(Button)`
  width: 40%;
`

const ProductListItem = ({ inCart, product, quantity }) => {
  const [user, setUser] = useContext(UserContext)
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
            width={260}
            height={260}
          />
        </ImageWrapper>

        <CenteredTitle style={{ marginLeft: 20, marginRight: 20 }}>
          {product.name}
        </CenteredTitle>
      </CardLink>
      <CenteredSubTitle>
        {gramsToKilos(product.weight)}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {centsToEuro(product.price)}
      </CenteredSubTitle>
      {product.rating && <h4>{product.rating}/10</h4>}
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
          <BuyButton onClick={addToCart}>BUY</BuyButton>
        </RowSpaceBetween>
      )}
    </ProductCard>
  )
}

export default ProductListItem
