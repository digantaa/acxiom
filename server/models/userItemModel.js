const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        userId: String,
        name: Number,
        price: Number,
        Quantity: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserItems", schema);
