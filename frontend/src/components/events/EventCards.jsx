import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import UserList from "../users/UserList";

export default function EventCards() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const handleEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/event/");
        setEvents(res.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    handleEvents();
  }, []);

  return (
    <>
      <header className="text-center py-10 bg-gradient-to-r from-yellow-500 to-orange-500 shadow-md">
        <h1 className="text-4xl font-bold uppercase">Events</h1>
        <p className="text-lg mt-2">Your hub for all things sports!</p>
      </header>

      <section className="container mx-auto py-10 px-5 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <UserList />

        <div className="lg:col-span-3">
          <h2 className="text-3xl font-semibold mb-6 text-black">
            Upcoming Events
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events?.map((e) => (
              <div
                key={e._id}
                className="bg-gray-800 p-5 rounded-lg shadow-md hover:scale-105 transition transform duration-300"
              >
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  <Link to={`/event/${e._id}`}>{e.title}</Link>
                </h3>

                <p className="text-sm mb-4">
                  <span className="font-semibold">Date:</span>
                  {new Date(e.date).toLocaleDateString()}
                  <br />
                  <span className="font-semibold">Description:</span>
                  {e.description}
                </p>

                <div className="bg-gray-700 p-3 rounded-md">
                  <ul className="text-sm space-y-1">
                    <li className="flex justify-between">
                      <span className="capitalize">
                        Participants
                      </span>
                      <span>{e.participants?.length || 0}</span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
