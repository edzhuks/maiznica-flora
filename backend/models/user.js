const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    passwordHash: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    shoppingCart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
    },
    admin: Boolean,
    maintainer: Boolean,
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
      },
    ],
    emailVerified: Boolean,
    emailVerificationToken: String,
    resetToken: String,
    resetTokenCreatedAt: Number,
  },
  { timestamps: true }
)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

module.exports = mongoose.model('User', userSchema)
