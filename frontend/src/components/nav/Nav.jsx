import React, { useState } from "react";
import {
  PlusCircleIcon,
  UsersIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import AddUserModal from "../modals/AddUserModal";

export default function Nav() {
  const [navOpen, setNavOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNavToggle = () => {
    setNavOpen((prev) => !prev);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <aside
        className={`fixed top-1/4 transform z-10 flex items-center text-black ${
          navOpen ? "m-4 rightm" : "leftm"
        }`}
      >
        <nav className="h-52 w-20 flex-col bg-[#EC8305] border-2 border-yellow-600 shadow-white shadow-sm rounded-3xl">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              className="cursor-pointer rounded-lg"
              src="/logo.webp"
              alt="Logo"
            />
          </div>
          <div className="flex-2 p-3 flex flex-col items-center">
            <PlusCircleIcon className="text-white hover:text-[#C40C0C]/70 cursor-pointer transition" />
            <UsersIcon
              onClick={openModal}
              className="text-white hover:text-[#C40C0C]/70 cursor-pointer transition"
            />
          </div>
        </nav>
        <div onClick={handleNavToggle} className="ml-5 text-3xl cursor-pointer">
          {navOpen ? "‹" : "›"}
        </div>
      </aside>

      {isModalVisible && <AddUserModal onClose={closeModal} />}
    </>
  );
}
