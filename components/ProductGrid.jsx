import styled from "styled-components";
import ProductBox from "./ProductBox";
import { RevealWrapper } from "next-reveal";

const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding-top: 20px;
  @media screen and (min-width: 376px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductGrid({ products, wishedProduct = [] }) {
  return (
    <StyledProductGrid>
      {products?.length > 0 &&
        products.map((product, index) => (
          <RevealWrapper delay={index * 50} key={product._id}>
            <ProductBox
              {...product}
              wished={wishedProduct.includes(product._id)}
            />
          </RevealWrapper>
        ))}
    </StyledProductGrid>
  );
}
