import mongoose, { model, models, Schema } from "mongoose";

const InformationSchema = new Schema({
  userEmail: { type: String, unique: true, required: true },
  name: String,
  email: String,
  country: String,
  city: String,
  postalCode: String,
  streetAddress: String,
});

export const Information =
  models?.Information || model("Information", InformationSchema);
