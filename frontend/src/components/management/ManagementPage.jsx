import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ManagementPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <div className="row">
        <Link to="categories">
          <button className="btn">{lang.categories}</button>
        </Link>
        <Link to="new_product">
          <button className="btn">{lang.new_product}</button>
        </Link>
        <Link to="sorting">
          <button className="btn">{lang.sorting}</button>
        </Link>
        <Link to="banners">
          <button className="btn">{lang.banner}</button>
        </Link>

        <Link to="settings">
          <button className="btn">{lang.settings}</button>
        </Link>
      </div>

      <Outlet />
    </div>
  )
}
export default ManagementPage
