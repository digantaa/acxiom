import React from "react";
import { useLocation, useNavigate } from "react-router";

const VendorHome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const vendorName =
        location?.state?.data?.user?.userId ||
        localStorage.getItem("vendorName");
    const user = location?.state?.data?.user;

    console.log(user?.userId + " ---user");
    console.log(vendorName);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-lg flex flex-col items-center gap-6 bg-blue-600 text-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold bg-white text-blue-600 px-4 py-2 rounded-full">
                    Welcome, {vendorName}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-6">
                    <button
                        onClick={() =>
                            navigate("/youritems", { state: { data: user } })
                        }
                        className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-100 transition"
                    >
                        Your Items
                    </button>
                    <button
                        onClick={() =>
                            navigate("/addnewitem", { state: { data: user } })
                        }
                        className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-100 transition"
                    >
                        Add New Item
                    </button>
                    {/* <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-100 transition">
                        Transactions
                    </button> */}
                    <button
                        onClick={() => {
                            localStorage.removeItem("vendor");
                            localStorage.removeItem("vendorName");
                            navigate("/");
                        }}
                        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorHome;
