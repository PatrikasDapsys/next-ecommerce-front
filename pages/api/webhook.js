import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { buffer } from "micro";
const stripe = require("stripe")(process.env.STRIPE_SK);

const endpointSecret =
  "whsec_f18739b68ef8606dfec4e5c50f3ec42ccc707c00e53e96aff83c8ba652597d1e";

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      console.log(orderId, paid); 
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send("ok");
} 

export const config = {
  api: { bodyParser: false },
};
//acct_1NLmoIDR2qJYMLV9
// Your webhook signing secret is whsec_f18739b68ef8606dfec4e5c50f3ec42ccc707c00e53e96aff83c8ba652597d1e
