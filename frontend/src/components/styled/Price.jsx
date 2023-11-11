import { useSelector } from 'react-redux'
import { centsToEuro } from '../../util/convert'
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

const PriceTag = styled.div`
  /* z-index: -1;
  position: absolute;
  height: 120px;
  aspect-ratio: 2;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg viewBox="0 131.234 500 237.532" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M7.339 131.234h485.322a7.337 7.337 0 0 1 7.339 7.339v68.693h-.092c-23.854 0-43.191 19.337-43.191 43.191 0 23.854 19.337 43.191 43.191 43.191H500v67.779a7.337 7.337 0 0 1-7.339 7.339H7.339A7.34 7.34 0 0 1 0 361.427v-67.779c23.781-.088 43.03-19.392 43.03-43.191 0-23.799-19.249-43.103-43.03-43.191v-68.693a7.34 7.34 0 0 1 7.339-7.339Z" style="fill:%23fff"></path></svg>');
  background-size: 100%;
  background-repeat: no-repeat;
  filter: drop-shadow(rgba(50, 50, 93, 0.25) 0px 6px 12px)
    drop-shadow(rgba(0, 0, 0, 0.3) 0px 3px 7px);
  position: absolute;
  content: ''; */
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
                  <PriceTag />
                  <div style={{ padding: '20px 30px' }}>
                    {`${lang.when_buying} ${bulkThreshold} ${lang.or_more}`}
                    <br />
                    <BigPriceText isSmall={isSmall}>
                      <strong>{centsToEuro(bulkPrice)}</strong>
                    </BigPriceText>
                    <TipText>{lang.with_VAT}</TipText>
                    <br />
                    <SmallPriceText>
                      <strong>
                        {centsToEuro((bulkPrice / weight) * 1000)}
                      </strong>
                    </SmallPriceText>
                    <TipText>€ / kg</TipText>
                  </div>
                </ProductText>
                <ProductText style={{ margin: '10px 0px' }}>
                  <PriceTag />
                  <div style={{ padding: '20px 30px' }}>
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
                  </div>
                </ProductText>
              </Row>
            </>
          ) : (
            <>
              <PriceTag />{' '}
              <div style={{ padding: '20px 30px' }}>
                <BigPriceText
                  isSmall={isSmall}
                  discountPrice={discountPrice}>
                  <strong>{centsToEuro(price)}</strong>
                  {discountPrice && <span>{centsToEuro(discountPrice)}</span>}
                </BigPriceText>
                <TipText>{lang.with_VAT}</TipText>
                <br />
                <SmallPriceText discountPrice={discountPrice}>
                  <strong>{centsToEuro(price / weight) * 1000}</strong>

                  {discountPrice && (
                    <span>
                      {centsToEuro((discountPrice / weight) * 1000).substring(
                        1
                      )}
                    </span>
                  )}
                </SmallPriceText>
                <TipText>€ / kg</TipText>
              </div>
            </>
          )}
        </>
      )}
    </PriceContainer>
  )
}

export default Price
