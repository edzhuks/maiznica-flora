const express = require('express')
const { userExtractor, adminRequired } = require('../util/middleware')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //Appending extension
  },
})

const upload = multer({ storage: storage })

router.post(
  '/image',
  userExtractor,
  adminRequired,
  upload.single('image'),
  async (req, res) => {
    const imageName = req.file.filename
    console.log(imageName)
    return res.status(201).send({ path: `/images/${imageName}` })
  }
)

module.exports = router
