import React from "react";

const UserVendor = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Home</h1>
                <button
                    className="px-6 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
                    onClick={() => {
                        localStorage.removeItem("user");
                        window.location.href = "/";
                    }}
                >
                    Logout
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Add content here, such as vendor options */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md flex-1">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Vendor Info</h2>
                        <p className="text-gray-600">Here you can add vendor-specific information or actions.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserVendor;
