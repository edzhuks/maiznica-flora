import { useSelector } from 'react-redux'
import { BigTitle, SubTitle } from '../styled/base'

const Registered = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <BigTitle>{lang.verify_email}</BigTitle>
      <SubTitle>{lang.verification_instructions}</SubTitle>
    </div>
  )
}

export default Registered
