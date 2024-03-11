const Users=require('../data/Users.json');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const express = require('express');
const router = express.Router();

const requestDetails=((req, res, next) => {
    console.log('Time:', Date.now())
    console.log('Request URL:', req.originalUrl)
    if ((req.method === 'POST' || req.method === 'PUT') && Object.keys(req.body).length === 0) {
        const error = new Error('No data sent in the request body');
        error.status = 400; 
        next(error);
    } else {
        next();
    }
  })

const authMiddleware = async (req, res, next) => {
  try {
      const token = req.header("auth-token");
      if (!token) {
        const error = new Error('No token okey');
        error.status = 400; 
        next(error);
      }
      // Verify the token
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const userId = decoded.id;

      // Check if the user exists
      const user = Users.find(user => user.id === userId);
      if (!user) {
        const error = new Error('user not found');
        error.status = 400; 
        next(error);      }

      req.user = user; 
      next();
  } catch (error) {
     error = new Error('invalid');
    error.status = 400; 
    next(error);
  }
};

router.use((req, res, next) => {
  if (req.path !== '/login') {
      authMiddleware(req, res, next);
  } else {
      next();
  }
});


  module.exports =
    requestDetails
    // authMiddleware
  ;