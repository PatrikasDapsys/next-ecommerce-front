import { GridLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
  ${(props) =>
    props.fullWidth
      ? `
    display: flex;
    justify-content: center;
    margin-top:40px;
    `
      : `
    `}
`;

export default function Spinner({ fullWidth }) {
  return (
    <Wrapper fullWidth={fullWidth}>
      <GridLoader speedMultiplier={3} color="#555" />
    </Wrapper>
  );
}
