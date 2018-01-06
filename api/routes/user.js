const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')
const UserCtrl = require('../controllers/user')

router.post('/signup', UserCtrl.user_signup)

router.post('/login', UserCtrl.user_login)

router.delete('/:userId', checkAuth, UserCtrl.user_delete)

module.exports = router
