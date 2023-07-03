import styled from "styled-components";
import WhiteBox from "./WhiteBox";
import StarsRating from "./StarsRating";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);

  function submitReview() {
    const data = {
      title,
      description,
      stars,
      product: product._id,
    };
    axios.post("/api/reviews", data).then(res => {
      setTitle('')
      setDescription('')
      setStars(0)
      alert('ok')
    });
  }

  return (
    <div>
      <Title>Reviews</Title>
      <ColsWrapper>
        <WhiteBox>
          <Subtitle>Add a Review</Subtitle>
          <div>
            <StarsRating onChange={(n) => setStars(n)} />
          </div>
          <Input
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Title"
          />
          <TextArea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="Feel free to leave a review"
          />
          <div>
            <Button primary onClick={submitReview}>
              Submit review
            </Button>
          </div>
        </WhiteBox>
        <div>
          <Subtitle>All Review</Subtitle>
        </div>
      </ColsWrapper>
    </div>
  );
}
