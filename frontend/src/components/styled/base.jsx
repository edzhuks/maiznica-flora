import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../basic/Input'

const Container = styled.div`
  max-width: 1150px;
  margin: auto;
  padding: 0 18px;
  height: 100%;
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
  z-index: 999;
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

const FullWidthButton = styled(Button)`
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  height: 38px;
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

const NumberInput = styled(StyledInput)`
  width: 100px;
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
  margin-right: 18px;
  display: inline-block;
  width: 100px;
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
  /* font-size: 38px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 38px;
  font-family: 'Roboto Slab', serif;
  text-align: center; */
`

const Centerer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-bottom: 20%;
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
  margin-bottom: 38px;
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

const CheckBox = styled(Radio)`
  p {
    color: #777777;
    font-size: 16px;
  }
  span {
    border-radius: 5px;
    top: 12px;
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
export {
  Container,
  Header,
  HeaderSpacer,
  HeaderTab,
  Row,
  RowSpaceBetween,
  Spacer,
  Button,
  FullWidthButton,
  InvertedButton,
  StyledInput,
  Label,
  NumberInput,
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
  Radio,
  CheckBox,
  EmptyProductItem,
}
