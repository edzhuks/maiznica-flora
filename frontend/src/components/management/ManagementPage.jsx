import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ManagementPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <div className="row">
        <Link to="categories">
          <button>{lang.categories}</button>
        </Link>
        <Link to="new_product">
          <button>{lang.new_product}</button>
        </Link>
      </div>

      <Outlet />
    </div>
  )
}
export default ManagementPage
