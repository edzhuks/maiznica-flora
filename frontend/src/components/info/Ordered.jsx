import { useSelector } from 'react-redux'

const Ordered = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <h1 className="big-title m-b">{lang.order_completed}</h1>
      <p className="card-text wrap-n m-b">{lang.order_completed_info}</p>
    </div>
  )
}

export default Ordered
