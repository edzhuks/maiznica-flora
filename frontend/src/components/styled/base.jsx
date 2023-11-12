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

const Button = styled.button``

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

// const Input = styled(Input)`
//   height: 2rem;
//   border: 0px;
//   color: ${(props) => props.theme.text};
//   border-radius: 2px;
//   padding: ${(props) => props.theme.padding} 0px
//     ${(props) => props.theme.padding} ${(props) => props.theme.padding};
//   border: 0px solid
//     ${(props) =>
//       props.$isonlightbackground ? props.theme.lighter : props.theme.white};
//   background-color: ${(props) =>
//     props.$isonlightbackground ? props.theme.lighter : props.theme.white};
//   &:focus {
//     outline: 1px solid ${(props) => props.theme.main};
//   }
//   font-size: 1rem;
// `
// const Input = styled(Input)`
//   box-shadow: ${(props) => props.theme.shadow};
// `

// const Input = styled.Input`
//   width: 300px;
//   border: 1px solid ${(props) => props.theme.white};
//   color: ${(props) => props.theme.text};
//   border-radius: 2px;
//   font-size: 16;
//   color: ${(props) => props.theme.text};
//   font-family: 'Roboto';
//   &:focus {
//     outline: none;
//     border-color: ${(props) => props.theme.main};
//   }
//   font-size: medium;
//   &:focus {
//     outline: none;
//     border: 1px solid ${(props) => props.theme.main};
//   }
// `

// const Input = styled(Input)`
//   box-shadow: ${(props) => props.theme.shadow};
// `

// const Input = styled(Input)`
//   width: 100px;
// `
// const WideNumberInput = styled(Input)`
//   width: 217px;
// `

const Form = styled.form`
  /* min-width: 100px;
  display: inline-block; */
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
const BigTitle = styled.div``
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

const ModalContainer = styled.div``

const ModalContent = styled(Card)``

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
  Label,
  SubTitle,
  Right,
  ColoredText,
  BigTitle,
  TightBigTitle,
  Centerer,
  LoginCard,
  InputGroup,
  CompactInputGroup,
  Form,
  ModalContainer,
  ModalContent,
  ModalHalf,
  ModalOr,
  Center,
  HalfWidth,
  RowSpaceEvenly,
  Card,
  ProductImage,
  Padding,
  PaddingH,
  PaddedForm,
  ValidationFailed,
  ValidPassword,
  SmallerBigTitle,
  TextLink,
}
