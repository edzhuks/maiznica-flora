import styled from 'styled-components'
import Input from '../basic/Input'
import { Link } from 'react-router-dom'
const Card = styled.div`
  box-shadow: ${(props) => props.theme.shadow};

  background-color: ${(props) => props.theme.card};
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  flex-direction: column;
`
const Container = styled.div`
  max-width: 1200px;
  /* @media (max-width: 2000px) {
    max-width: min(1400px, 80%);
  }
  @media (max-width: 1200px) {
    max-width: 100%;
  } */
  margin: auto;
`
const PaddingH = styled.div`
  padding: 0 ${(props) => props.theme.padding};
`
const Padding = styled.div`
  padding: ${(props) => props.theme.padding};
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
  font-size: 1rem;
  font-weight: 600;
  background-color: ${(props) => props.theme.main};
  transition: 0.3s;
  min-width: 40px;
  min-height: 2rem;
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
  color: ${(props) => props.theme.dark};
  &:hover {
    /* background-color: ${(props) => props.theme.main}; */
    color: ${(props) => props.theme.main};
  }
`

const StyledInput = styled(Input)`
  height: 2rem;
  border: 0px;
  color: ${(props) => props.theme.text};
  border-radius: 2px;
  padding: ${(props) => props.theme.padding} 0px
    ${(props) => props.theme.padding} ${(props) => props.theme.padding};
  border: 0px solid
    ${(props) =>
      props.$isonlightbackground ? props.theme.lighter : props.theme.white};
  background-color: ${(props) =>
    props.$isonlightbackground ? props.theme.lighter : props.theme.white};
  &:focus {
    outline: 1px solid ${(props) => props.theme.main};
  }
  font-size: 1rem;
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

const ShadowTextArea = styled(TextArea)`
  box-shadow: ${(props) => props.theme.shadow};
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
  /* flex: 50%; */
  /* width: 50%; */
  /* max-width: 400px; */
  width: 20rem;
  /* aspect-ratio: 1; */
  height: auto;
  align-self: flex-start;
  justify-self: center;
  box-shadow: ${(props) => props.theme.shadow};
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
  font-size: 1.5rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: ${(props) => props.theme.padding} 0;
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
const TightBigTitle = styled(BigTitle)`
  margin: 0;
`

const SmallerBigTitle = styled(TightBigTitle)`
  font-size: 1rem;
  &::before,
  ::after {
    margin: 0 10px 0 0;
    min-width: 30px;
  }
  &::after {
    margin: 0 0 0 10px;
  }
`
const Centerer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const WrappableRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  & > div {
    width: fit-content;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    & > div {
      width: 100%;
    }
  }
  column-gap: 40px;
`
const LoginCard = styled(Card)`
  padding: calc(${(props) => props.theme.padding}*2)
    calc(${(props) => props.theme.padding}*4)
    calc(${(props) => props.theme.padding}*5)
    calc(${(props) => props.theme.padding}*4);
  align-items: center;
`
const PaddedForm = styled(Form)`
  padding: ${(props) => props.theme.padding} 0px 0px 0px;
`
const InputGroup = styled.div`
  margin-bottom: 15px;
`

const CompactInputGroup = styled(InputGroup)`
  margin-bottom: 10px;
  overflow: auto;
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
  /* letter-spacing: 1px; */
  line-height: 1.5;
`

const ProductText = styled.p`
  font-family: 'Roboto', sans-serif;
  white-space: pre-line;
  max-width: 700px;
  margin: 30px 0px;
`

const BigProductTitle = styled.h1`
  font-family: 'Roboto Slab', serif;
  font-size: 1.5rem;
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
  justify-content: center;
  gap: calc(${(props) => props.theme.padding} / 2);
`
const ValidationFailed = styled.div`
  color: ${(props) => props.theme.error};
  ul {
    font-size: 14px;
    margin: 0;
    list-style: '●  ';
  }
  h3 {
    font-weight: normal;
    margin: 0;
    margin-bottom: 5px;
    width: 100%;
  }
  line-height: 1.5;
  margin-top: 20px;
  margin-bottom: 20px;
`
const ValidPassword = styled(ValidationFailed)`
  color: ${(props) => props.theme.main};
`
const TextLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: ${(props) => props.theme.text};
  transition: 0.3s;
  &:hover {
    color: ${(props) => props.theme.main};
  }
  margin-bottom: ${(props) => props.theme.padding};
`
export {
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
  SubTitle,
  Right,
  ColoredText,
  BigTitle,
  TightBigTitle,
  Centerer,
  LoginCard,
  InputGroup,
  CompactInputGroup,
  TextArea,
  ShadowTextArea,
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
  ProductImage,
  WrappableRow,
  BottomTextLink,
  Padding,
  PaddingH,
  PaddedForm,
  ValidationFailed,
  ValidPassword,
  SmallerBigTitle,
  TextLink,
}
