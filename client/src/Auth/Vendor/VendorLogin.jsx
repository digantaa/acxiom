import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VendorLogin = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/vendor/login",
                { userId, password }
            );

            if (response.status === 200) {
                const vendorId = response.data.user._id;
                localStorage.setItem("vendor", vendorId);
                localStorage.setItem("vendorName", userId);

                navigate("/vendor/home", { state: { data: response.data } });
            }
        } catch (error) {
            console.error(error);
            alert("Invalid Credentials or Server Error");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Vendor Login</h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">UserId</label>
                        <input
                            id="userId"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md mt-2"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-md mt-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex gap-4 mt-6">
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors"
                        >
                            Login
                        </button>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => navigate("/vendor/signup")}
                            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Signup
                        </button>
                        <button
                            type="button"
                            className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors"
                            onClick={() => {
                                setUserId("");
                                setPassword("");
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <button
                        className="text-sm text-blue-500 hover:underline"
                        onClick={() => navigate("/")}
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorLogin;
