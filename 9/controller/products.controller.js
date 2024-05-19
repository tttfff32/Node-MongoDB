const express = require('express')
const router = express.Router()
const productsService = require('../services/products.service')

router.get('/:category', async (req, res) => {
  try {
    const products = await productsService.getAllProductsByCategory(req.params.category)
    res.status(200).send(products)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error retrieving products')
  }
})

router.get('/:category/:id', async (req, res) => {
  try {
    const product = await productsService.getProductById(req.params.category, req.params.id)
    if (product) {
      res.status(200).send(product)
    } else {
      res.status(404).send('Product not found')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Error retrieving product')
  }
})

router.post('/', async (req, res) => {
  try {
    const productData = req.body
    const createdProduct = await productsService.createProduct(productData)
    res.status(201).send(createdProduct)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error creating product')
  }
})

router.delete('/:category/:id', async (req, res) => {
  try {
    const category = req.params.category
    const id = req.params.id
    const result = await productsService.deleteProduct(category, id)
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error deleting product')
  }
})

router.put('/:category/:id', async (req, res) => {
  try {
    const category = req.params.category
    const id = req.params.id
    const updatedData = req.body
    const result = await productsService.updateProduct(category, id, updatedData)
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error updating product')
  }
})

module.exports = router
