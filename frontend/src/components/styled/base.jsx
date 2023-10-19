import styled from 'styled-components'
import Input from '../basic/Input'
import { Link } from 'react-router-dom'
const Card = styled.div`
  box-shadow: ${(props) => props.theme.shadow};

  background-color: ${(props) => props.theme.card};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`
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
  color: ${(props) => props.theme.white};
  padding: 5px 10px;
  border-radius: 2px;
  font-size: 18px;
  font-weight: 600;
  background-color: ${(props) => props.theme.main};
  transition: 0.3s;
  min-width: 40px;
  min-height: 38px;
  &:hover {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.main};
  }
  text-transform: uppercase;
  text-rendering: optimizeLegibility;
  font-family: 'Roboto Slab', serif;
  letter-spacing: 1px;
  box-shadow: ${(props) => props.theme.shadow};
`

const CancelButton = styled(Button)`
  background-color: ${(props) => props.theme.error};
  &:hover {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.error};
  }
`

const FullWidthButton = styled(Button)`
  width: 100%;
`

const FullWidthCancelButton = styled(FullWidthButton)`
  background-color: ${(props) => props.theme.error};
  &:hover {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.error};
  }
`
const InvertedButton = styled(Button)`
  padding: 1px 4px;
  background-color: transparent;
  box-shadow: none;
  font-weight: bold;
  color: ${(props) => props.theme.main};
  &:hover {
    background-color: ${(props) => props.theme.main};
    color: ${(props) => props.theme.white};
  }
`

const StyledInput = styled(Input)`
  height: 38px;
  border: 0px;
  color: ${(props) => props.theme.text};
  border-radius: 2px;
  padding: 0;
  border: 0px solid
    ${(props) =>
      props.$isonlightbackground ? props.theme.lighter : props.theme.white};
  background-color: ${(props) =>
    props.$isonlightbackground ? props.theme.lighter : props.theme.white};
  &:focus {
    outline: 1px solid ${(props) => props.theme.main};
  }
  font-size: large;
`
const ShadowInput = styled(StyledInput)`
  box-shadow: ${(props) => props.theme.shadow};
`
const BottomTextLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.light};
  margin-top: 40px;
  margin-bottom: -20px;
`
const TextArea = styled.textarea`
  width: 300px;
  border: 1px solid ${(props) => props.theme.white};
  color: ${(props) => props.theme.text};
  border-radius: 2px;
  font-size: 16;
  color: ${(props) => props.theme.text};
  font-family: 'Roboto';
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.main};
  }
  font-size: medium;
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.main};
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

const ProductImage = styled.img`
  flex: 50%;
  width: 100%;
  max-width: 600px;
  height: auto;
  box-shadow: ${(props) => props.theme.shadow};
`
const WrappableRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  div {
    flex: 50%;
  }
  column-gap: 40px;
`

const Title = styled.p`
  color: ${(props) => props.theme.text};
  font-size: 18px;
  text-decoration: none;
  margin: 20px 0px;
  transition: 0.3s;
`

const SubTitle = styled.p`
  color: ${(props) => props.theme.text};
  font-size: 18px;
  text-decoration: none;
  margin: 20px 0px;
`

const Right = styled.span`
  text-align: right;
`

const ColoredText = styled.span`
  color: ${(props) => props.theme.main};
`

const Label = styled.label`
  color: ${(props) => props.theme.text};
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
    border-top: 1px solid ${(props) => props.theme.text};
    margin: 0 20px 0 0;
    flex: 1 0 20px;
    min-width: 50px;
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

const LoginCard = styled(Card)`
  padding: 58px;
  align-items: center;
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

const ModalContainer = styled.div`
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

const ProductCard = styled(Card)`
  width: calc(100% / 4 - 23px);
  min-width: 256px;
`
const ModalContent = styled(Card)`
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  max-width: 1020px; /* Could be more or less, depending on screen size */
  width: fit-content;
  overflow: visible;
`

const ModalHalf = styled.div`
  width: 400px;
  min-width: 400px;
  padding: 20px;
`
const ModalOr = styled.div`
  padding: 80px 40px;
  font-size: 30px;
  color: ${(props) => props.theme.dark};
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

const Spacer = styled.div`
  width: calc(100% / 4 - 23px);
  height: 0;
  min-width: 256px;
`

const ProductText = styled.p`
  font-family: 'Roboto', sans-serif;
  white-space: pre-line;
  max-width: 700px;
  margin: 30px 0px;
`

const BigProductTitle = styled.h1`
  font-family: 'Roboto Slab', serif;
  font-size: 28px;
  color: ${(props) => props.theme.main};
  font-weight: 400;
`

const NutritionTableHeader = styled.th`
  text-align: left;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  font-weight: 400;
  padding: 5px 10px;
  &:nth-child(2) {
    text-align: end;
    border-width: 0px 0px 1px 1px;
  }
`

const NutritionTable = styled.table`
  border-collapse: collapse;
`

const NutritionTableCell = styled.td`
  padding: 2px 10px;
  &:nth-child(2) {
    text-align: end;
    border-width: 0px 0px 0px 1px;
    border-style: solid;
  }
`

const NutritionTableRow = styled.tr`
  background-color: ${(props) => props.theme.white};
  &:nth-child(odd) {
    background-color: ${(props) => props.theme.background};
  }
`
const Badges = styled.div`
  margin: 20px 0px 30px 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  row-gap: 10px;
  span {
    color: ${(props) => props.theme.white};
    padding: 5px 15px;
    background-color: ${(props) => props.theme.main};
    border-radius: 20px;
    box-shadow: ${(props) => props.theme.shadow};
  }
`
const Toggle = styled.button`
  /* padding: 0px; */
  border-radius: 2px;
  box-shadow: ${(props) => props.theme.shadow};
  border: 0;
  font-size: 16px;
  padding: 0;
  span:nth-child(2) {
    padding: 10px 10px;
    background-color: ${(props) =>
      !props.true ? props.theme.main : props.theme.white};
    color: ${(props) => (!props.true ? 'white' : props.theme.main)};
    display: inline-block;
  }
  span:nth-child(1) {
    background-color: ${(props) =>
      props.true ? props.theme.main : props.theme.white};
    color: ${(props) => (props.true ? props.theme.white : props.theme.main)};
    padding: 10px 10px;
  }
  &:hover {
    background: none;
  }
`
const CardRow = styled(Row)`
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 30px;
  margin-bottom: 20px;
`
const Price = styled.div`
  span {
    color: ${(props) => props.theme.light};
    font-size: 14px;
    margin-left: 10px;
    font-weight: normal;
  }
  p {
    margin-top: 0px;
    margin-left: 20px;
  }
  h1 {
    margin-bottom: 0;
    margin-top: 0;
    font-weight: bold;
  }
`
export {
  Price,
  ProductText,
  ShadowInput,
  CardRow,
  Toggle,
  Badges,
  NutritionTable,
  NutritionTableCell,
  NutritionTableHeader,
  NutritionTableRow,
  BigProductTitle,
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
  Card,
  ProductCard,
  Spacer,
  ProductImage,
  WrappableRow,
  BottomTextLink,
}
