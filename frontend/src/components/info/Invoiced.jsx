import { useSelector } from 'react-redux'

const Invoiced = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <h1 className="big-title m-b">{lang.order_invoiced}</h1>
      <p className="card-text wrap-n m-b">{lang.order_invoiced_info}</p>
    </div>
  )
}

export default Invoiced
