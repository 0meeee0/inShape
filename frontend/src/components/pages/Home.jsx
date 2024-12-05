import React from "react";
import Nav from "../nav/Nav";
import EventCards from "../events/EventCards";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-white to-gray-400 min-h-screen text-white">
      <Nav />
      <EventCards />
    </div>
  );
}
