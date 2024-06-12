const express = require('express');
const { createBusiness, updateBusiness, deleteBusiness } = require('../controllers/businessController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Business
 *   description: Business management
 */

/**
 * @swagger
 * /api/business:
 *   post:
 *     summary: Create a new business
 *     tags: [Business]
  *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - owner
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               owner:
 *                 type: string
 *     responses:
 *       200:
 *         description: Business created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', authMiddleware, authorizationMiddleware('admin'), createBusiness);

/**
 * @swagger
 * /api/business/{id}:
 *   put:
 *     summary: Update a business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Business updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/:id', authMiddleware, authorizationMiddleware('admin'), updateBusiness);

/**
 * @swagger
 * /api/business/{id}:
 *   delete:
 *     summary: Delete a business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business ID
 *     responses:
 *       200:
 *         description: Business deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete('/:id', authMiddleware, authorizationMiddleware('admin'), deleteBusiness);

module.exports = router;
