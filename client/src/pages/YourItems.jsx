import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const YourItems = () => {
    const location = useLocation();
    const [items, setItems] = useState([]);
    const vendorId =
        location?.state?.data?._id || localStorage.getItem("vendor");

    const fetchItems = async () => {
        try {
            const resp = await axios.get(
                `http://localhost:5000/vendor/yourItem/${vendorId}`
            );
            setItems(resp.data.items);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const handleDelete = async (item) => {
        try {
            await axios.delete(
                `http://localhost:5000/product/delete/${item._id}`
            );
            await fetchItems();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center p-6">
            <h1 className="text-4xl font-extrabold text-white mb-6">
                Your Items
            </h1>
            <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-2xl">
                {items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-semibold text-xl text-gray-800">
                                        {item.name}
                                    </h2>
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className="text-red-600 hover:text-red-800 text-xl"
                                    >
                                        &times;
                                    </button>
                                </div>
                                <p className="text-gray-700 mb-2">
                                    <span className="font-bold">Price:</span> $
                                    {item.price}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-bold">
                                        Description:
                                    </span>{" "}
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-white text-xl">
                        No items available
                    </p>
                )}
            </div>
        </div>
    );
};

export default YourItems;
