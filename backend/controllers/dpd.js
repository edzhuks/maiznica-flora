const express = require('express')
const router = express.Router()
const NodeCache = require('node-cache')
const cache = new NodeCache()
const axios = require('axios')
const { DPD_AUTH_HEADER } = require('../util/config')

router.get('/pickup_points', async (request, response) => {
  if (!cache.get('lockers')) {
    console.log('not cached')
    const res = await axios.get(
      'https://eserviss.dpd.lv/api/v1/lockers/?countryCode=lv',
      DPD_AUTH_HEADER
    )

    console.log(res.data[0])
    cache.set('lockers', res.data, 60 * 60 * 24)
    console.log(cache.get('lockers')[0])
  } else {
    console.log('cached')
    console.log(cache.get('lockers')[0])
  }
  return response.send(cache.get('lockers'))
})

module.exports = router
