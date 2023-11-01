import { BigTitle, Card } from '../styled/base'

const Payment = () => {
  return (
    <Card
      style={{
        width: '100%',
        aspectRatio: '2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <BigTitle>SEB payment</BigTitle>
    </Card>
  )
}

export default Payment
