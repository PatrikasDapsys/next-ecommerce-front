import styled from "styled-components";
import WhiteBox from "./WhiteBox";
import StarsRating from "./StarsRating";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

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
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 40px;
  @media (max-width: 700px){
    grid-template-columns: 1fr 1fr;
  }
`;
const ReviewWrapper = styled.div`
  margin-bottom: 10px;
  padding: 10px 0;
  border-top: 1px solid #ccc;
  h3 {
    margin: 0;
    font-size: 1rem;
    margin-bottom: 4px;
  }
  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1rem;
  }
`;
const ReviewHeader = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  time {
    font-size: 12px;
    font-weight: 300;
    color: #aaa;
  }
`;

export default function ProductReviews({ product }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  function submitReview() {
    const data = {
      title,
      description,
      stars,
      product: product._id,
    };
    axios.post("/api/reviews", data).then((res) => {
      setTitle("");
      setDescription("");
      setStars(0);
      loadReviews();
    });
  }

  function loadReviews() {
    setReviewsLoading(true);
    axios.get("/api/reviews?product=" + product._id).then((res) => {
      setReviews(res.data);
      setReviewsLoading(false);
    });
  }

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <div>
      <Title>Reviews</Title>
      <ColsWrapper>
        <div className="">
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
        </div>
        <div className="">
          <WhiteBox>
            <Subtitle>All Reviews</Subtitle>
            {reviewsLoading && <Spinner fullWidth={true} />}
            {reviews.length === 0 && <p>There aren&apos;t any reviews yet.</p>}
            {reviews.length > 0 &&
              reviews.map((review) => (
                <ReviewWrapper key={review.createdAt}>
                  <ReviewHeader>
                    <StarsRating
                      size={"sm"}
                      defaultHowMany={review.stars}
                      disabled={true}
                    />
                    <time>
                      {new Date(review.createdAt).toLocaleString("en-US")}
                    </time>
                  </ReviewHeader>
                  <h3>{review.title}</h3>
                  <p>{review.description}</p>
                </ReviewWrapper>
              ))}
          </WhiteBox>
        </div>
      </ColsWrapper>
    </div>
  );
}
