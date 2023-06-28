import styled from "styled-components";

const StyledOrder = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #aaa;
  display: flex;
  flex-direction: column;
  width: 100%;
  time {
    font-size: 0.85rem;
    color: #000;
  }
  hr {
    width: 30%;
    margin-left: 0;
  }
`;
const ProductRow = styled.div`
  span {
    color: #888;
  }
`;
const Information = styled.div`
  font-size: 0.8rem;
  line-height: 0.8rem;
  margin-top: 0.3rem;
  color: #444;
`;
const OrderItems = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
`;
const OrderData = styled.div`
  display: grid;
  grid-template-columns: .8fr 1.2fr;
`;

export default function SingleOrder({ line_items, createdAt, ...rest }) {
  return (
    <StyledOrder>
      <div>
        <time>{new Date(createdAt).toLocaleString("en-US")}</time>
        <hr />
      </div>
      <OrderData>
        <Information>
          {rest.name} <br />
          {rest.email} <br />
          {rest.country}, {rest.city} <br />
          {rest.postalCode} <br />
          {rest.streetAddress} <br />
        </Information>
        <OrderItems>
          {line_items.map((item, index) => (
            <ProductRow key={index}>
              <span>{item.quantity} x </span>
              {item.price_data.product_data.name}
            </ProductRow>
          ))}
        </OrderItems>
      </OrderData>
    </StyledOrder>
  );
}
