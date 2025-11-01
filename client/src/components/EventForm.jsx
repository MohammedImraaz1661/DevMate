import { useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import toast from "react-hot-toast";

function EventForm({ onEventAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    venue: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/events", formData);
      toast.success("🎉 Event added successfully!");
      onEventAdded();
      setFormData({ name: "", description: "", date: "", venue: "" });
    } catch (err) {
      toast.error("❌ Failed to add event.");
      console.error("Error adding event:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-gray-800 p-4 rounded-2xl shadow-md w-full max-w-md mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-purple-400">Add Event</h2>

      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
      />

      <input
        type="text"
        name="venue"
        placeholder="Venue"
        value={formData.venue}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-purple-600 hover:bg-purple-700 p-2 rounded font-semibold flex items-center justify-center ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        ) : (
          "Add Event"
        )}
      </button>
    </motion.form>
  );
}

export default EventForm;
