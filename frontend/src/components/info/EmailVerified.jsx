import { useSelector } from 'react-redux'
import { BigTitle, SubTitle } from '../styled/base'

const EmailVerified = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <BigTitle>{lang.email_verified}</BigTitle>
      <SubTitle style={{ whiteSpace: 'pre-wrap' }}>
        {lang.can_start_shopping}
      </SubTitle>
    </div>
  )
}

export default EmailVerified
