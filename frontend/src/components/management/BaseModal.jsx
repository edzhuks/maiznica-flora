import { useSelector } from 'react-redux'
import {
  ModalContainer,
  ModalContent,
  BigTitle,
  SubTitle,
  CancelButton,
  Button,
  Row,
} from '../styled/base'

const BaseModal = ({
  children,
  visible,
  title,
  onClose,
  onSubmit,
  padding,
}) => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <ModalContainer style={{ display: visible ? 'block' : 'none' }}>
      <ModalContent>
        <BigTitle style={{ marginBottom: 15 }}>{title}</BigTitle>
        <div style={{ padding: padding }}>{children}</div>
        <Row style={{ justifyContent: 'space-between' }}>
          <CancelButton
            onClick={() => {
              onClose()
            }}
            style={{ margin: 20 }}>
            {lang.cancel}
          </CancelButton>
          <Button
            style={{ margin: 20, float: 'right' }}
            onClick={onSubmit}>
            {lang.add}
          </Button>
        </Row>
      </ModalContent>
    </ModalContainer>
  )
}

export default BaseModal
