import { Outlet } from 'react-router-dom'
import { Center, Centerer, LoginCard } from '../styled/base'

const InfoPage = () => {
  return (
    <Centerer>
      <LoginCard style={{ width: 'fit-content' }}>
        <Outlet />
      </LoginCard>
    </Centerer>
  )
}

export default InfoPage
