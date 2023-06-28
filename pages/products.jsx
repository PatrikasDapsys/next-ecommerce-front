import Center from "@/components/Center";
import Container from "@/components/Container";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";

export default function ProductsPage({ products, wishedProduct }) {
  return (
    <>
      <Header />
      <Container>
        <Center>
          <Title>All Products</Title>
          <ProductGrid products={products} wishedProduct={wishedProduct} />
        </Center>
      </Container>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { "_id:": -1 } });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProduct = session?.user
    ? await WishedProduct.find({
        userEmail: session?.user.email,
        product: products.map((p) => p._id.toString()),
      })
    : [];

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProduct: wishedProduct.map((i) => i.product.toString()),
    },
  };
}
