import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Information } from "@/models/Information";

export default async function handle(req, res) {
  await mongooseConnect();
  const { user } = await getServerSession(req, res, authOptions);
  if (req.method === "PUT") {
    const information = await Information.findOne({ userEmail: user.email });
    if (information) {
      res.json(await Information.findByIdAndUpdate(information._id, req.body));
    } else {
      res.json(
        await Information.create({
          userEmail: user.email,
          ...req.body,
        })
      );
    }
    res.json(user);
  }
  if (req.method === "GET") {
    const information = await Information.findOne({ userEmail: user.email });
    res.json(information);
  }
}
