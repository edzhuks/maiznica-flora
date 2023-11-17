import { useSelector } from 'react-redux'

const EmailVerified = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div>
      <h1 className="big-title m-b">{lang.email_verified}</h1>
      <p className="wrap-n card-text m-b">{lang.can_start_shopping}</p>
    </div>
  )
}

export default EmailVerified
