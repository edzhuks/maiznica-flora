import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'

import { gramsToKilos } from '../../util/convert'
import { useDispatch, useSelector } from 'react-redux'
import { useCartServiceDispatch } from '../../reducers/cartReducer'
import UserContext from '../../contexts/userContext'
import Price from '../basic/Price'
import Input from '../basic/Input'
import useField from '../../hooks/useField'
import { Warning } from '@styled-icons/ionicons-solid/Warning'

const ProductListItem = ({ inCart, product, quantity }) => {
  const { addItem } = useCartServiceDispatch()
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
      dispatch(
        addItem({ quantity: quantityToAdd.value, productId: product.id })
      )
    }
  }
  useEffect(() => {
    quantityToAdd.changeValue(product.bulkThreshold ? product.bulkThreshold : 1)
  }, [])

  return (
    <div
      className="card product-card row no-wrap no-gap stretch m-d"
      style={{ flex: '1 1 400px' }}>
      <Link to={`/products/${product.prettyID}`}>
        <div className="product-image-small">
          <img src={`https://www.maiznica.lv/images/lg_${product.image}`} />
        </div>
      </Link>
      <div className="p column no-gap">
        <Link
          className="column "
          to={`/products/${product.prettyID}`}>
          <h3 className="product-title-small ">
            {product.name[selectedLang] || product.name.lv}{' '}
            {gramsToKilos(product.weight)}
          </h3>
          <div
            className=" center-vh"
            style={{ flex: '1 1 auto' }}>
            {!product.invisible ? (
              <Price
                price={product.price}
                discount={product.discount}
                weight={product.weight}
                bulkPrice={product.bulkPrice}
                bulkThreshold={product.bulkThreshold}
                isSmall
              />
            ) : (
              <div
                className="center-vh"
                style={{ flex: '10' }}>
                <p className="hint-text">{lang.currently_unavailable}</p>
              </div>
            )}
          </div>
        </Link>
        {!product.invisible && (
          <div className="row align-cross-end m-t-0 end">
            {product.outOfStock && (
              <div className="tooltip">
                <Warning className="icon-b subtle" />
                <span className="tooltiptext">{lang.special_order}</span>
              </div>
            )}
            <Input
              {...quantityToAdd}
              width={70}
              className="m-0"
            />

            <button
              className="btn"
              onClick={addToCart}>
              {lang.buy}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductListItem
