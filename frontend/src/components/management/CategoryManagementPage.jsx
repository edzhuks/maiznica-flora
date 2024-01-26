import { Link, NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CategoryManagementPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <div className="header sub-header card">
        <NavLink
          className="tab"
          to="complete">
          {lang.catalogue}
        </NavLink>
        <NavLink
          className="tab"
          to="unlisted">
          {lang.unlisted}
        </NavLink>
        <NavLink
          className="tab"
          to="unavailable">
          {lang.unavailable}
        </NavLink>
        <NavLink
          className="tab"
          to="uncategorized">
          {lang.uncategorized}
        </NavLink>
      </div>

      <Outlet />
    </div>
  )
}
export default CategoryManagementPage
