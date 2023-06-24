import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { categories, ...filters } = req.query;
  const productsQuery = {
    category: categories.split(","),
  };
  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((filterName) => {
      productsQuery["properties." + filterName] = filters[filterName];
    });
  }
  res.json(await Product.find(productsQuery));
}
