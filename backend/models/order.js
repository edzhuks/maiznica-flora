const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
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
      packed: Boolean,
    },
  ],
  deliveryMethod: {
    method: String,
    cost: Number,
    address: {
      name: {
        type: String,
      },
      surname: {
        type: String,
      },
      phone: {
        type: String,
      },
      city: {
        type: String,
      },
      street: {
        type: String,
      },
      house: {
        type: String,
      },
      apartment: {
        type: String,
      },
    },
  },
  datePlaced: Date,
  status: {
    status: {
      type: String,
      enum: [
        'placed',
        'accepted',
        'refused',
        'packing',
        'waitingForDelivery',
        'delivering',
        'completed',
      ],
    },
    lastModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    lastModified: Date,
  },
  subtotal: Number,
  deliveryCost: Number,
  total: Number,
  vat: Number,
  paymentStatus: String,
  paymentReference: String,
})

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Order', orderSchema)
