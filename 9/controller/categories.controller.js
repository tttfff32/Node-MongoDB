const express = require('express')
const router = express.Router()
const categoriesService = require('../services/categories.service')

router.get('/', async (req, res) => {
  try {
    const categories = await categoriesService.getAllCategories()
    res.status(200).send(categories)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error retrieving categories')
  }
})

router.get('/:categoryId', async (req, res) => {
  const id = req.params.categoryId
  const Category = await categoriesService.getCategoryById(id)
  if (Category) {
    res.status(200).send(Category)
  } else {
    res.status(404).send('Category not found')
  }
})

router.post('/', async (req, res) => {
  try {
    const data = req.body
    await categoriesService.createCategory(data)
    res.send('File written successfully')
  } catch (err) {
    console.error(err)
  }
})

router.delete('/:deletId', async (req, res) => {
  try {
    const id = req.params.deletId
    const category = await categoriesService.deleteCategory(id)
    res.send(category)
  } catch (err) {
    console.log('catch erorr')
  }
})

router.put('/:putId', async (req, res) => {
  try {
    const id = req.params.putId
    const data = req.body
    const category = await categoriesService.updateCategory(id, data)
    res.send(category)
  } catch {
    console.log('put error')
  }
})

module.exports = router
