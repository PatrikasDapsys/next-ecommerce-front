import { Featureds } from "@/models/Featureds";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { useEffect } from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function HomePage({
  featuredProduct,
  newProducts,
  wishedNewProduct,
}) {
  function ScrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    setTimeout(() => {
      ScrollToTop(); 
    }, 0);
  }, []);

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} wishedProduct={wishedNewProduct} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const featuredProductSetting = await Featureds.findOne({
    name: "featuredProductId",
  });
  const featuredProductId = featuredProductSetting.value;
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedNewProduct = session?.user
    ? await WishedProduct.find({
        userEmail: session?.user.email,
        product: newProducts.map((p) => p._id.toString()),
      })
    : [];
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProduct: wishedNewProduct.map((i) => i.product.toString()),
    },
  };
}
