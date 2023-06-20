import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;
const Decs = styled.p`
  color: #aaa;
  font-size: 0.8 rem;
`;
const ColumsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
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
              <Title>{product.title}</Title>
              <Decs>{product.description}</Decs>
              <ButtonsWrapper>
                <ButtonLink
                  href={"/products/" + product._id}
                  white="1"
                  outline="1"
                >
                  Read More
                </ButtonLink>
                <Button white>
                  <CartIcon />
                  Add to Cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img
              src="https://www.freepnglogos.com/uploads/macbook-png/macbook-cleanmymac-the-best-mac-cleanup-app-for-macos-get-32.png"
              alt=""
            />
          </Column>
        </ColumsWrapper>
      </Center>
    </Bg>
  );
}
