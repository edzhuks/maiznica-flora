import { Outlet } from 'react-router-dom'
import { Center, Centerer, LoginCard } from '../styled/base'

const InfoPage = () => {
  return (
    <div className="center-h">
      <div className="card p">
        <Outlet />
      </div>
    </div>
  )
}

export default InfoPage
