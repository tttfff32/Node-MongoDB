const express = require('express')
const Categories = require('./controller/categories.controller.js')
const Product = require('./controller/products.controller.js')
const User = require('./controller/users.controller.js')
const requestDetails = require('./middlewares/requests.middleware.js')
const authMiddleware = require('./middlewares/user.middleware.js')
require('dotenv').config()

const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const options = {
  origin: 'http://localhost:3000'
}
const { connectToDB } = require('./data/DB.js')
connectToDB()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/Categories', requestDetails, authMiddleware, Categories)
app.use('/Products', requestDetails, authMiddleware, Product)
app.use('/User', requestDetails, User)
app.use(cors(options))

app.get('/', cors(options), (req, res) => {
  res.json({ msg: 'This is CORS-enabled for only localhost:3000.com.' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
