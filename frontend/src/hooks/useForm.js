import { useState } from 'react'

const useForm = (fields) => {
  const [values, setValues] = useState({})

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

export default useForm
