import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/");
    };

    const handleLogout = () => {
        navigate("/");
    };

    const handleMaintainUser = () => {
        navigate("/admin/maintain-user");
    };

    const handleMaintainVendor = () => {
        navigate("/admin/maintain-vendor");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="bg-white shadow-lg p-8 rounded-xl w-80">
                <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Admin Panel</h1>
                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleHomeClick}
                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Home
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                    <hr className="border-gray-300 my-4" />
                    <button
                        onClick={handleMaintainUser}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Maintain User
                    </button>
                    <button
                        onClick={handleMaintainVendor}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Maintain Vendor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
