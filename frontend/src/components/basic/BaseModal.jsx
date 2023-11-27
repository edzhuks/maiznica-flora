import { useSelector } from 'react-redux'

const BaseModal = ({ children, visible, title, onClose, onSubmit }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div
      className="modal-container"
      style={{ display: visible ? 'block' : 'none' }}>
      <div className="modal card">
        <h1 className="big-title p-t-b">{title}</h1>
        <div>{children}</div>
        <div className="row end p-m">
          <button
            className="btn cancel"
            onClick={() => {
              onClose()
            }}>
            {lang.cancel}
          </button>
          <button
            className="btn"
            onClick={onSubmit}>
            {lang.add}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BaseModal
