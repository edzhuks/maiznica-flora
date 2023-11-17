import ProductListItem from '../productList/ProductListItem'
import { useSelector } from 'react-redux'

const Cart = ({ content }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  return (
    <>
      {content && (
        <div>
          {content.length > 0 ? (
            <div className="row stretch no-row-gap">
              {content.map((item, index) => (
                <ProductListItem
                  inCart
                  quantity={item.quantity}
                  product={item.product}
                  key={item.product.id}
                />
              ))}
              <div className="spacer-300" />
              <div className="spacer-300" />
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
