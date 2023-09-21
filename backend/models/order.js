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
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
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
        'vaitingForDelivery',
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
})

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Order', orderSchema)
