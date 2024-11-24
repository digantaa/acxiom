import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/admin/signup", // User signup endpoint
                { userId, password }
            );
            
            if (response.status === 201) {
                alert("Signup successful!");
                navigate("/admin/login"); // Redirect to login page
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Admin Signup</h2>
                <form className="space-y-4" onSubmit={handleSignup}>
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
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-md mt-2"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-between gap-4 mt-6">
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors"
                        >
                            Signup
                        </button>
                    </div>
                    <div className="flex justify-between gap-4 mt-4">
                        <button
                            type="button"
                            className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors"
                            onClick={() => {
                                setUserId("");
                                setPassword("");
                                setConfirmPassword("");
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <button
                        className="text-sm text-blue-500 hover:underline"
                        onClick={() => navigate("/admin/login")}
                    >
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSignup;
