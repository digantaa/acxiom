const express = require("express");
const Admin = require("../models/adminModel");
const router = express.Router();

// ADD PRODUCT--------------------------
router.post("/signup", async (req, res) => {
    try {
        const { userId, password } = req.body;
        const admin = await Admin.findOne({ userId });

        if (admin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const newAdmin = new Admin({
            userId,
            password,
        });

        await newAdmin.save();

        res.status(201).json({
            data: newAdmin,
            success: true,
            message: "New admin added successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { userId, password } = req.body;

        if (!userId || !password) {
            return res.status(400).json({ message: "Please provide details" });
        }

        const admin = await Admin.findOne({ userId });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password did not match" });
        }

        res.status(200).json({
            message: "Login successful",
            user: admin, // Change `user` to `admin` since that's the correct variable
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
