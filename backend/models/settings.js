const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({
  contactFormEmails: [{ email: String }],
  orderUsers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
})

settingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Settings', settingSchema)
