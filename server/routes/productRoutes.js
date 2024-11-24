const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();

// ADD PRODUCT--------------------------
router.post("/add/:vid", async (req, res) => {
    const { name, prize, vendor } = req.body;

    console.log(req.body);

    const product = await Product.findOne({ name });

    if (product) {
        return res.json({ message: "product exists..." });
    }

    const newProduct = await new Product({
        ...req.body,
        vendorid: req.params.vid,
    });
    newProduct.save();
    res.status(200).json(newProduct);
});

// UPDATE PRODUCT-----------------------
router.put("/update/:id", async (req, res) => {
    const { name, price, vendor } = req.body;

    try {
        if (!name || !price || !vendor) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, vendor },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update product",
            error: error.message,
        });
    }
});

//DELETE PRODUCT-----------------------------
router.delete("/delete/:id", async (req, res) => {
    const { name, prize, image } = req.body;

    const newProduct = await Product.findByIdAndDelete(req.params.id, {
        name,
    });

    if (!newProduct) res.status(404).json("failed to update...");

    res.status(200).json(newProduct);
});

//PRODUCT STATUS--------------------------------

router.get("/productStatus/:id", async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) res.status(404).json("product not found");
    res.status(200).json(product);
});

module.exports = router;
