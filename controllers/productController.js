const Product = require('../models/productModel')

//@desc Gets All Products
//@ route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products))

    } catch (error) {
        console.log(error);
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: "Server Error" }))
    }
}

//@desc Gets A single Product
//@ route GET /api/product/:id 
async function getProduct(req, res) {
    try {
        const id = req.params.id
        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "Product not found" }))

        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }

    } catch (error) {
        console.log(error);
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: "Server Error" }))
    }
}
//@desc Create a product
//@ route POST /api/products
async function createProduct(req, res) {
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', async () => {
            const { title, description, price } = JSON.parse(body)
            const newProduct = await Product.create({ title, description, price })
            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(newProduct))
        })

    } catch (error) {
        console.log(error);
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: "Server Error" }))
    }
}
module.exports = {
    getProducts,
    getProduct,
    createProduct
}
