import { useState } from 'react'
import { ChevronDown } from '@styled-icons/heroicons-outline/ChevronDown'
import { ChevronUp } from '@styled-icons/heroicons-outline/ChevronUp'

const Collapsible = ({ title, children, className }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={className}>
      <div
        className="row no-wrap align-cross-center pointer"
        onClick={() => setOpen(!open)}>
        <h3 className="card-heading">{title}</h3>
        {open ? (
          <ChevronUp className="icon-b" />
        ) : (
          <ChevronDown className="icon-b" />
        )}
      </div>
      {open && (
        <div className="m-v">
          <div className="card-divider m-d" />
          {children}
        </div>
      )}
    </div>
  )
}
export default Collapsible
