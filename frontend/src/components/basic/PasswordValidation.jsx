import { useSelector } from 'react-redux'
import Input from './Input'
import { ValidPassword, ValidationFailed } from '../styled/base'

const PasswordWithValidation = ({
  password1,
  password2,
  blink,
  validLength,
  hasDigit,
  hasLetter,
  hasSpecial,
  doMatch,
  style,
}) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  return (
    <div style={style}>
      <Input
        label={lang.password}
        {...password1}
        required
      />
      <Input
        label={lang.confirm_password}
        {...password2}
        required
      />
      {password1.value.length > 0 && (
        <div className="p-t">
          {validLength && hasDigit && hasLetter && hasSpecial && doMatch ? (
            <ul className="validation accented">
              <li>✔ Valid password</li>
            </ul>
          ) : (
            <ul className={`validation ${blink && 'blink'}`}>
              {!validLength && <li>{lang.password_8_chars}</li>}
              {!hasDigit && <li>{lang.password_contain_digit}</li>}
              {!hasSpecial && <li>{lang.password_contain_special}</li>}
              {!hasLetter && <li>{lang.password_contain_letter}</li>}
              {!doMatch && <li>{lang.password_match}</li>}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default PasswordWithValidation
