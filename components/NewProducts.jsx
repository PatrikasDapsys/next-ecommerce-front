import styled from "styled-components";
import Center from "./Center";
import ProductGrid from "./ProductGrid";
import Container from "./Container";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 500;
`;

export default function NewProducts({ products, wishedProduct }) {
  return (
    <Container>
      <Center>
        <Title>New Arrivals</Title>
        <ProductGrid products={products} wishedProduct={wishedProduct}/>
      </Center>
    </Container>
  );
}
