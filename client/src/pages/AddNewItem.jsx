import React, { useState } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AddNewItem = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [vendor, setVendor] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const vid = location?.state?.data?._id || localStorage.getItem("vendor");

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newItem = {
            name: productName,
            price: productPrice,
            vendor: vendor,
        };

        try {
            const response = await axios.post(
                ` http://localhost:5000/product/add/${vid}`,
                newItem
            );
            if (response.status === 200) {
                alert("Product added successfully!");
                navigate("/vendor/home");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add the product.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
            {/* Header Section */}
            <header className="text-3xl font-bold text-gray-800 mb-6">
                Add New Product
            </header>

            {/* Buttons Section */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                    onClick={() => {
                        localStorage.removeItem("vendor");
                        localStorage.removeItem("vendorName");
                        navigate("/");
                    }}
                >
                    LogOut
                </button>
            </div>

            {/* Form Section */}
            <div className="w-[350px] bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Product Price"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Vendor"
                            value={vendor}
                            onChange={(e) => setVendor(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewItem;
