import axios from "axios";
import React, { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import EditUserModal from "../modals/EditUserModal";

export default function UserList() {
  const [user, setUser] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openEditModal = (user) => {
    setSelectedUserId(user);
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };
  useEffect(() => {
    const handleUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/user/");
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    handleUsers();
  }, []);
  const deleteUser = async (id) => {
    console.log(id)
    try {
      const res = await axios.delete(`http://localhost:3001/api/user/${id}`);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <aside className="bg-orange-200 p-5 rounded-lg shadow-md lg:col-span-1 border-2 border-orange-400">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <ul className="space-y-4 text-black">
          {user.map((user) => (
            <li
              key={user._id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="flex">
                <TrashIcon
                  onClick={() => {
                    deleteUser(user._id);
                  }}
                  className="p-2 h-10 text-red-700 cursor-pointer"
                />
                <PencilSquareIcon
                  onClick={() => openEditModal(user)}
                  className="p-2 h-10 text-blue-700 cursor-pointer"
                />
              </div>
            </li>
          ))}
        </ul>
      </aside>
      {isEditModalVisible && (
        <EditUserModal user={selectedUserId} onClose={closeEditModal} />
      )}
    </>
  );
}
