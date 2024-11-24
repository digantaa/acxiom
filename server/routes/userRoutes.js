const express = require("express");
const User = require("../models/userModel");
const userItems = require("../models/userItemModel");
const router = express.Router();
// User login route
router.post("/login", async (req, res) => {
    const { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(400).json({ message: "Please provide details" });
    }
    const user = await User.findOne({ userId });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
        return res.status(400).json({ message: "Password did not match" });
    }
    res.status(200).json({ message: "Login successful", user });
});

// User signup route
router.post("/signup", async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findOne({ userId });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User(req.body);
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

//------------------------------

// Fetch all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a user
router.delete("/users/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findOneAndDelete({ userId });
        console.log(deletedUser);
        console.log(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
