import { useSelector } from 'react-redux'
import { centsToEuro } from '../../util/convert'

const SmallPrice = ({
  price,
  bulkPrice,
  bulkThreshold,
  discount,
  style,
  className,
}) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const discountPrice =
    discount &&
    Date.parse(discount.startDate) <= new Date() &&
    Date.parse(discount.endDate) >= new Date()
      ? discount.discountPrice
      : undefined
  if (discountPrice) {
    return (
      <p
        className={`price-main ${className ? className : ''}`}
        style={style}>
        <span className="accented relative m-r-s">
          <span className="crossed-out accented" />
          {centsToEuro(price)}
        </span>
        <strong className="bad">{centsToEuro(discountPrice)}</strong>
      </p>
    )
  }
  if (bulkPrice) {
    return (
      <div
        className={`${className ? className : ''}`}
        style={style}>
        <p>
          <span className="hint-text small m-r-s">
            {`${lang.when_buying} ${bulkThreshold}+ `}
          </span>
          <span className="price-main accented">
            <strong>{centsToEuro(bulkPrice)}</strong>
          </span>
        </p>

        <p>
          <span className="hint-text small m-r-s">{`${lang.when_buying} 1`}</span>
          <span className="price-main medium small">{centsToEuro(price)}</span>
        </p>
      </div>
    )
  } else {
    return (
      <p
        className={`price-main accented ${className ? className : ''}`}
        style={style}>
        <strong>{centsToEuro(price)}</strong>
      </p>
    )
  }
}

const BigPrice = ({
  price,
  bulkPrice,
  bulkThreshold,
  discount,
  weight,
  style,
  className,
}) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const discountPrice =
    discount &&
    Date.parse(discount.startDate) <= new Date() &&
    Date.parse(discount.endDate) >= new Date()
      ? discount.discountPrice
      : undefined
  if (discountPrice) {
    return (
      <div
        className={`${className ? className : ''}`}
        style={style}>
        <p className="price-main big">
          <span className="accented relative m-r-s">
            <span className="crossed-out accented" />
            {centsToEuro(price)}
          </span>
          <strong className="bad m-r">{centsToEuro(discountPrice)}</strong>
          <span className="hint-text ">{lang.with_VAT}</span>
        </p>
        <p className="medium">
          <span className=" relative m-r-s">
            <span className="crossed-out" />
            {centsToEuro((price / weight) * 1000)}
          </span>
          {centsToEuro((discountPrice / weight) * 1000)}
          <span className="hint-text m-l-s">/ kg</span>
        </p>
      </div>
    )
  }
  if (bulkPrice) {
    return (
      <div
        style={style}
        className={`row ${className ? className : ''}`}>
        <div className="column no-gap m-r-b">
          <p className="product-text">
            {`${lang.when_buying} ${bulkThreshold} ${lang.or_more}`}
          </p>
          <p className="price-main big accented">
            <strong>{centsToEuro(bulkPrice)}</strong>
          </p>
          <p className="medium">
            {centsToEuro((bulkPrice / weight) * 1000)}
            <span className="hint-text m-l-s">/ kg</span>
          </p>
        </div>
        <div className="column no-gap">
          <p className="product-text">{`${lang.when_buying} 1`}</p>
          <p className="price-main big medium">
            <strong>{centsToEuro(price)}</strong>
            <span className="hint-text m-l-s">{lang.with_VAT}</span>
          </p>
          <p className="medium">
            {centsToEuro((price / weight) * 1000)}
            <span className="hint-text m-l-s">/ kg</span>
          </p>
        </div>
      </div>
    )
  } else {
    return (
      <div
        style={style}
        className={`column no-gap ${className ? className : ''}`}>
        <p className="price-main big accented">
          <strong>{centsToEuro(price)}</strong>
          <span className="hint-text m-l-s">{lang.with_VAT}</span>
        </p>
        <p className="medium">
          {centsToEuro((price / weight) * 1000)}
          <span className="hint-text m-l-s">/ kg</span>
        </p>
      </div>
    )
  }
}

const Price = ({
  price,
  bulkPrice,
  bulkThreshold,
  discount,
  weight,
  isSmall,
  style,
  className,
}) => {
  if (isSmall) {
    return (
      <SmallPrice
        price={price}
        bulkPrice={bulkPrice}
        bulkThreshold={bulkThreshold}
        discount={discount}
        style={style}
        className={className}
      />
    )
  }
  return (
    <BigPrice
      price={price}
      bulkPrice={bulkPrice}
      bulkThreshold={bulkThreshold}
      discount={discount}
      weight={weight}
      style={style}
      className={className}
    />
  )
}

export default Price
