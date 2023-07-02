import { mongooseConnect } from "@/lib/mongoose";
import { Settings } from "@/models/Settings";

export default async function handle(req, res) {
  await mongooseConnect();
  if (req.method === "GET") {
    const { name } = req.query;
    res.json(await Settings.findOne({ name }));
  }
}
