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
  deliveryMethod: String,
  courrierAddress: {
    name: String,
    surname: String,
    phone: String,
    city: String,
    street: String,
    house: String,
    apartment: String,
    postIndex: String,
  },
  pickupPointData: {
    id: String,
    phone: String,
    name: String,
    surname: String,
  },
  deliveryPhone: String,
  deliveryCost: Number,
  datePlaced: Date,
  latestStatus: {
    type: String,
    enum: [
      'placed',
      'ready_for_pickup',
      'completed',
      'ready_for_delivery',
      'waiting_for_courrier',
      'delivering',
    ],
  },
  statusHistory: [
    {
      status: {
        type: String,
        enum: [
          'placed',
          'ready_for_pickup',
          'completed',
          'ready_for_delivery',
          'waiting_for_courrier',
          'delivering',
        ],
      },
      time: Date,
    },
  ],
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
  total: Number,
  vat: Number,
  paymentStatus: String,
  paymentReference: String,
  businessComments: String,
  generalComments: String,
  deliveryComments: String,
  shipmentID: String,
  prettyID: String,
})

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Order', orderSchema)
