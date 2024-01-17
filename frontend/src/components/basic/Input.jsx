import Select, { components } from 'react-select'
import PhoneInput from 'react-phone-number-input'
const { ValueContainer, Placeholder, Control } = components

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder
        {...props}
        isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {children.map((child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  )
}

const Input = ({
  clear,
  changeValue,
  className,
  type,
  label,
  width,
  option1,
  option2,
  options,
  required,
  children,
  ...props
}) => {
  if (type === 'select') {
    return (
      <Select
        {...props}
        className="m-t-m"
        closeMenuOnSelect={!props.isMulti}
        isMulti={props.isMulti}
        placeholder={label}
        options={options}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e)
          } else {
            changeValue(e ? e : [])
          }
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 'var(--border-radius)',
          colors: {
            ...theme.colors,
            primary: 'var(--accent)',
            primary25: 'var(--subtler)',
          },
        })}
        classNames={{
          control: () => 'select',
          placeholder: (state) =>
            `label ${
              state.hasValue || state.selectProps.inputValue || state.isFocused
                ? 'label-active'
                : ''
            } ${required ? 'required' : ''}`,
          menu: () => 'is-surface',
          singleValue: () => 'main',
        }}
        components={{
          ValueContainer: CustomValueContainer,
        }}
        styles={{
          valueContainer: (provided, state) => ({
            ...provided,
            overflow: 'show',
            padding: 0,
            width: '80%',
          }),
          multiValue: (provided, state) => ({
            ...provided,
            maxWidth: '300px',
            whiteSpace: 'break-spaces',
          }),
          container: (provided, state) => ({
            ...provided,
            width: width,
            boxShadow: state.isFocused ? '0 2px 0 var(--accent)' : '',
          }),
        }}
      />
    )
  }
  if (type === 'toggle') {
    return (
      <div className="toggle">
        <button
          onClick={() => {
            changeValue(true)
          }}
          className={`btn ${props.value && 'toggle-active'}`}>
          {option1}
        </button>
        <button
          onClick={() => {
            changeValue(false)
          }}
          className={`btn ${!props.value && 'toggle-active'}`}>
          {option2}
        </button>
      </div>
    )
  }
  if (type === 'checkbox') {
    return (
      <div className={`checkbox-group ${className ? className : ''}`}>
        <label>
          <input
            {...props}
            checked={props.value}
            onChange={() => props.onChange(!props.value)}
            type="checkbox"
            placeholder=" "
          />
          <span className="checkbox" />
          {children || <span className="label">{label}</span>}
        </label>
      </div>
    )
  }
  if (type === 'image') {
    return (
      <div
        style={{ width: width }}
        className={`input-group ${className ? className : ''}`}>
        <label>
          <input
            {...props}
            required={required}
            type={type}
            placeholder=" "
          />
          <span className="label">{label}</span>
          <span className="bar"></span>
        </label>
      </div>
    )
  }
  if (type === 'phone') {
    return (
      <div
        style={{ width: width }}
        className={`phone-input input-group ${className ? className : ''}`}>
        <label>
          <PhoneInput
            required={required}
            {...props}
            defaultCountry="LV"
          />
          <span className={`label ${props.value ? 'label-active' : ''}`}>
            {label}
          </span>
          <span className="bar"></span>
        </label>
      </div>
    )
  }
  return (
    <div
      className={`input-group ${className ? className : ''}`}
      style={{ width: width }}>
      <label>
        {(() => {
          switch (type) {
            case 'textarea':
              return (
                <textarea
                  className={props.expanded ? 'expanded' : ''}
                  required={required}
                  {...props}
                  placeholder={props.placeholder ? props.placeholder : ' '}
                />
              )

            default:
              return (
                <input
                  required={required}
                  {...props}
                  type={type}
                  placeholder=" "
                />
              )
          }
        })()}

        <span className="label">{label}</span>
        <span className="highlight"></span>
        <span className="bar"></span>
      </label>
    </div>
  )
}
export default Input
