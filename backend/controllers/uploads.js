const express = require('express')
const { userExtractor, adminRequired } = require('../util/middleware')
const router = express.Router()
const multer = require('multer')
const sharp = require('sharp')

const storage = multer.memoryStorage()

const filter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true)
  } else {
    cb(new Error('Only images are allowed!'))
  }
}

const upload = multer({ storage: storage, fileFilter: filter })

router.post(
  '/image',
  userExtractor,
  adminRequired,
  upload.single('image'),
  async (req, res) => {
    const image = req.file
    res.status(201).send({ path: `${image.originalname}` })
    await sharp(image.buffer).toFile(`images/${image.originalname}`)
    await sharp(image.buffer)
      .resize(55, 55, { fit: 'inside' })
      .toFile(`images/xs_${image.originalname}`)
    await sharp(image.buffer)
      .resize(200, 200, { fit: 'inside' })
      .toFile(`images/md_${image.originalname}`)
    await sharp(image.buffer)
      .resize(400, 400, { fit: 'inside' })
      .toFile(`images/lg_${image.originalname}`)
    res.status(201).send({ path: `${image.originalname}` })
  }
)
router.post(
  '/banner',
  userExtractor,
  adminRequired,
  upload.single('image'),
  async (req, res) => {
    const image = req.file
    await sharp(image.buffer).toFile(`images/${image.originalname}`)
    await sharp(image.buffer)
      .resize(800, 800, { fit: 'inside' })
      .toFile(`images/xl_${image.originalname}`)
    res.status(201).send({ path: `${image.originalname}` })
  }
)

module.exports = router
