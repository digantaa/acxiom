import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

const UserCart = () => {
    const location = useLocation();
    const userId = location?.state?.userId || localStorage?.getItem("user");
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/useritems/${userId}/items`
            );
            setCartItems(response.data);
            setLoading(false);
        } catch (err) {
            setError("Error loading cart");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) fetchCart();
    }, [userId]);

    const updateQuantity = async (itemId, quantity) => {
        try {
            await axios.put(
                `http://localhost:5000/useritems/${userId}/items/${itemId}`,
                { quantity: quantity }
            );
            await fetchCart();
        } catch (err) {
            console.error("Failed to update quantity");
        }
    };

    const removeItem = async (itemId) => {
        try {
            await axios.delete(
                `http://localhost:5000/useritems/${userId}/items/${itemId}`
            );
            await fetchCart();
        } catch (err) {
            console.error("Failed to remove item", err);
        }
    };

    if (loading) return <div className="text-center text-xl">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-600">Your cart is empty</div>
            ) : (
                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex justify-between items-center p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div>
                                <p className="font-semibold text-lg text-gray-800">
                                    {item.itemName}
                                </p>
                                <p className="text-gray-600">Price: ${item.price}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <input
                                    min="1"
                                    type="number"
                                    value={item.Quantity}
                                    onChange={(e) =>
                                        updateQuantity(item._id, e.target.value)
                                    }
                                    className="w-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={() => removeItem(item._id)}
                                    className="text-red-500 font-semibold hover:text-red-600 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserCart;
