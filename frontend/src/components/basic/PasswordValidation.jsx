const { useSelector } = require('react-redux')
const {
  InputGroup,
  Label,
  StyledInput,
  ValidPassword,
  ValidationFailed,
} = require('../styled/base')

const PasswordWithValidation = ({
  password1,
  password2,
  passwordRequiredReminderVisible,
}) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  return (
    <div>
      <InputGroup>
        <Label>
          {lang.password}
          <StyledInput
            {...password1}
            $isonlightbackground
          />
        </Label>
      </InputGroup>
      <InputGroup>
        <Label>
          {lang.confirm_password}
          <StyledInput
            {...password2}
            $isonlightbackground
          />
        </Label>
      </InputGroup>
      {password1.value.length > 0 && (
        <div>
          {password1.value.length >= 8 &&
          /\d/.test(password1.value) &&
          /[!@#$%^&* ]/.test(password1.value) &&
          /[a-zA-Z]/.test(password1.value) &&
          password1.value === password2.value ? (
            <ValidPassword>
              <h3>✔ Valid password</h3>
            </ValidPassword>
          ) : (
            <ValidationFailed>
              <h3>{lang.password_must}</h3>
              <ul>
                {password1.value.length < 8 && <li>{lang.password_8_chars}</li>}
                {!/\d/.test(password1.value) && (
                  <li>{lang.password_contain_digit}</li>
                )}
                {!/[!@#$%^&* ]/.test(password1.value) && (
                  <li>{lang.password_contain_special}</li>
                )}
                {!/[a-zA-Z]/.test(password1.value) && (
                  <li>{lang.password_contain_letter}</li>
                )}
                {password1.value !== password2.value && (
                  <li>{lang.password_match}</li>
                )}
              </ul>
            </ValidationFailed>
          )}
        </div>
      )}

      {passwordRequiredReminderVisible && (
        <ValidationFailed>
          <h3>{lang.password_required}</h3>
        </ValidationFailed>
      )}
    </div>
  )
}

export default PasswordWithValidation
