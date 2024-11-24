import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-500">
            <div className="w-full max-w-lg bg-white p-10 rounded-xl shadow-2xl">
                <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
                    Welcome to the Event Management System
                </h1>

                <p className="text-lg text-gray-600 text-center mb-6">
                    Please select your portal to continue:
                </p>

                <div className="space-y-4">
                    <Link
                        to="/admin/login"
                        className="block py-3 px-6 text-center text-white bg-indigo-600 rounded-lg font-semibold transition-all transform hover:bg-indigo-700 hover:scale-105"
                    >
                        Access Admin Portal
                    </Link>
                    <Link
                        to="/user/login"
                        className="block py-3 px-6 text-center text-white bg-green-500 rounded-lg font-semibold transition-all transform hover:bg-green-600 hover:scale-105"
                    >
                        Access User Portal
                    </Link>
                    <Link
                        to="/vendor/login"
                        className="block py-3 px-6 text-center text-white bg-orange-500 rounded-lg font-semibold transition-all transform hover:bg-orange-600 hover:scale-105"
                    >
                        Access Vendor Portal
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
