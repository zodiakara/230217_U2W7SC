import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AccommodationSchema = new Schema(
  {
    name: { type: String, required: true },
    host: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: false },
    maxGuests: { type: Number, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Accommodation", AccommodationSchema);
