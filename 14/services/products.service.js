const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  prodid: Number,
  prodName: String,
  category: String
})

const Product = mongoose.model('Product', productSchema)

class ProductsService {
  async getAllProductsByCategory (category) {
    try {
      const products = await Product.find({ category })
        .sort({ prodName: 1 })
      return products
    } catch (err) {
      console.error('Error getting products by category:', err)
      throw err
    }
  }

  async getProductById (category, id) {
    try {
      const product = await Product.findOne({ category, prodid: id })
      return product
    } catch (err) {
      console.error('Error getting product by ID:', err)
      throw err
    }
  }

  async createProduct (productData) {
    try {
      const newProduct = new Product(productData)
      const savedProduct = await newProduct.save()
      return savedProduct
    } catch (err) {
      console.error('Error creating product:', err)
      throw err
    }
  }

  async deleteProduct (category, id) {
    try {
      const deletedProduct = await Product.findByIdAndDelete({ category, prodid: id })
      if (!deletedProduct) {
        return `Product ${id} not found`
      }
      return `Product ${id} deleted successfully`
    } catch (err) {
      console.error('Error deleting product:', err)
      throw err
    }
  }

  async updateProduct (category, id, updatedData) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        { category, prodid: id },
        updatedData,
        { new: true }
      )
      if (!updatedProduct) {
        return `Product ${id} not found`
      }
      return 'Product updated successfully'
    } catch (err) {
      console.error('Error updating product:', err)
      throw err
    }
  }
}

module.exports = new ProductsService()
