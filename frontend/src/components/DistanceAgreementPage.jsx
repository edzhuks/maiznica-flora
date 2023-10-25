import { useSelector } from 'react-redux'
import { BigTitle } from './styled/base'

const DistanceAgreementPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <BigTitle>{lang.distance_agreement}</BigTitle>
    </div>
  )
}

export default DistanceAgreementPage
