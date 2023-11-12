import { useSelector } from 'react-redux'
import { BigTitle, SubTitle } from '../styled/base'

const Registered = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <h1 className="big-title m-b">{lang.verify_email}</h1>
      <p className="wrap-n card-text m-b">{lang.verification_instructions}</p>
    </div>
  )
}

export default Registered
