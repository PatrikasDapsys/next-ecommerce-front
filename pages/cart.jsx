import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: 40px;
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

export default function CartPage({}) {
  const [products, setProducts] = useState([]);
  const { cartProducts } = useContext(CartContext);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  return (
    <>
      <Header />

      <Center>
        <ColWrapper>
          <Box>
            {!cartProducts?.length && (
              <div className="">Your Cart is Empty</div>
            )}
            {products?.length > 0 && (
              <>
                <h2>Cart:</h2>
                {products.map((product) => (
                  <div>
                    {product.title}:{" "}
                    {cartProducts.filter((id) => id === product._id).length}
                  </div>
                ))}
              </>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="Address 2" />
              <Button block primary>
                Continue to Payment
              </Button>
            </Box>
          )}
        </ColWrapper>
      </Center>
    </>
  );
}
