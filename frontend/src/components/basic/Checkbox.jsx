import Input from './Input'
import styled from 'styled-components'

const Radio = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin: 12px 0px;
  cursor: pointer;
  font-size: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 18px 18px 18px 0px;

  p {
    margin: 0px 0px 0px 50px;
  }

  /* Hide the browser's default radio button */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 0;
    height: 0;
  }

  /* Create a custom radio button */
  span {
    position: absolute;
    top: calc(${(props) => props.theme.padding}*2);
    left: calc(${(props) => props.theme.padding}*2);
    height: 25px;
    width: 25px;
    background-color: ${(props) => props.theme.lighter};
    border-radius: 50%;
  }

  /* On mouse-over, add a grey background color */
  &:hover input ~ span {
    background-color: ${(props) => props.theme.main};
  }

  /* When the radio button is checked, add a blue background */
  input:checked ~ span {
    background-color: ${(props) => props.theme.main};
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  span:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  input:checked ~ span:after {
    display: block;
  }

  /* Style the indicator (dot/circle) */
  span:after {
    top: 8px;
    left: 8px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${(props) => props.theme.white};
  }
`

const CheckBox = styled(Radio)`
  padding: 0;
  margin-bottom: 15px;
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
    border: solid ${(props) => props.theme.white};
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
