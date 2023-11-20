const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
  banners: [
    {
      image: String,
      category: String,
      product: String,
    },
  ],
  inactiveBanners: [
    {
      image: String,
      category: String,
      product: String,
    },
  ],
})

bannerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Banner', bannerSchema)
