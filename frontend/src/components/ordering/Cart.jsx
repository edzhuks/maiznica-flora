import ProductListItem from '../productList/ProductListItem'
import { useSelector } from 'react-redux'
import CartProductItem from './CartProductItem'

const Cart = ({ content }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  return (
    <>
      {content && (
        <div>
          {content.length > 0 ? (
            <div className="order-table cart-table">
              {content.map((item, index) => (
                <CartProductItem
                  inCart
                  quantity={item.quantity}
                  product={item.product}
                  key={item.product.id}
                />
              ))}
            </div>
          ) : (
            <h3 className="card-heading">{lang.empty_cart}</h3>
          )}
        </div>
      )}
    </>
  )
}

export default Cart
