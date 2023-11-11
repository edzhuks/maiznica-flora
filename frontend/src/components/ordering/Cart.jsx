import ProductListItem from '../productList/ProductListItem'
import { CardRow } from '../styled/base'
import { useSelector } from 'react-redux'

const Cart = ({ cart }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  return (
    <>
      {cart && (
        <div>
          {cart.length > 0 ? (
            <CardRow>
              {cart.map((item, index) => (
                <ProductListItem
                  inCart
                  quantity={item.quantity}
                  product={item.product}
                  key={item.product.id}
                />
              ))}
            </CardRow>
          ) : (
            <p>{lang.empty_cart}</p>
          )}
        </div>
      )}
    </>
  )
}

export default Cart
