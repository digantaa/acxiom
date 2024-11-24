const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        vendor: String,
        product: String,
        userId: String,
        password: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Vendor", schema);
