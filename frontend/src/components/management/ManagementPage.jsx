import { Button, Row } from '../styled/base'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ManagementPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <Row style={{ gap: '20px' }}>
        <Link to="categories">
          <Button>{lang.categories}</Button>
        </Link>
        <Link to="new_product">
          <Button>{lang.new_product}</Button>
        </Link>
      </Row>

      <Outlet />
    </div>
  )
}
export default ManagementPage
