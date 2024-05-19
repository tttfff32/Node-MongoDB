const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  id: Number,
  Fname: String,
  token: String
})

userSchema.pre('save', async function (next) {
  if (this.isNew && this.password) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(this.password, saltRounds)
    this.password = hashedPassword
  }
  next()
})

const User = mongoose.model('User', userSchema)

class UsersService {
  async signup (userData) {
    try {
      const existingUser = await User.findOne({ userName: userData.userName })
      if (existingUser) {
        throw new Error('Username already exists')
      }

      const newUser = new User(userData)
      const savedUser = await newUser.save()
      return savedUser // Return the created user without password
    } catch (err) {
      console.error('Error creating user:', err)
      throw err // Re-throw for error handling in controller
    }
  }

  async login (userName, password) {
    try {
      const user = await User.findOne({ userName })
      if (!user) {
        return null // Username not found
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return null // Invalid password
      }

      // Generate token (optional, implement based on your needs)
      const token = jwt.sign(
        { id: user.id, Fname: user.Fname },
        process.env.TOKEN_KEY,
        { expiresIn: '2h' }
      )
      user.token = token
      // After successful login
      return { user, token } // Return user object (without password) and optional token
    } catch (err) {
      console.error('Error logging in user:', err)
      throw err // Re-throw for error handling in controller
    }
  }
}

module.exports = new UsersService()
