import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/admin/login",
                { userId, password }
            );

            if (response.status === 200) {
                navigate("/admin/home", { state: { data: response.data } });
            }
        } catch (error) {
            console.error(error);
            alert("Invalid Credentials or Server Error");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-green-500">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
                <div className="flex justify-between mb-6">
                    <button
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </button>
                </div>
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    Admin Login
                </h1>
                <form className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="userId" className="text-gray-600 mb-2">
                            User ID
                        </label>
                        <input
                            id="userId"
                            type="text"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-600 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={handleLogin}
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                            onClick={() => {
                                setUserId("");
                                setPassword("");
                            }}
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition"
                            onClick={() => {
                                navigate("/admin/signup");
                            }}
                        >
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;