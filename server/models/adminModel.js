const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        userId:String,
        password:String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Admin", schema);
