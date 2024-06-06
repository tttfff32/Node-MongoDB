const express = require('express');
const { createBusiness, updateBusiness, deleteBusiness } = require('../controllers/businessController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createBusiness);
router.put('/:id', authMiddleware, updateBusiness);
router.delete('/:id', authMiddleware, deleteBusiness);

module.exports = router;
