import styled from "styled-components";
import Center from "./Center";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import FlyingButton from "./FlyingButton";
import { RevealWrapper } from "next-reveal";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 110px 20px 50px;
  position: relative;
  top: -60px;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 2rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;
const Decs = styled.p`
  color: #aaa;
  font-size: 0.8 rem;
`;
const ColumsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr;
  gap: 40px;
  text-align: center;
  img.main-image {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 1;
    width: 100%;
  }
  @media screen and (min-width: 768px) {
    text-align: unset;
    grid-template-columns: 0.9fr 1.1fr;
    div:nth-child(1) {
      order: 0;
    }
    img.main-image {
      max-width: 100%;
    }
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 768px) {
    justify-content: start;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

export default function Featured({ product }) {
  return (
    <Bg>
      <Center>
        <ColumsWrapper>
          <Column>
            <div>
              <RevealWrapper origin="left" delay={300}>
                <Title>{product.title}</Title>
                <Decs>{product.description}</Decs>
                <RevealWrapper origin="left" delay={450}>
                  <ButtonsWrapper>
                    <ButtonLink
                      href={"/product/" + product._id}
                      white="1"
                      outline="1"
                    >
                      Read More
                    </ButtonLink>
                    <FlyingButton
                      _id={product._id}
                      src={product.images[0]}
                      white={`1`}
                      small={"1"}
                    >
                      <CartIcon />
                      Add to Cart
                    </FlyingButton>
                  </ButtonsWrapper>
                </RevealWrapper>
              </RevealWrapper>
            </div>
          </Column>
          <Column>
            <RevealWrapper delay={0}>
              <img
                className="main-image"
                src={product.images[0]}
                alt=""
              />
            </RevealWrapper>
          </Column>
        </ColumsWrapper>
      </Center>
    </Bg>
  );
}
