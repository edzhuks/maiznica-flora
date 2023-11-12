import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import { Plus } from '@styled-icons/entypo/Plus'
import { Minus } from '@styled-icons/entypo/Minus'
import { Trash } from '@styled-icons/boxicons-solid/Trash'
import { gramsToKilos } from '../../util/convert'
import { useDispatch, useSelector } from 'react-redux'
import { useCartServiceDispatch } from '../../reducers/cartReducer'
import UserContext from '../../contexts/userContext'
import Price from '../styled/Price'
import MobileContext from '../../contexts/mobileContext'
import Input from '../basic/Input'

const CardLink = styled(Link)`
  text-decoration: none;
  &:hover p {
    color: ${(props) => props.theme.main};
  }
  &:hover img {
    transform: scale(1.3) translateY(-40px) translateX(-20px);
    box-shadow: ${(props) => props.theme.shadow};
  }
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Title = styled.p`
  text-align: 'left';
  color: ${(props) => props.theme.text};
  font-size: 1rem;
  text-decoration: none;
  transition: 0.3s;
  margin: 0;
`

const CenteredPrice = styled.div`
  text-align: center;
  margin: ${(props) => props.theme.padding} 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-grow: 10;
`
const ImageWrapper = styled.div`
  background-color: ${(props) => props.theme.white};
  text-align: center;
  width: 10rem;
  height: 100%;
  display: flex;
`
const ProductImage = styled.img`
  border-radius: 5px;
  transition: 0.3s cubic-bezier(0.31, 0.27, 0, 1.61);
  object-fit: contain;
  background: ${(props) => props.theme.white};
  width: 10rem;
  aspect-ratio: 1;
  z-index: 10;
`

const BuyButton = styled.button`
  max-width: 50%;
  margin-left: ${(props) => props.theme.padding};
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.padding};
  width: 100%;
`

const MobileCard = styled.div`
  flex-direction: row;
  margin: calc(${(props) => props.theme.padding} / 2);
  width: clamp(350px, 380px, 380px);
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`

const CartButtonRow = styled(ButtonRow)`
  justify-content: space-between;
  align-items: center;
`

const Quantity = styled.span`
  font-size: 1.3rem;
  color: ${(props) => props.theme.dark};
`
const UnavailableText = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.light};
  text-align: right;
  margin-bottom: 0;
`
const ProductListItem = ({ inCart, product, quantity }) => {
  const { addItem, removeItem, changeQuantityOfItem } = useCartServiceDispatch()
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [user] = useContext(UserContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantityToAdd, setQuantityToAdd] = useState(
    product.bulkThreshold ? product.bulkThreshold : 1
  )
  const [isMobile] = useContext(MobileContext)
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
    dispatch(changeQuantityOfItem({ product, quantity: 1 }))
  }

  const removeSome = async () => {
    dispatch(changeQuantityOfItem({ product, quantity: -1 }))
  }

  return (
    <>
      <MobileCard>
        <CardLink to={`/products/${product.id}`}>
          <ImageWrapper>
            <ProductImage src={`/images/${product.image}`} />
          </ImageWrapper>
        </CardLink>
        <Column>
          <CardLink to={`/products/${product.id}`}>
            <Title>
              {product.name[selectedLang] || product.name.lv}{' '}
              {gramsToKilos(product.weight)}
            </Title>
            {!product.outOfStock && (
              <CenteredPrice>
                <Price
                  price={product.price}
                  discount={product.discount}
                  weight={product.weight}
                  bulkPrice={product.bulkPrice}
                  bulkThreshold={product.bulkThreshold}
                  isSmall
                />
              </CenteredPrice>
            )}
          </CardLink>
          {!product.outOfStock ? (
            <>
              {inCart ? (
                <CartButtonRow>
                  <button
                    className="inverted"
                    onClick={removeSome}>
                    <Minus />
                  </button>
                  <Quantity>{quantity}</Quantity>
                  <button
                    className="inverted"
                    onClick={addMore}>
                    <Plus />
                  </button>
                  <button
                    className="inverted"
                    onClick={removeFromCart}>
                    <Trash />
                  </button>
                </CartButtonRow>
              ) : (
                <ButtonRow>
                  <Input
                    value={quantityToAdd}
                    onChange={(event) => setQuantityToAdd(event.target.value)}
                    type="number"
                    style={{ maxWidth: '5rem' }}
                    $isonlightbackground
                  />
                  <BuyButton onClick={addToCart}>{lang.buy}</BuyButton>
                </ButtonRow>
              )}
            </>
          ) : (
            <UnavailableText>{lang.currently_unavailable}</UnavailableText>
          )}
        </Column>
      </MobileCard>
    </>
  )
}

export default ProductListItem
