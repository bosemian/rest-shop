const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')

const checkAuth = require('../middleware/check-auth')
const ProductCtrl = require('../controllers/products')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new mongoose.Types.ObjectId() + '-' + file.originalname)
  }
})

// reject a file
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
// config multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

router.get('/', ProductCtrl.products_get_all)
router.post('/', checkAuth, upload.single('productImage'), ProductCtrl.products_create_product)
router.get('/:productId', ProductCtrl.products_get_product)
router.patch('/:productId', checkAuth, ProductCtrl.products_update_product)
router.delete('/:productId', checkAuth, ProductCtrl.products_delete_product)

module.exports = router
