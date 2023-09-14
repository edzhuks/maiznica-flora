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

const HeaderSpacer = styled.div`
  height: 130px;
`

const Header = styled.div`
  width: 100%;
  height: 110px;
  position: fixed;
  top: 0;
  padding-top: 18px;
  border-bottom: 1px solid #999999;
  background-color: #fffdfd;
  z-index: 4;
`

const HeaderTab = styled(Link)`
  padding: 0 30px;
  text-transform: uppercase;
  color: #333333;
  text-decoration: none;
  font-size: 22px;
  background-color: transparent;
  flex: 0 1 auto;
  display: flex;
  align-items: center;
  border: 0;
  cursor: pointer;
  justify-content: center;
  transition: 0.3s;
  &:hover {
    color: rgb(69, 148, 30);
  }
`

const Spacer = styled.div`
  flex: 1 1 auto;
`

const Button = styled.button`
  cursor: pointer;
  border: 0;
  color: white;
  padding: 5px 20px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
  background-color: #45941e;
  transition: 0.3s;
  min-width: 40px;
  height: 38px;
  &:hover {
    background-color: #3f861b;
  }
`

const CancelButton = styled(Button)`
  background-color: red;
  &:hover {
    background-color: darkred;
  }
`

const FullWidthButton = styled(Button)`
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  height: 38px;
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
  font-weight: bold;
  color: #999999;
  &:hover {
    background-color: transparent;
    color: #45941e;
  }
`

const StyledInput = styled(Input)`
  height: 38px;
  border: 1px solid #e5e5e5;
  color: #888888;
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: #45941e;
  }
  font-size: large;
`

const TextArea = styled.textarea`
  width: 300px;
  border: 1px solid #e5e5e5;
  color: #888888;
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: #45941e;
  }
  font-size: medium;
`

const NumberInput = styled(StyledInput)`
  width: 100px;
`
const WideNumberInput = styled(NumberInput)`
  width: 200px;
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

const FormMultiCol = styled.form`
  overflow: auto;
`
const ProductRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
`

const EmptyProductItem = styled.div`
  width: 262px;
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

const CenteredTitle = styled(Title)`
  text-align: center;
  min-height: 66px;
`
const CenteredSubTitle = styled(SubTitle)`
  text-align: center;
`

const Right = styled.span`
  text-align: right;
`

const ColoredText = styled.span`
  color: #45941e;
`

const Label = styled.label`
  color: #777777;
  display: block;
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
  border-radius: 20px;
  /* box-shadow: 10px 10px 2px 2px rgb(255, 168, 177); */
  box-shadow: rgba(69, 148, 30, 0.12) 0px 54px 55px,
    rgba(69, 148, 30, 0.12) 0px -12px 30px, rgba(69, 148, 30, 0.12) 0px 4px 6px,
    rgba(69, 148, 30, 0.12) 0px 12px 13px, rgba(69, 148, 30, 0.09) 0px -3px 5px;
`
const LoginInput = styled(StyledInput)`
  width: 200px;
`
const InputGroup = styled.div`
  margin-bottom: 58px;
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
    left: 10px;
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
  background-color: #fefefe;
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
`

const HalfWidth = styled.div`
  width: 50%;
  padding: 30px;
`

const ContactText = styled.p`
  letter-spacing: 1px;
  line-height: 1.5;
`

export {
  Container,
  FullHeightContainer,
  Header,
  HeaderSpacer,
  HeaderTab,
  Row,
  RowSpaceBetween,
  Spacer,
  Button,
  CancelButton,
  FullWidthButton,
  FullWidthCancelButton,
  InvertedButton,
  StyledInput,
  Label,
  NumberInput,
  WideNumberInput,
  ProductRow,
  Title,
  CenteredTitle,
  SubTitle,
  CenteredSubTitle,
  Right,
  ColoredText,
  BigTitle,
  Centerer,
  LoginCard,
  LoginInput,
  InputGroup,
  CompactInputGroup,
  Radio,
  EmptyProductItem,
  TextArea,
  Form,
  FormMultiCol,
  ModalContainer,
  ModalContent,
  ModalHalf,
  ModalOr,
  Center,
  HalfWidth,
  ContactText,
}
