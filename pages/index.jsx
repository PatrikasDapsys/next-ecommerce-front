import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useLayoutEffect } from "react";

export default function HomePage({ featuredProduct, newProducts }) {
  function ScrollToTop() {
    window.scrollTo(0, 0);
  }

  useLayoutEffect(() => {
    setTimeout(() => {
      ScrollToTop();
    }, 0);
  }, []);

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredProductId = "6491a8be2472d0c68f63949d";
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
