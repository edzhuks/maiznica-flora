import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

const ManagementPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const { pathname } = useLocation()
  console.log(pathname.includes('categories'))
  console.log(pathname)
  const navigate = useNavigate()
  return (
    <div>
      <div
        className="header sub-header card"
        style={{ top: 'var(--header-height)' }}>
        <NavLink
          className="tab"
          to="categories"
          onClick={(event) => {
            event.preventDefault()
            navigate('categories/complete')
          }}>
          {lang.categories}
        </NavLink>
        <NavLink
          className="tab"
          to="new_product">
          {lang.new_product}
        </NavLink>
        <NavLink
          className="tab"
          to="new_category">
          {lang.new_category}
        </NavLink>
        <NavLink
          className="tab"
          to="sorting">
          {lang.sorting}
        </NavLink>
        <NavLink
          className="tab"
          to="banners">
          {lang.banner}
        </NavLink>
        <NavLink
          className="tab"
          to="settings">
          {lang.settings}
        </NavLink>
      </div>

      <Outlet />
    </div>
  )
}
export default ManagementPage
