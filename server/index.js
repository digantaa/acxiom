require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const vendorRoutes = require("./routes/vendorRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const userItemsRoutes = require("./routes/userItems");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = async () => {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/axicom").then(() => {
            console.log("Connected to MongoDB");
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
};

connectDB();

// Routes
app.use("/admin/", adminRoutes);
app.use("/vendor/", vendorRoutes);
app.use("/product/", productRoutes);
app.use("/user/", userRoutes);
app.use("/useritems/",userItemsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
