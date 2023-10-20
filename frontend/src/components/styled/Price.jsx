import { useSelector } from 'react-redux'
import { addVat, centsToEuro } from '../../util/convert'

const { default: styled, css } = require('styled-components')
const PriceContainer = styled.div`
  display: block;
`
const BigPriceText = styled.span`
  font-size: ${(props) => (props.theme.isSmall ? '1.3rem' : '1.9rem')};
  color: ${(props) => props.theme.error};
  strong {
    color: ${(props) => props.theme.main};
    position: relative;
  }
  ${(props) =>
    props.discountPrice &&
    css`
      strong::before {
        content: '';
        border-top: 3px solid ${(props) => props.theme.main};
        width: 100%;
        display: block;
        transform: rotate(-20deg);
        left: 0;
        top: ${(props) => (props.theme.isSmall ? '0.65rem' : '1rem')};
        position: absolute;
      }
      strong {
        font-weight: normal;
      }
      span {
        font-weight: bold;
      }
    `}
  span {
    padding: 0px 0px 0px calc(${(props) => props.theme.padding} / 2);
  }
`
const SmallPriceText = styled(BigPriceText)`
  font-size: 1rem;
  strong {
    font-weight: normal;
  }
  strong::before {
    border-top: 2px solid ${(props) => props.theme.main};
    top: 0.5rem;
  }
`

const TipText = styled.span`
  color: ${(props) => props.theme.light};
  font-size: 0.7rem;
  margin-left: 10px;
  font-weight: normal;
`

const Price = ({ price, discountPrice, weight, isSmall }) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <PriceContainer>
      <BigPriceText
        isSmall={isSmall}
        discountPrice={discountPrice}>
        <strong>{centsToEuro(addVat(price))}</strong>
        {discountPrice && <span>{centsToEuro(addVat(discountPrice))}</span>}
      </BigPriceText>
      <TipText>{lang.with_VAT}</TipText>
      <br />
      <SmallPriceText discountPrice={discountPrice}>
        <strong>{centsToEuro((addVat(price) / weight) * 1000)}</strong>

        {discountPrice && (
          <span>
            {centsToEuro((addVat(discountPrice) / weight) * 1000).substring(1)}
          </span>
        )}
      </SmallPriceText>
      <TipText>€ / kg</TipText>
    </PriceContainer>
  )
}

export default Price
