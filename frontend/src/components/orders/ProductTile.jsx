import {
  CheckBox,
  ProductText,
  ProductQuantity,
  ProductName,
  _ProductTile,
} from './styledComponents'
import Input from '../basic/Input'

const Checkbox = ({ checked, onChange, src, disabled }) => {
  return (
    <CheckBox src={src}>
      <Input
        disabled={disabled}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span />
    </CheckBox>
  )
}
const ProductTile = ({ item, changeItemPacked, disabled }) => {
  return (
    <_ProductTile>
      <Checkbox
        disabled={disabled}
        src={item.product.image}
        checked={item.packed}
        onChange={() => changeItemPacked(item._id, !item.packed)}
      />
      <ProductText>
        <ProductQuantity>{item.quantity}</ProductQuantity>
        <ProductName>
          {item.product.name} <b>{item.product.weight}g</b>
        </ProductName>
      </ProductText>
    </_ProductTile>
  )
}

export default ProductTile
