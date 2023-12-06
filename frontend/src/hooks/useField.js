import { useEffect, useState } from 'react'

const useField = (type, defaultValue) => {
  if (defaultValue === undefined) {
    if (type === 'checkbox' || type === 'radion') {
      defaultValue = false
    } else if (type === 'select') {
      defaultValue = []
    } else if (type === 'toggle') {
      defaultValue = true
    } else if (type === 'number') {
      defaultValue = ''
    } else if (type === 'image') {
      defaultValue = 'placeholder.jpeg'
    } else {
      defaultValue = ''
    }
  }
  const [value, setValue] = useState(defaultValue)
  const onChange = (event) => {
    if (type === 'phone') {
      setValue(event)
    } else if (type === 'select') {
      setValue(event)
    } else if (type === 'checkbox') {
      setValue(event)
    } else {
      setValue(event.target.value)
    }
  }
  useEffect(() => clear(), [])
  const clear = () => {
    setValue(defaultValue)
  }

  const changeValue = (newValue) => {
    setValue(newValue)
  }

  return {
    type,
    value,
    onChange,
    clear,
    changeValue,
  }
}

export default useField
