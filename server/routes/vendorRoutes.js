const express = require("express");
const Vendor = require("../models/vendorModel");
const Product = require("../models/productModel");
const router = express.Router();

router.post("/login", async (req, res) => {
    const { userId, password } = req.body;

    if (!userId || !password) {
        return res.status(400).json({ message: "Please provide details" });
    }

    const user = await Vendor.findOne({ userId });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.password != password) {
        return res.status(400).json({ message: "Password did not match" });
    }

    res.status(200).json({
        message: "Login successful",
        user,
    });
});

router.post("/signup", async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await Vendor.findOne({ userId });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new Vendor(req.body);
        await newUser.save();

        res.status(201).json({
            data: newUser,
            success: true,
            message: "User added successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/youritem/:id", async (req, res) => {
    const items = await Product.find({ vendorid: req.params.id });

    res.status(200).json({ items: items });
});

//get vendor items/products

router.get("/item/:vendor", async (req, res) => {
    console.log(req.params.vendor);
    const items = await Product.find({ vendor: req.params.vendor });
    console.log("items...", items);
    res.status(200).json({ items: items });
});

//-----------------------------------------------------

// Get all vendors
router.get("/vendors", async (req, res) => {
    try {
        const vendors = await Vendor.find({});
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vendors" });
    }
});

// Add a new vendor
router.post("/add", async (req, res) => {
    try {
        const newVendor = new Vendor(req.body);
        await newVendor.save();
        res.status(201).json(newVendor);
    } catch (error) {
        res.status(500).json({ message: "Error adding vendor" });
    }
});

// Delete a vendor by name
router.delete("/vendors/:vendorName", async (req, res) => {
    try {
        const { vendor } = req.params;
        await Vendor.findOneAndDelete({ vendor });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting vendor" });
    }
});

module.exports = router;
