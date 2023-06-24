import Center from "@/components/Center";
import Container from "@/components/Container";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <Container>
        <Center>
          <Title>All Products</Title>
          <ProductGrid products={products} />
        </Center>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { "_id:": -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
