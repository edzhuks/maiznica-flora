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
        expanded="true"
        width="280px"
      />
    </div>
  )
}

const BusinessCard = ({ update }) => {
  const name = useField('text')
  const address = useField('textarea')
  const regNo = useField('text')
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const savedComments = useSelector((state) => state.cart.businessComments)
  const dispatch = useDispatch()
  useEffect(() => {
    if (savedComments) {
      name.changeValue(savedComments.name)
      address.changeValue(savedComments.address)
      regNo.changeValue(savedComments.regNo)
    }
  }, [savedComments])
  const updateComments = () => {
    dispatch(
      update({ name: name.value, address: address.value, regNo: regNo.value })
    )
  }
  return (
    <div className="card p-m between align-cross-center">
      <h3 className="card-heading m-d-b">{lang.businessComments}</h3>
      <Input
        {...name}
        onBlur={updateComments}
        label={lang.company_name}
        width="280px"
      />
      <Input
        {...address}
        onBlur={updateComments}
        label={lang.address}
        width="280px"
      />
      <Input
        {...regNo}
        onBlur={updateComments}
        label={lang.regNo}
        width="280px"
      />
      <Input
        disabled
        value={regNo.value && `LV${regNo.value}`}
        label={lang.vatNo}
        width="280px"
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
      <BusinessCard update={changeBusinessComments} />
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
