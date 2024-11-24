import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminMaintainUser = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/user/users"
            );
            setUsers(response.data);
        } catch (error) {
            setMessage("Error fetching users");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (newUser.username && newUser.email && newUser.password) {
            try {
                const response = await axios.post(
                    "http://localhost:5000/api/users",
                    newUser
                );
                await fetchUsers();
                setUsers((prev) => [...prev, response.data]);
                setMessage("User added successfully!");
            } catch (error) {
                setMessage("Error adding user");
                console.error(error);
            }
            setNewUser({ username: "", email: "", password: "" });
        } else {
            setMessage("All fields are required");
        }
    };

    const handleDeleteUser = async (usernameToDelete) => {
        try {
            await axios.delete(
                `http://localhost:5000/user/users/${usernameToDelete}`
            );
            await fetchUsers();
            setUsers((prev) =>
                prev.filter((user) => user.username !== usernameToDelete)
            );
            setMessage("User deleted successfully!");
        } catch (error) {
            setMessage("Error deleting user");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-6">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    User Management
                </h2>

                {message && (
                    <div className="text-center mb-4 text-sm text-gray-700 bg-gray-100 p-2 rounded">
                        {message}
                    </div>
                )}

                <form onSubmit={handleAddUser} className="mb-6">
                    <div className="grid gap-4 mb-4">
                        <input
                            type="text"
                            name="username"
                            value={newUser.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                        <input
                            type="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                        <input
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Add User
                    </button>
                </form>

                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Current Users
                </h3>
                <ul className="space-y-4">
                    {users.map((user) => (
                        <li
                            key={user._id}
                            className="flex items-center justify-between p-4 bg-gray-50 border rounded-md shadow"
                        >
                            <span className="text-gray-800">
                                Username: <strong>{user.userId}</strong>
                            </span>
                            <button
                                onClick={() => handleDeleteUser(user.userId)}
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

export default AdminMaintainUser;
