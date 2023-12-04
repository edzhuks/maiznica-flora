import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div className="center-h">
      <div className="card">
        <div className="text-center">
          <h1 className="big-title m-b">{lang.page_not_found}</h1>
          <Link to="/">
            <button className="btn  m-b m-t-0">{lang.to_home}</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default NotFoundPage
