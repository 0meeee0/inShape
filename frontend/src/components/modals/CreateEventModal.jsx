import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateEventModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState([])
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3001/api/user");
      console.log(response)
      setUserList(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(
        error.response?.data?.message ||
          "Failed to load user list. Please try again."
      );
    }
  };

  const addParticipant = (user) => {
    if (!participants.find((p) => p.id === user.id)) {
      setParticipants([...participants, user]);
    }
  };

  const removeParticipant = (userId) => {
    setParticipants(participants.filter((p) => p.id !== userId));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newEvent = {
      title,
      description,
      date,
      participants: participants.map((p) => p.id),
    };

    console.log("Data being sent to backend:", newEvent)

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:3001/api/event/create-event",
        newEvent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from backend:", response.data);
      onCreate(response.data);
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
      setError(
        error.response?.data?.message ||
          "Error creating event. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black w-1/3 rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">Create New Event</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Participants</label>
            <div className="border border-gray-300 rounded p-3 max-h-32 overflow-y-auto">
              {userList.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center py-1"
                >
                  <span>{user.name}</span>
                  <button
                    type="button"
                    onClick={() => addParticipant(user)}
                    className="px-2 py-1 bg-blue-500 text-white text-sm rounded"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <strong>Selected Participants:</strong>
              <ul className="mt-2">
                {participants.map((participant) => (
                  <li
                    key={participant.id}
                    className="flex justify-between items-center py-1"
                  >
                    {participant.name}
                    <button
                      type="button"
                      onClick={() => removeParticipant(participant.id)}
                      className="px-2 py-1 bg-red-500 text-white text-sm rounded"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 text-white rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
