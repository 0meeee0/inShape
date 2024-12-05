import React, { useEffect, useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { TrashIcon, UserIcon } from "@heroicons/react/24/solid";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import EditEventModal from "../modals/EditEventModal";

export default function Event() {
  const [event, setEvent] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEvent = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:3001/api/event/get-event/${id}`
        );
        setEvent(res.data.event);
      } catch (err) {
        console.error(err);
      }
    };
    handleEvent();
  }, [id]);

  const handleDelete = async (eventId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this event?"
      );
      if (!confirmDelete) return;
      await axios.delete(`http://localhost:3001/api/event/${eventId}`);
      alert("Event deleted successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete the event. Please try again.");
    }
  };

  const handleSave = async (updatedEvent) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/event/edit/${event._id}`,
        updatedEvent
      );
      setEvent(res.data.event);
      alert("Event updated successfully");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update the event. Please try again.");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById("event-details")
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save(`${event.title || "event"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to download the PDF. Please try again.");
    }
  };

  return (
    <div id="event-page" className="container mx-auto px-4 py-8 w-7/12">
      <div
        id="event-details"
        className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 border-4 border-orange-200"
      >
        <div className="relative h-64 w-full">
          <img
            src="https://i.pinimg.com/736x/77/cc/4a/77cc4ac1d1372086bf04e0af8321f84f.jpg"
            alt="{event.title}"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
              <span>{event.participants?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleDownloadPDF}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Download PDF
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(event._id)}
          className="flex items-center border border-gray-300 bg-red-400 px-4 py-2 rounded hover:bg-red-100"
        >
          <TrashIcon className="h-5 w-5 mr-2" />
          Delete
        </button>
      </div>

      <EditEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={event}
        onSave={handleSave}
      />
    </div>
  );
}
