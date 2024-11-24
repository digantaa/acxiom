const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        userId: String,
        password: String,
        cart: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generate ObjectId
                name: String,
                Price: String,
                Quantity: String,
                TotalPrice: String,
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", schema); // Correct export
