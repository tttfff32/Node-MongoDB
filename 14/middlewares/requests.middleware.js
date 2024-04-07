const requestDetails = (req, res, next) => {
  console.log('Time:', Date.now())
  console.log('Request URL:', req.originalUrl)
  if ((req.method === 'POST' || req.method === 'PUT') && Object.keys(req.body).length === 0) {
    const error = new Error('No data sent in the request body')
    error.status = 400
    next(error)
  } else {
    next()
  }
}

module.exports = requestDetails
