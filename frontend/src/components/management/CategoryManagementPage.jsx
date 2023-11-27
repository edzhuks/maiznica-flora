import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CategoryManagement from './CategoryManagement'

const CategoryManagementPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <div className="row m-t">
        <Link to="complete">
          <button className="btn">{lang.catalogue}</button>
        </Link>
        <Link to="unlisted">
          <button className="btn">{lang.unlisted}</button>
        </Link>
        <Link to="unavailable">
          <button className="btn">{lang.unavailable}</button>
        </Link>
        <Link to="uncategorized">
          <button className="btn">{lang.uncategorized}</button>
        </Link>
      </div>

      <Outlet />
    </div>
  )
}
export default CategoryManagementPage
