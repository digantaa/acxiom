const express = require("express");
const UserItems = require("../models/userItemModel");
const router = express.Router();

//Add item

router.post("/add/:userId", async (req, res) => {
    const { name, price, userId } = req.body;

    const newItem = await new UserItems({
        name: name,
        price: price,
        userId: userId,
        vendorid: req.params.userId,
        Quantity: 1,
    });
    await newItem.save();
    res.status(200).json(newItem);
});

// Fetch all items for a specific user
router.get("/:userId/items", async (req, res) => {
    const { userId } = req.params;
    try {
        const items = await UserItems.find({ userId });
        console.log(items);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an item for a specific user
router.put("/:userId/items/:itemId", async (req, res) => {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;
    console.log(userId, itemId, quantity);

    try {
        // Use findByIdAndUpdate to update the item directly
        const updatedItem = await UserItems.findOneAndUpdate(
            { _id: itemId, userId }, // Ensure the userId is also checked
            { Quantity: Number(quantity) },
            { new: true, runValidators: true } // Return the new updated document
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Respond with the updated item
        console.log(updatedItem);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove an item for a specific user
router.delete("/:userId/items/:itemId", async (req, res) => {
    const { userId, itemId } = req.params;

    try {
        const deletedItem = await UserItems.findOneAndDelete({
            _id: itemId,
            userId,
        });

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item removed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
