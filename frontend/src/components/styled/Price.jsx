import { useSelector } from 'react-redux'
import { addVat, centsToEuro } from '../../util/convert'
import { ProductText, Row } from './base'

const { default: styled, css } = require('styled-components')
const PriceContainer = styled.div`
  display: block;
`
const BigPriceText = styled.span`
  font-size: ${(props) => (props.isSmall ? '1.3rem' : '1.9rem')};
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
        top: ${(props) => (props.isSmall ? '0.65rem' : '1rem')};
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

const Price = ({
  price,
  bulkPrice,
  bulkThreshold,
  discount,
  weight,
  isSmall,
}) => {
  const discountPrice =
    discount &&
    Date.parse(discount.startDate) <= new Date() &&
    Date.parse(discount.endDate) >= new Date()
      ? discount.discountPrice
      : undefined
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <PriceContainer>
      {isSmall ? (
        <>
          {!discountPrice ? (
            <>
              {bulkPrice ? (
                <>
                  <TipText>
                    {`${lang.when_buying} ${bulkThreshold} ${lang.or_more} `}
                    &nbsp;&nbsp;&nbsp;
                  </TipText>
                  <BigPriceText isSmall={isSmall}>
                    <strong>{centsToEuro(bulkPrice)}</strong>
                  </BigPriceText>
                  <br />
                  <TipText>
                    {`${lang.when_buying} 1`}
                    &nbsp;&nbsp;&nbsp;
                  </TipText>
                  <SmallPriceText>
                    <strong>{centsToEuro(price)}</strong>
                  </SmallPriceText>
                </>
              ) : (
                <>
                  <BigPriceText isSmall={isSmall}>
                    <strong>{centsToEuro(price)}</strong>
                  </BigPriceText>
                </>
              )}
            </>
          ) : (
            <>
              <BigPriceText
                isSmall={isSmall}
                discountPrice={discountPrice}>
                <strong>{centsToEuro(price)}</strong>
                {discountPrice && <span>{centsToEuro(discountPrice)}</span>}
              </BigPriceText>
            </>
          )}
        </>
      ) : (
        <>
          {bulkPrice ? (
            <>
              <Row>
                <ProductText style={{ margin: '10px 0px' }}>
                  {`${lang.when_buying} ${bulkThreshold} ${lang.or_more}`}
                  <br />
                  <BigPriceText isSmall={isSmall}>
                    <strong>{centsToEuro(bulkPrice)}</strong>
                  </BigPriceText>
                  <TipText>{lang.with_VAT}</TipText>
                  <br />
                  <SmallPriceText>
                    <strong>{centsToEuro((bulkPrice / weight) * 1000)}</strong>
                  </SmallPriceText>
                  <TipText>€ / kg</TipText>
                </ProductText>
                <ProductText style={{ margin: '10px 50px' }}>
                  {`${lang.when_buying} 1`}
                  <br />
                  <BigPriceText isSmall={isSmall}>
                    <strong>{centsToEuro(price)}</strong>
                  </BigPriceText>
                  <TipText>{lang.with_VAT}</TipText>
                  <br />
                  <SmallPriceText>
                    <strong>{centsToEuro((price / weight) * 1000)}</strong>
                  </SmallPriceText>
                  <TipText>€ / kg</TipText>
                </ProductText>
              </Row>
            </>
          ) : (
            <>
              <BigPriceText
                isSmall={isSmall}
                discountPrice={discountPrice}>
                <strong>{centsToEuro(addVat(price))}</strong>
                {discountPrice && (
                  <span>{centsToEuro(addVat(discountPrice))}</span>
                )}
              </BigPriceText>
              <TipText>{lang.with_VAT}</TipText>
              <br />
              <SmallPriceText discountPrice={discountPrice}>
                <strong>{centsToEuro((addVat(price) / weight) * 1000)}</strong>

                {discountPrice && (
                  <span>
                    {centsToEuro(
                      (addVat(discountPrice) / weight) * 1000
                    ).substring(1)}
                  </span>
                )}
              </SmallPriceText>
              <TipText>€ / kg</TipText>
            </>
          )}
        </>
      )}
    </PriceContainer>
  )
}

export default Price
