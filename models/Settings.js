const { Schema, models, model } = require("mongoose");

const SettingsSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    value: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Settings = models?.Settings || model("Settings", SettingsSchema);
