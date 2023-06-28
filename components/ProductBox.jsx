import styled from "styled-components";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import FlyingButton from "./FlyingButton";
import HeartOutlineIcon from "./icons/HeartOutline";
import css from "styled-jsx/css";
import HeartSolidIcon from "./icons/HeartSolid";
import axios from "axios";
import { useSession } from "next-auth/react";

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
  position: relative;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  text-align: center;
  font-weight: normal;
  font-size: 1rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 768px) {
    margin-bottom: 6px !important;
    display: block;
    text-align: unset;
  }
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2px;
  text-align: center;
  gap: 5px;
  @media screen and (min-width: 768px) {
    text-align: unset;
    display: flex;
    flex-direction: row;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
  }
`;
const WishlistButton = styled.button`
  border: 0;
  width: 40px;
  height: 40px;
  position: absolute;
  background: transparent;
  top: 0;
  right: 0;
  cursor: pointer;
  svg {
    width: 16px;
  }
  ${(props) =>
    props.wished &&
    css`
      color: red;
    `}
`;

export default function ProductWhiteBox({
  _id,
  title,
  description,
  price,
  images,
  wished = false,
  onRemoveFromWishlist = () => {},
}) {
  const url = "/product/" + _id;
  const [isWished, setIswished] = useState(wished);
  const { data: session } = useSession();
  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios
      .post("/api/wishlist", {
        product: _id,
      })
      .then(() => {});
    setIswished(nextValue);
  }

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div className="">
          {session && (
            <WishlistButton wished={isWished} onClick={addToWishlist}>
              {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
            </WishlistButton>
          )}
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price className="">${price}</Price>
          <FlyingButton src={images?.[0]} _id={_id}>
            Add to Cart
          </FlyingButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
