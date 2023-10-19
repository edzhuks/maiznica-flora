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
  Price,
  BigProductTitle,
} from '../styled/base'
import { Plus } from '@styled-icons/entypo/Plus'
import { Minus } from '@styled-icons/entypo/Minus'
import { Trash } from '@styled-icons/boxicons-solid/Trash'
import { centsToEuro, gramsToKilos, addVat } from '../../util/convert'
import { useDispatch, useSelector } from 'react-redux'
import { useCartServiceDispatch } from '../../reducers/cartReducer'
import UserContext from '../../contexts/userContext'

const CardLink = styled(Link)`
  text-decoration: none;
  &:hover p {
    color: ${(props) => props.theme.main};
  }
  &:hover img {
    transform: scale(1.3) translateY(-40px);
    box-shadow: ${(props) => props.theme.shadow};
  }
  margin-bottom: auto;
  flex-grow: 10;
`
const CenteredTitle = styled(Title)`
  text-align: center;
`

const CenteredSubTitle = styled.div`
  text-align: center;
  margin: -10px 0px;
`
const ImageWrapper = styled.div`
  /* overflow: hidden; */
  background-color: ${(props) => props.theme.white};
  text-align: center;
  width: 100%;
`
const ProductImage = styled.img`
  /* transform: scale(0.9); */
  border-radius: 5px;
  transition: 0.3s cubic-bezier(0.31, 0.27, 0, 1.61);
  object-fit: contain;
  z-index: 1000;
  background: ${(props) => props.theme.white};
`

const BuyButton = styled(Button)`
  max-width: 50%;
`

const PriceText = styled.h1`
  font-size: 28px;
  color: ${(props) => props.theme.error};
  strong {
    color: ${(props) => props.theme.main};
    /* text-decoration: line-through 3px; */
    position: relative;
  }
  strong::before {
    content: '';
    border-top: 5px solid ${(props) => props.theme.main};
    width: 70px;
    display: block;
    transform: rotate(-20deg);
    left: 0;
    top: 14px;
    position: absolute;
  }
`
const KiloPriceText = styled.p`
  font-size: 18px;
  color: ${(props) => props.theme.error};
  strong {
    color: ${(props) => props.theme.main};
    position: relative;
    font-weight: normal;
  }
  strong::before {
    content: '';
    border-top: 3px solid ${(props) => props.theme.main};
    width: 50px;
    display: block;
    transform: rotate(-20deg);
    left: 0;
    top: 10px;
    position: absolute;
  }
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
          {product.name[selectedLang] || product.name.lv}{' '}
          {gramsToKilos(product.weight)}
        </CenteredTitle>
      </CardLink>
      <CenteredSubTitle>
        <Price style={{ margin: '0px' }}>
          {product.discountPrice ? (
            <>
              <PriceText>
                <strong>{centsToEuro(addVat(product.price))}</strong>
                &nbsp;&nbsp;
                {centsToEuro(addVat(product.discountPrice))}
                <span>{lang.with_VAT}</span>
              </PriceText>
              <KiloPriceText>
                <strong>
                  {centsToEuro((addVat(product.price) / product.weight) * 1000)}
                </strong>
                &nbsp;&nbsp;
                {centsToEuro(
                  (addVat(product.discountPrice) / product.weight) * 1000
                ).substring(1)}{' '}
                € / kg
              </KiloPriceText>
            </>
          ) : (
            <>
              <BigProductTitle>
                {centsToEuro(addVat(product.price))}
                {product.discountPrice}
                <span>{lang.with_VAT}</span>
              </BigProductTitle>

              <KiloPriceText>
                {centsToEuro(
                  (addVat(product.price) / product.weight) * 1000
                ).substring(1)}{' '}
                € / kg
              </KiloPriceText>
            </>
          )}
        </Price>
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
