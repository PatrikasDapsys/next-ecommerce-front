import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div``;
const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  text-align: center;
  height: 2rem;
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 768px) {
    display: block;
    text-align: unset;
  }
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  text-align: center;
  gap: 5px;
  @media screen and (min-width: 768px) {
    text-align: unset;
    display: flex;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export default function ProductWhiteBox({
  _id,
  title,
  description,
  price,
  images,
}) {
  const url = "/product/" + _id;
  const { addProduct } = useContext(CartContext);

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div className="">
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price className="">${price}</Price>
          <Button block primary outline onClick={() => addProduct(_id)}>
            Add to Cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
