const { Schema, models, model } = require("mongoose");

const FeaturedsSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    value: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Featureds = models?.Featureds || model("Featureds", FeaturedsSchema);
