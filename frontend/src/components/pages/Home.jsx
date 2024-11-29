import React from "react";
import Nav from "../nav/Nav";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-white to-gray-400 min-h-screen text-white">
      <Nav />

      <header className="text-center py-10 bg-gradient-to-r from-yellow-500 to-orange-500 shadow-md">
        <h1 className="text-4xl font-bold uppercase">Events</h1>
        <p className="text-lg mt-2">Your hub for all things sports!</p>
      </header>

      <section className="container mx-auto py-10 px-5">
        <h2 className="text-3xl font-semibold mb-6 text-black">Upcoming Events</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div
              className="bg-gray-800 p-5 rounded-lg shadow-md hover:scale-105 transition transform duration-300"
            >
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                Marathon
              </h3>

              <p className="text-sm mb-4">
                <span className="font-semibold">Date:</span> 11/11/11
                <br />
                <span className="font-semibold">Location:</span>{" "}
                Safi
              </p>

              <div className="bg-gray-700 p-3 rounded-md">
                <h4 className="text-lg font-semibold mb-2 text-orange-400">
                  Stats:
                </h4>
                <ul className="text-sm space-y-1">
                    <li className="flex justify-between">
                      <span className="capitalize">key:</span>
                      <span>value</span>
                    </li>
                </ul>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}
