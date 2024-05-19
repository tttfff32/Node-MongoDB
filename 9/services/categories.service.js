const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  id: Number,
  Name: String
})

const Category = mongoose.model('Category', categorySchema)

class CategoriesService {
  async getAllCategories () {
    try {
      const categories = await Category.find().sort({ Name: 1 })
      return categories
    } catch (err) {
      console.error('Error getting all categories:', err)
      throw err
    }
  }

  async getCategoryById (categoryId) {
    try {
      const category = await Category.findById(categoryId)
      return category
    } catch (err) {
      console.error('Error getting category by ID:', err)
      throw err
    }
  }

  async createCategory (categoryData) {
    try {
      const newCategory = new Category(categoryData)
      const savedCategory = await newCategory.save()
      return savedCategory
    } catch (err) {
      console.error('Error creating category:', err)
      throw err
    }
  }

  async deleteCategory (categoryId) {
    try {
      const deletedCategory = await Category.findByIdAndDelete(categoryId)
      if (!deletedCategory) {
        return `Category ${categoryId} not found`
      }
      return `Category ${categoryId} deleted successfully`
    } catch (err) {
      console.error('Error deleting category:', err)
      throw err
    }
  }

  async updateCategory (categoryId, updatedData) {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        updatedData,
        { new: true }
      )
      if (!updatedCategory) {
        return `Category ${categoryId} not found`
      }
      return 'Category updated successfully'
    } catch (err) {
      console.error('Error updating category:', err)
      throw err
    }
  }
}

module.exports = new CategoriesService()
