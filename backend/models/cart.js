const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
  courrierAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  deliveryMethod: String,
  pickupPointData: {
    id: String,
    phone: String,
    name: String,
    surname: String,
  },
  deliveryPhone: String,
  paymentStatus: String,
  paymentReference: String,
  total: Number,
})

cartSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Cart', cartSchema)
