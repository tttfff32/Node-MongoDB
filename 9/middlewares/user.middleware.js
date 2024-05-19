const jwt = require('jsonwebtoken')
require('dotenv').config()

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('auth-token')

    if (!token) {
      const error = new Error('No token provided')
      error.status = 400
      return next(error)
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)
    const userId = decoded.id

    // You can perform any additional checks here if needed

    req.userId = userId // If you only need the userId for further processing

    next()
  } catch (error) {
    const customError = new Error('Invalid token')
    customError.status = 400
    return next(customError)
  }
}

module.exports = authMiddleware
