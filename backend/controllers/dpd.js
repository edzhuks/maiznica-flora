const express = require('express')
const router = express.Router()
const NodeCache = require('node-cache')
const cache = new NodeCache()
const axios = require('axios')
const { DPD_AUTH_HEADER } = require('../util/config')

router.get('/pickup_points', async (request, response) => {
  if (!cache.get('lockers')) {
    const res = await axios.get(
      'https://eserviss.dpd.lv/api/v1/lockers/?countryCode=lv',
      DPD_AUTH_HEADER
    )

    cache.set('lockers', res.data, 60 * 60 * 24)
  }
  return response.send(cache.get('lockers'))
})

module.exports = router
