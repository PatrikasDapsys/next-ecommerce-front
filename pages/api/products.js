import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { categories, sort, ...filters } = req.query;
  const [sortField, sortOrder] = sort.split("-");
  const productsQuery = {
    category: categories.split(","),
  };
  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((filterName) => {
      productsQuery["properties." + filterName] = filters[filterName];
    });
  }
  res.json(
    await Product.find(productsQuery, null, {
      sort: { [sortField]: sortOrder === "asc" ? 1 : -1 },
    })
  );
}
