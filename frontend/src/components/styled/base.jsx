import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../basic/Input'

const Container = styled.div`
  max-width: 1350px;
  margin: auto;
  padding: 0 18px;
`
const FullHeightContainer = styled(Container)`
  min-height: 100vh;
  padding-bottom: 100px;
`
const Center = styled.div`
  align-items: center;
`

const Row = styled.div`
  display: flex;
`

const RowSpaceBetween = styled(Row)`
  justify-content: space-between;
`

const RowSpaceEvenly = styled(Row)`
  justify-content: space-evenly;
`

const Button = styled.button`
  cursor: pointer;
  border: 0;
  color: white;
  padding: 5px 20px;
  border-radius: 2px;
  font-size: 18px;
  font-weight: 600;
  background-color: #45941e;
  transition: 0.3s;
  min-width: 40px;
  height: 38px;
  &:hover {
    background-color: #3f861b;
  }
  text-transform: uppercase;
  text-rendering: optimizeLegibility;
  font-family: 'Roboto Slab', serif;
  letter-spacing: 1px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`

const CancelButton = styled(Button)`
  background-color: red;
  &:hover {
    background-color: darkred;
  }
`

const FullWidthButton = styled(Button)`
  width: 100%;
`

const FullWidthCancelButton = styled(FullWidthButton)`
  background-color: red;
  &:hover {
    background-color: darkred;
  }
`
const InvertedButton = styled(Button)`
  padding: 1px 4px;
  background-color: transparent;
  box-shadow: none;
  font-weight: bold;
  color: #999999;
  &:hover {
    background-color: transparent;
    color: #45941e;
  }
`

const StyledInput = styled(Input)`
  height: 38px;
  border: 0px;
  color: #888888;
  border-radius: 2px;
  border: 1px solid
    ${(props) => (props.$isonlightbackground ? '#f1f1f1' : 'white')};
  background-color: ${(props) =>
    props.$isonlightbackground ? '#f1f1f1' : 'white'};
  &:focus {
    outline: none;
    border: 1px solid #e5e5e5;
    border-color: #45941e;
  }
  font-size: large;
  /* box-shadow: inset 0 0 15px #ccc; */
`

const TextArea = styled.textarea`
  width: 300px;
  border: 1px solid #ffffffff;
  color: #888888;
  border-radius: 2px;
  &:focus {
    outline: none;
    border-color: #45941e;
  }
  font-size: medium;
  &:focus {
    outline: none;
    border: 1px solid #e5e5e5;
    border-color: #45941e;
  }
`

const NumberInput = styled(StyledInput)`
  width: 100px;
`
const WideNumberInput = styled(NumberInput)`
  width: 217px;
`

const Form = styled.form`
  min-width: 100px;
  display: inline-block;
  ${StyledInput} {
    float: right;
    margin-left: 28px;
  }
  ${TextArea} {
    margin-left: 28px;
    float: right;
  }
  ${WideNumberInput} {
    margin-left: 28px;
    float: right;
  }
`

const Title = styled.p`
  color: #333333;
  font-size: 18px;
  text-decoration: none;
  margin: 20px 0px;
  transition: 0.3s;
`

const SubTitle = styled.p`
  color: #777777;
  font-size: 18px;
  text-decoration: none;
  margin: 20px 0px;
`

const Right = styled.span`
  text-align: right;
`

const ColoredText = styled.span`
  color: #45941e;
`

const Label = styled.label`
  color: #555555;
  display: block;
  line-height: 40px;
  text-transform: none;
  &::first-letter {
    text-transform: uppercase;
  }
`
const BigTitle = styled.div`
  font-family: 'Roboto Slab', serif;
  font-size: 28px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 20px 0px 50px 0px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  &::before,
  ::after {
    content: '';
    border-top: 1px solid #333333;
    margin: 0 20px 0 0;
    flex: 1 0 20px;
  }
  &::after {
    margin: 0 0 0 20px;
  }
`

const Centerer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const LoginCard = styled.div`
  background-color: white;
  padding: 58px;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`

const InputGroup = styled.div`
  margin-bottom: 15px;
`

const CompactInputGroup = styled(InputGroup)`
  margin-bottom: 10px;
  overflow: auto;
`

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
    top: 25px;
    left: 20px;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
  }

  /* On mouse-over, add a grey background color */
  &:hover input ~ span {
    background-color: #ccc;
  }

  /* When the radio button is checked, add a blue background */
  input:checked ~ span {
    background-color: #45941e;
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
    background: white;
  }
`

const ModalContainer = styled.div`
  /* display: none; Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 50; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: #474e5da9;
  padding-top: 50px;
`
const ModalContent = styled.div`
  background-color: #f8f8f8;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  max-width: 1020px; /* Could be more or less, depending on screen size */
  overflow: visible;
`

const ModalHalf = styled.div`
  width: 45%;
  flex: 0 0 45%;
  padding: 18px;
`
const ModalOr = styled.div`
  width: 10%;
  padding-top: 80px;
  font-size: 30px;
  color: #777777;
  text-align: center;
  text-transform: uppercase;
`

const HalfWidth = styled.div`
  width: 50%;
  padding: 30px;
`

const ContactText = styled.p`
  letter-spacing: 1px;
  line-height: 1.5;
`

const ProductCard = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  width: calc(100% / 4 - 23px);
  min-width: 243px;
  background-color: #fbfbfb;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`

const ProductRow = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 30px;
`

const Spacer = styled.div`
  width: calc(100% / 4 - 23px);
  height: 0;
  min-width: 243px;
`

export {
  Container,
  FullHeightContainer,
  Row,
  RowSpaceBetween,
  Button,
  CancelButton,
  FullWidthButton,
  FullWidthCancelButton,
  InvertedButton,
  StyledInput,
  Label,
  NumberInput,
  WideNumberInput,
  Title,
  SubTitle,
  Right,
  ColoredText,
  BigTitle,
  Centerer,
  LoginCard,
  InputGroup,
  CompactInputGroup,
  Radio,
  TextArea,
  Form,
  ModalContainer,
  ModalContent,
  ModalHalf,
  ModalOr,
  Center,
  HalfWidth,
  ContactText,
  RowSpaceEvenly,
  ProductCard,
  ProductRow,
  Spacer,
}
