import { Outlet } from 'react-router-dom'

const InfoPage = () => {
  return (
    <div className="center-h">
      <div className="card">
        <Outlet />
      </div>
    </div>
  )
}

export default InfoPage
