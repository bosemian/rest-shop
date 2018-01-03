const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log('before: ' + req.headers.authorization)
    console.log('after: ' + token)
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.userData = decoded
    next()
  } catch (error) {
    return res.status(500).json({
      message: 'auth failed'
    })
  }
}
