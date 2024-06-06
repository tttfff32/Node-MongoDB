const productService = require('../services/productService');

exports.createProduct = async (req, res) => {
    const { name, price, business } = req.body;
    const product = await productService.createProduct(name, price, business);
    res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = await productService.updateProduct(id, name, price);
    res.json(product);
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.status(204).end();
};
