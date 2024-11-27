import React, { useState } from "react";
import { PlusCircleIcon, UserCircleIcon, UserPlusIcon, UsersIcon, VideoCameraIcon } from "@heroicons/react/24/solid";

export default function Nav() {
  const [navOpen, setNavOpen] = useState(false);
  const handleNavOpen = () => {
    setNavOpen((prev) => !prev);
  };
  return (
    <aside
      className={`z-10 flex mt-52 items-center text-black ${
        navOpen ? "m-4 rightm" : " leftm"
      }`}
    >
      <nav className="h-52 w-20 flex-col bg-[#EC8305] border-2 border-[#C40C0C] shadow-white shadow-sm rounded-3xl">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            className=" cursor-pointer rounded-lg"
            src="/logo.webp"
            alt="Logo"
          />
        </div>
        <div className="flex-2 p-3">
          <PlusCircleIcon className=" text-white hover:text-[#C40C0C]/70 cursor-pointer transition" />
          <UsersIcon className="mt-2 size-11 m-auto text-white hover:text-[#C40C0C]/70 cursor-pointer transition" />
        </div>
      </nav>
      <div
        onClick={handleNavOpen}
        className="ml-5 text-3xl cursor-pointer"
      >
        {navOpen ? "‹" : "›"}
      </div>
    </aside>
  );
}
