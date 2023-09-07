import Input from './Input'
import styled from 'styled-components'
import { Radio } from '../styled/base'

const CheckBox = styled(Radio)`
  padding: 0;
  margin-bottom: 38px;
  p {
    color: #777777;
    font-size: 16px;
  }
  span {
    border-radius: 5px;
    top: -4px;
    left: 0;
  }
  span:after {
    background: transparent;
    left: 9px;
    top: 5px;
    width: 8px;
    height: 13px;
    border: solid white;
    border-width: 0 3px 3px 0;
    border-radius: 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

const Checkbox = ({ checked, onChange, label }) => {
  return (
    <CheckBox>
      <Input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span></span>
      <p>{label}</p>
    </CheckBox>
  )
}

export default Checkbox
