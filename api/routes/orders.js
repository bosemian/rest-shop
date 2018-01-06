const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')
const OrderCtrl = require('../controllers/orders')

// Handle incoming GET requests to /orders
router.get('/', checkAuth, OrderCtrl.orders_get_all)
router.post('/', checkAuth, OrderCtrl.orders_create_order)
router.get('/:orderId', checkAuth, OrderCtrl.orders_get_order)
router.delete('/:orderId', checkAuth, OrderCtrl.orders_delete_order)

module.exports = router
