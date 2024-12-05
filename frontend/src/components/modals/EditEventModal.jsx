import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditEventModal({ isOpen, onClose, event, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isOpen && event) {
      setTitle(event.title);
      setDescription(event.description);
      setDate(new Date(event.date).toISOString().split("T")[0]);
      setParticipants(event.participants || []);
    }
  }, [isOpen, event]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:3001/api/user");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const addParticipant = (user) => {
    if (!participants.find((p) => p === user._id)) {
      setParticipants([...participants, user._id]);
    }
  };

  const removeParticipant = (userId) => {
    setParticipants(participants.filter((p) => p !== userId));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedEvent = {
      title,
      description,
      date,
      participants,
    };
    await onSave(updatedEvent);
    onClose();
  };

  const getParticipantName = (participantId) => {
    const user = users.find((u) => u._id === participantId);
    return user ? user.name : "Unknown Participant";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-1/3 rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Participants</label>
            <div className="space-y-2">
              {participants.map((p) => (
                <div key={p} className="flex justify-between items-center">
                  <span>{getParticipantName(p)}</span>
                  <button
                    type="button"
                    onClick={() => removeParticipant(p)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Add Participants</label>
            <div className="space-y-2">
              {users
                .filter((u) => !participants.includes(u._id))
                .map((user) => (
                  <div
                    key={user._id}
                    className="flex justify-between items-center"
                  >
                    <span>{user.name}</span>
                    <button
                      type="button"
                      onClick={() => addParticipant(user)}
                      className="text-green-500 text-sm"
                    >
                      Add
                    </button>
                  </div>
                ))}
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
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
