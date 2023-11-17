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
      defaultValue = undefined
    } else if (type === 'image') {
      defaultValue = 'placeholder.jpeg'
    } else {
      defaultValue = ''
    }
  }
  const [value, setValue] = useState(defaultValue)
  const onChange = (event) => {
    setValue(event.target.value)
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
