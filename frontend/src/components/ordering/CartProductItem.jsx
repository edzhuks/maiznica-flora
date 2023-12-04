import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Plus } from '@styled-icons/entypo/Plus'
import { Minus } from '@styled-icons/entypo/Minus'
import { Trash } from '@styled-icons/boxicons-solid/Trash'
import { calculateItemPrice, gramsToKilos } from '../../util/convert'
import { useDispatch, useSelector } from 'react-redux'
import { useCartServiceDispatch } from '../../reducers/cartReducer'
import Price from '../basic/Price'
import MobileContext from '../../contexts/mobileContext'
import { Warning } from '@styled-icons/ionicons-solid/Warning'

const WrappablePart = ({ product, quantity }) => {
  const { removeItem, changeQuantityOfItem } = useCartServiceDispatch()
  const dispatch = useDispatch()
  const removeFromCart = () => {
    dispatch(removeItem(product))
  }

  const addMore = async () => {
    dispatch(changeQuantityOfItem({ productId: product.id, quantity: 1 }))
  }

  const removeSome = async () => {
    dispatch(changeQuantityOfItem({ productId: product.id, quantity: -1 }))
  }
  return (
    <>
      <td style={{ width: '100%', minWidth: '9.5rem' }}>
        <Price
          price={product.price}
          discount={product.discount}
          weight={product.weight}
          bulkPrice={product.bulkPrice}
          bulkThreshold={product.bulkThreshold}
          isSmall
        />
      </td>
      <td>
        <button
          className="btn inverted icon-button"
          onClick={removeFromCart}>
          <Trash className="icon-m" />
        </button>
      </td>
      <td>
        <button
          className="btn inverted icon-button"
          onClick={removeSome}>
          <Minus className="icon-b" />
        </button>
      </td>
      <td>
        <p style={{ fontSize: '1.3rem' }}>{quantity}</p>
      </td>
      <td>
        <button
          className="btn inverted icon-button"
          onClick={addMore}>
          <Plus className="icon-b" />
        </button>
      </td>
      <td>
        <Price
          price={calculateItemPrice({ product, quantity })}
          isSmall
        />
      </td>
    </>
  )
}

const CartProductItem = ({ inCart, product, quantity }) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const [mobile] = useContext(MobileContext)
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  return (
    <>
      <tr className="m-d">
        <td to={`/products/${product.id}`}>
          <img
            className="image-xs"
            src={`https://www.maiznica.lv/images/xs_${product.image}`}
          />
        </td>
        <td style={{ width: '100%' }}>
          <Link to={`/products/${product.id}`}>
            <h3 className="product-title-small ">
              {product.name[selectedLang] || product.name.lv}{' '}
              {gramsToKilos(product.weight)}
              {product.outOfStock && (
                <div className="tooltip m-l">
                  <Warning className="icon-b bad" />
                  <span className="tooltiptext">{lang.special_order}</span>
                </div>
              )}
            </h3>
          </Link>
        </td>
        {!mobile && (
          <WrappablePart
            product={product}
            quantity={quantity}
          />
        )}
      </tr>
      {mobile && (
        <tr>
          <td colSpan={2}>
            <table style={{ width: '100%' }}>
              <tr style={{ boxShadow: 'none' }}>
                <WrappablePart
                  product={product}
                  quantity={quantity}
                />
              </tr>
            </table>
          </td>
        </tr>
      )}
    </>
  )
}

export default CartProductItem
