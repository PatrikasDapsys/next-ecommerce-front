import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Container from "@/components/Container";
import FlyingButton from "@/components/FlyingButton";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;
export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);

  return (
    <>
      <Header />
      <Container>
        <Center>
          <ColWrapper>
            <WhiteBox>
              <ProductImages images={product.images} />
            </WhiteBox>
            <div>
              <Title>{product.title}</Title>
              <p>{product.description}</p>
              <PriceRow>
                <Price className="">${product.price}</Price>
                <div className="">
                  <FlyingButton
                    primary={`1`}
                    _id={product._id}
                    src={product.images[0]}
                  >
                    <CartIcon /> Add to Cart
                  </FlyingButton>
                </div>
              </PriceRow>
            </div>
          </ColWrapper>
        </Center>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
