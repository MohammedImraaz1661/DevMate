import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function EventCard({ event, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await API.delete(`/events/${event._id}`);
      toast.success("🗑️ Event deleted!");
      onDelete();
    } catch (err) {
      toast.error("❌ Failed to delete event.");
      console.error("Error deleting event:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-md w-full max-w-md mb-4 flex flex-col">
      <h3 className="text-lg font-bold text-purple-400">{event.name}</h3>
      <p className="text-gray-300">{event.description}</p>
      <p className="text-sm text-gray-400 mt-2">
        📅 {new Date(event.date).toLocaleDateString()} | 📍 {event.venue}
      </p>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className={`mt-3 bg-red-600 hover:bg-red-700 p-2 rounded font-semibold text-sm flex items-center justify-center ${
          deleting ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {deleting ? (
          <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        ) : (
          "Delete"
        )}
      </button>
    </div>
  );
}

export default EventCard;
