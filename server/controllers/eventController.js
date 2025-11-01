import Event from "../models/Event.js";

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

// Create new event
export const createEvent = async (req, res) => {
  try {
    const { name, description, date, venue } = req.body;
    const newEvent = new Event({ name, description, date, venue });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: "Failed to create event" });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event" });
  }
};
