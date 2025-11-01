import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
