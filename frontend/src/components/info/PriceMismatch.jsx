import { useSelector } from 'react-redux'

const PriceMismatch = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <h1 className="big-title m-b">{lang.toast_price_mismatch}</h1>
      <p className="wrap-n card-text m-b">{lang.price_mismatch}</p>
    </div>
  )
}

export default PriceMismatch
