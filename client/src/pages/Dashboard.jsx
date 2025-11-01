import { useEffect, useState } from "react";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import API from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

function Dashboard() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-purple-400">🎟️ DevMate Dashboard</h1>
      <p className="text-gray-400 mb-6">Manage your college events right here.</p>

      <EventForm onEventAdded={fetchEvents} />

<div className="flex flex-col items-center w-full max-w-md">
  <AnimatePresence>
    {events.length === 0 ? (
      <motion.div
        key="empty"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: [0, -5, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        exit={{ opacity: 0, y: -10 }}
        className="flex flex-col items-center text-gray-500 mt-8"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl mb-2"
        >
          🚀
        </motion.div>
        <p className="text-gray-400 text-center">
          No events yet — time to add your first one!
        </p>
      </motion.div>
    ) : (
      events.map((event) => (
        <motion.div
          key={event._id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          <EventCard event={event} onDelete={fetchEvents} />
        </motion.div>
      ))
    )}
  </AnimatePresence>
</div>

    </div>
  );
}

export default Dashboard;
