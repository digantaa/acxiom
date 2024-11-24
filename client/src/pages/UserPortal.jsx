import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const UserPortal = () => {
    const navigate = useNavigate();
    const data = useLocation();
    const userId = data?.state?.data?.user?.userId;
    const [vendor, setVendor] = useState();
    const [vendorItems, setVendorItems] = useState();

    const fetchVendor = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/vendor/item/${vendor}/`
            );
            setVendorItems(response.data.items);
        } catch (err) {
            console.error("Failed to refresh cart", err);
        }
    };

    const handleAddItem = async (item) => {
        const { name, price } = item;
        try {
            const resp = await axios.post(
                `http://localhost:5000/useritems/add/${userId}/`,
                { name, price, userId }
            );
            console.log(resp);
        } catch (err) {
            console.error("Failed to add item to cart", err);
        }
    };

    useEffect(() => {
        if (vendor) fetchVendor();
    }, [vendor]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl">
                <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
                    Welcome, User!
                </h1>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
                    <select
                        name="vendor"
                        value={vendor}
                        id="vendor"
                        onChange={(e) => setVendor(e.target.value)}
                        className="p-3 border border-gray-300 rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Choose Vendor</option>
                        <option value="Catering">Catering</option>
                        <option value="Florist">Florist</option>
                        <option value="Decoration">Decoration</option>
                        <option value="Lighting">Lighting</option>
                    </select>
                    <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
                        onClick={() =>
                            navigate("/user/cart", { state: { userId } })
                        }
                    >
                        View Cart
                    </button>
                    <button
                        className="px-6 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition"
                        onClick={() => {
                            localStorage.removeItem("user");
                            navigate("/");
                        }}
                    >
                        Log Out
                    </button>
                </div>

                <div className="space-y-6">
                    {vendorItems?.map((item, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center p-5 bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition"
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-gray-700">
                                    {item.name}
                                </h3>
                                <p className="text-gray-500">
                                    Price: ${item.price}
                                </p>
                            </div>
                            <button
                                onClick={() => handleAddItem(item)}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserPortal;
