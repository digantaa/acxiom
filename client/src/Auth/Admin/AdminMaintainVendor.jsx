import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminMaintainVendor = () => {
    const [vendors, setVendors] = useState([]);
    const [newVendor, setNewVendor] = useState({
        vendorName: "",
        contactEmail: "",
        contactNumber: "",
    });
    const [message, setMessage] = useState("");

    const fetchVendors = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/vendor/vendors"
            );
            setVendors(response.data);
        } catch (error) {
            setMessage("Error fetching vendors");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    const handleDeleteVendor = async (vendorNameToDelete) => {
        try {
            await axios.delete(
                `http://localhost:5000/vendor/vendors/${vendorNameToDelete}`
            );
            await fetchVendors();
            setMessage("Vendor deleted successfully!");
        } catch (error) {
            setMessage("Error deleting vendor");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-teal-500 to-blue-600 p-6">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Vendor Management
                </h2>

                {message && (
                    <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
                        {message}
                    </div>
                )}

                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Current Vendors
                </h3>
                <ul className="space-y-4">
                    {vendors.map((vendor, index) => (
                        <li
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 border rounded-md shadow"
                        >
                            <span className="text-gray-800">
                                Vendor Name: <strong>{vendor.userId}</strong>
                            </span>
                            <button
                                onClick={() => handleDeleteVendor(vendor.userId)}
                                className="py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminMaintainVendor;
