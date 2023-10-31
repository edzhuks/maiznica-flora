import styled from 'styled-components'
import { keyframes, css } from 'styled-components'

const OrderList = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  background: ${(props) => props.theme.background};
  gap: ${(props) => props.theme.padding};
`

const statusToColor = (status) => {
  switch (status) {
    case 'placed':
      return '#ffdddd'
    case 'accepted':
      return '#ffffff'
    case 'refused':
      return '#dadada'
    case 'packing':
      return '#ffffee'
    case 'waitingForDelivery':
      return '#fcf0e3'
    case 'delivering':
      return '#eeeeff'
    case 'completed':
      return '#eeffee'
    default:
      return '#fff'
  }
}

const OrderBase = styled.li`
  flex-grow: 1;
  display: flex;
  box-shadow: ${(props) => props.theme.shadow};
  padding: ${(props) => props.theme.padding};
  background: ${(props) => statusToColor(props.status)};
`

const _CompactOrder = styled(OrderBase)`
  flex-direction: column;
`

const CompactOrderItem = styled.span`
  line-height: 2;
  & > b {
    font-size: 1rem;
  }
  color: ${(props) => (props.packed ? 'grey' : 'black')};
`

const Status = styled.span`
  color: grey;
  width: 50%;
  & > b {
    text-transform: uppercase;
    font-weight: bold;
  }
`

const PlacementDate = styled.span`
  width: 47%;
  text-align: end;
  color: grey;
`

const _OrderHeader = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px grey solid;
  position: relative;
`

const scaleIn = keyframes`
  from {
    transform: scaleY(0);
  }

  to {
    transform: scaleY(100%);
  }
`
const scaleOut = keyframes`
  from {
    transform: scaleY(100%);
  }

  to {
    transform: scaleY(0);
  }
`

const _ExpandedOrder = styled(OrderBase)`
  flex-wrap: wrap;
  gap: ${(props) => props.theme.padding};
  width: 100%;
  animation: ${(props) =>
    props.closing
      ? css`
          ${scaleOut} 0.31s linear
        `
      : css`
          ${scaleIn} 0.3s cubic-bezier(0.075, 0.820, 0.165, 1.000)
        `};
`

const CloseButton = styled.a`
  position: absolute;
  right: -20px;
  top: -20px;
  display: block;
  opacity: 0.3;
  width: 50px;
  height: 50px;
  &:hover {
    opacity: 1;
  }
  &:before,
  &:after {
    position: absolute;
    right: 25px;
    top: 10px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: ${(props) => props.theme.text};
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`

const _ProductTile = styled.div`
  margin: 0;
  border: 2px #00000022 dashed;
  display: flex;
  align-items: stretch;
  width: calc(98% / 2);
  min-width: 250px;
  & > img {
  }
`

const ProductQuantity = styled.span`
  font-size: 2rem;
  /* font-family: 'Roboto'; */
  font-weight: bold;
  /* transform: scaleY(2); */
`

const ProductName = styled.span``

const ProductText = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`

const CheckBox = styled.label`
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  width: 7rem;
  height: 7rem;
  flex-shrink: 0;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    width: 7rem;
    height: 7rem;
    background-image: ${(props) => `url(${props.src})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: ${(props) => props.theme.white};
  }

  /* On mouse-over, add a grey background color */
  &:hover input ~ span {
    filter: brightness(90%);
  }

  input:checked ~ span {
    filter: brightness(90%) grayscale(100%);
  }

  &:hover input:checked ~ span {
    filter: brightness(80%) grayscale(100%);
  }

  &:hover input[disabled] ~ span {
    filter: brightness(100%) grayscale(0%);
    cursor: not-allowed;
  }
  &:hover input[disabled]:checked ~ span {
    filter: brightness(90%) grayscale(100%);
    cursor: not-allowed;
  }
  input:checked ~ span:after {
    display: block;
  }
`

const ActionTile = styled(_ProductTile)`
  flex-direction: column;
  justify-items: center;
  justify-content: space-evenly;
  height: 130px;
`

const Question = styled.span`
  font-size: 20px;
  flex-grow: 0;
  text-align: center;
  text-transform: uppercase;
`

export {
  OrderBase,
  _OrderHeader,
  OrderList,
  _ExpandedOrder,
  _CompactOrder,
  ProductName,
  ProductQuantity,
  ProductText,
  CheckBox,
  _ProductTile,
  ActionTile,
  Question,
  CompactOrderItem,
  CloseButton,
  PlacementDate,
  Status,
}
