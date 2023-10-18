import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('')
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
