import { useSelector } from 'react-redux'
import { BigTitle, SubTitle } from '../styled/base'

const Ordered = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <BigTitle>{lang.order_completed}</BigTitle>
      <SubTitle style={{ whiteSpace: 'pre-wrap' }}>
        {lang.order_completed_info}
      </SubTitle>
    </div>
  )
}

export default Ordered
