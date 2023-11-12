const Input = ({ clear, changeValue, type, label, width, ...props }) => {
  return (
    <div
      className="input-group"
      style={{ width: width }}>
      <label>
        {type === 'textarea' ? (
          <textarea
            {...props}
            placeholder=" "
          />
        ) : (
          <input
            {...props}
            type={type}
            placeholder=" "
          />
        )}
        <span className="label">{label}</span>
        <span className="highlight"></span>
        <span className="bar"></span>
      </label>
    </div>
  )
}
export default Input
