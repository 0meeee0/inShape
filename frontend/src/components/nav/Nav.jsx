import React, { useState } from "react";
import { PlusCircleIcon, UsersIcon } from "@heroicons/react/24/solid";
import AddUserModal from "../modals/AddUserModal";
import CreateEventModal from "../modals/CreateEventModal"

export default function Nav() {
  const [navOpen, setNavOpen] = useState(false);
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const [isCreateEventModalVisible, setIsCreateEventModalVisible] =
    useState(false);

  const handleNavToggle = () => {
    setNavOpen((prev) => !prev);
  };

  const openAddUserModal = () => {
    setIsAddUserModalVisible(true);
  };

  const closeAddUserModal = () => {
    setIsAddUserModalVisible(false);
  };

  const openCreateEventModal = () => {
    setIsCreateEventModalVisible(true);
  };

  const closeCreateEventModal = () => {
    setIsCreateEventModalVisible(false);
  };

  const handleCreateEvent = async (newEvent) => {
    try {
      console.log("New Event Created:", newEvent);
    } catch (error) {
      console.error("Error creating event:", error);
    }
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
            <PlusCircleIcon
              onClick={openCreateEventModal}
              className="text-white hover:text-[#C40C0C]/70 cursor-pointer transition"
            />
            <UsersIcon
              onClick={openAddUserModal}
              className="text-white hover:text-[#C40C0C]/70 cursor-pointer transition"
            />
          </div>
        </nav>
        <div
          onClick={handleNavToggle}
          className="ml-5 text-3xl cursor-pointer text-[#EC8305]"
        >
          {navOpen ? "‹" : "›"}
        </div>
      </aside>

      {isAddUserModalVisible && <AddUserModal onClose={closeAddUserModal} />}

      {isCreateEventModalVisible && (
        <CreateEventModal
          isOpen={isCreateEventModalVisible}
          onClose={closeCreateEventModal}
          onCreate={handleCreateEvent}
        />
      )}
    </>
  );
}
