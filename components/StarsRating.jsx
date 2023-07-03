import styled from "styled-components";
import StarOutline from "./icons/StarOutline";
import { useState } from "react";
import StarSolid from "./icons/StarSolid";

const StarsWrapper = styled.div`
  display: inline-flex;
  position: relative;
  top: 2px;
  align-items: center;
`;
const StarWrapper = styled.button`
  cursor: pointer;
  width: 1.4rem;
  height: 1.4rem;
  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  color: gold;
`;

export default function StarsRating({
  defaultHowMany = 0,
  onChange = () => {},
}) {
  const [howMany, setHowMany] = useState(defaultHowMany);
  const five = [1, 2, 3, 4, 5];

  function handleStarClick(n) {
    setHowMany(n);
    onChange(n);
  }

  return (
    <StarsWrapper className="">
      {five.map((n) => (
        <>
          <StarWrapper onClick={() => handleStarClick(n)}>
            {howMany >= n ? <StarSolid /> : <StarOutline />}
          </StarWrapper>
        </>
      ))}
    </StarsWrapper>
  );
}
