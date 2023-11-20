const express = require('express')
const Banner = require('../models/banner')
const { userExtractor, adminRequired } = require('../util/middleware')
const bannerRouter = express.Router()

bannerRouter.get('/', async (req, res) => {
  let allBanners = await Banner.findOne({})
  if (!allBanners || !allBanners.banners || !allBanners.inactiveBanners) {
    allBanners = new Banner({ banners: [], allBanners: [] })
    await allBanners.save()
  }
  if (allBanners) {
    res.send({ banners: allBanners.banners })
  } else {
    res.send({ banners: [] })
  }
})

bannerRouter.get('/inactive', async (req, res) => {
  let allBanners = await Banner.findOne({})
  if (allBanners) {
    res.send({ banners: allBanners.inactiveBanners })
  } else {
    res.send({ banners: [] })
  }
})

bannerRouter.post('/', userExtractor, adminRequired, async (req, res) => {
  const banners = await Banner.findOne({})

  banners.banners = req.body
  await banners.save()

  res.send(banners)
})

module.exports = bannerRouter
