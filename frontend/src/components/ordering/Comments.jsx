import { useDispatch, useSelector } from 'react-redux'
import Input from '../basic/Input'
import useField from '../../hooks/useField'
import { useEffect } from 'react'
import { useCartServiceDispatch } from '../../reducers/cartReducer'

const CommentCard = ({ name, update }) => {
  const comment = useField('textarea')
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const savedComments = useSelector((state) => state.cart[name])
  const dispatch = useDispatch()
  useEffect(() => {
    if (savedComments) {
      comment.changeValue(savedComments)
    }
  }, [savedComments])
  return (
    <div className="card p-m between align-cross-center">
      <h3 className="card-heading m-d-b">{lang[name]}</h3>
      <Input
        {...comment}
        onBlur={() => dispatch(update(comment.value))}
        label={lang[`${name}_label`]}
      />
    </div>
  )
}

const Comments = () => {
  const {
    changeBusinessComments,
    changeDeliveryComments,
    changeGeneralComments,
  } = useCartServiceDispatch()
  return (
    <div className="row">
      <CommentCard
        name="businessComments"
        update={changeBusinessComments}
      />
      <CommentCard
        name="generalComments"
        update={changeGeneralComments}
      />
      <CommentCard
        name="deliveryComments"
        update={changeDeliveryComments}
      />
    </div>
  )
}
export default Comments
