const express = require('express')
const router = express.Router()
const usersService = require('../services/users.service')

require('dotenv').config()

router.post('/signUp', async (req, res) => {
  try {
    const userData = req.body
    if (!(userData.userName, userData.password, userData.id, userData.Fname)) {
      return res.status(400).send('All input is required in signup')
    }

    const createdUser = await usersService.signup(userData)
    res.status(201).send(createdUser)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error creating user')
  }
})

router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body
    if (!(userName && password)) {
      return res.status(400).send('All input is required in login')
    }

    const loginResult = await usersService.login(userName, password)
    if (loginResult) {
      res.header('auth-token', loginResult.token).send(loginResult.user)
    } else {
      res.status(401).send('userName or Password is wrong')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Error logging in')
  }
})

module.exports = router
