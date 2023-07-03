import styled from "styled-components";

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;
const Subtitle = styled.h3`
  font-size: 1rem;
  margin-top: 5px;
`;
const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

export default function ProductReviews({ product }) {
  return (
    <div>
      <Title>Reviews</Title>
      <ColsWrapper>
        <div>
          <Subtitle>Add a Review</Subtitle>
          <input type="text" placeholder="Title"/>
        </div>
        <div>
          <Subtitle>All Review</Subtitle>
        </div>
      </ColsWrapper>
    </div>
  );
}
