import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Plus } from '@styled-icons/entypo/Plus'
import { Minus } from '@styled-icons/entypo/Minus'
import { Trash } from '@styled-icons/boxicons-solid/Trash'
import { gramsToKilos } from '../../util/convert'
import { useDispatch, useSelector } from 'react-redux'
import { useCartServiceDispatch } from '../../reducers/cartReducer'
import UserContext from '../../contexts/userContext'
import Price from '../basic/Price'
import Input from '../basic/Input'
import useField from '../../hooks/useField'

const ProductListItem = ({ inCart, product, quantity }) => {
  const { addItem, removeItem, changeQuantityOfItem } = useCartServiceDispatch()
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const [user] = useContext(UserContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const quantityToAdd = useField('number')
  const addToCart = () => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(addItem({ quantity: quantityToAdd.value, product }))
    }
  }
  useEffect(() => {
    quantityToAdd.changeValue(product.bulkThreshold ? product.bulkThreshold : 1)
  })
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
    <div
      className="card product-card row no-wrap no-gap stretch m-d"
      style={{ flex: '1 1 300px' }}>
      <Link to={`/products/${product.id}`}>
        <div className="product-image-small">
          <img src={`/images/md_${product.image}`} />
        </div>
      </Link>
      <div className="column no-gap">
        <Link
          className="column no-gap"
          to={`/products/${product.id}`}>
          <h3 className="product-title-small m m-d-0">
            {product.name[selectedLang] || product.name.lv}{' '}
            {gramsToKilos(product.weight)}
          </h3>
          {!product.outOfStock && (
            <div
              className="center-vh"
              style={{ flex: '10 1 auto' }}>
              <Price
                price={product.price}
                discount={product.discount}
                weight={product.weight}
                bulkPrice={product.bulkPrice}
                bulkThreshold={product.bulkThreshold}
                isSmall
              />
            </div>
          )}
        </Link>
        {!product.outOfStock ? (
          <>
            {inCart ? (
              <div className="row m evenly m-t-0 align-cross-center">
                <button
                  className="btn inverted icon-button"
                  onClick={removeSome}>
                  <Minus className="icon-b" />
                </button>
                <p style={{ fontSize: '1.3rem' }}>{quantity}</p>
                <button
                  className="btn inverted icon-button"
                  onClick={addMore}>
                  <Plus className="icon-b" />
                </button>
                <button
                  className="btn inverted icon-button"
                  onClick={removeFromCart}>
                  <Trash className="icon-m" />
                </button>
              </div>
            ) : (
              <div className="row align-cross-end m m-t-0">
                <Input
                  {...quantityToAdd}
                  width={100}
                  className="m-0"
                />
                <div className="float-to-end">
                  <button
                    className="btn"
                    onClick={addToCart}>
                    {lang.buy}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div
            className="center-vh"
            style={{ flex: '10 1 auto' }}>
            <p className="hint-text">{lang.currently_unavailable}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductListItem
