import axios from "axios";
import React, { useState, useEffect } from "react";

export default function EditUserModal({ onClose, user }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      name,
      email,
    };
    try {
      const res = await axios.put(`http://127.0.0.1:3001/api/user/${user._id}`, updatedUser);
      console.log("User updated successfully:", res.data);
      onClose();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full text-black mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="w-full text-black mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
              placeholder="Enter email"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 mr-2 text-gray-700 border rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
