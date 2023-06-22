import { Schema, model, models } from "moongose";

const OrderSchema = new Schema({
  line_items: Object,
  name: String,
  email: String,
  country: String,
  city: String,
  postalCode: String,
  streetAddress: String,
  paid: Boolean,
});

export const Order = models?.Order || model("Order", OrderSchema);
