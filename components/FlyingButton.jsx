import styled from "styled-components";
import { ButtonStyle } from "./Button";
import FlyingButtonOriginal from "react-flying-item";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import { primary } from "@/lib/colors";
import css from "styled-jsx/css";

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle};
    ${(props) =>
      props.primary
        ? `
      background-color: ${primary};
      color: white;
    `
        : `
      background-color: transparent;
      color: ${primary};
    `}
    border: 1px solid ${primary};
    font-size: 1.1rem;
    align-items: center;
    width: 100%;
    justify-content: center;

  ${(props) =>
    props.white && css`
        background-color: white;
    `}
  }

  ${(props) =>
    props.small
      ? `
    width: unset;
    `
      : `
    width: 100%;
  `}
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  return (
    <FlyingButtonWrapper
      primary={props.primary}
      white={props.white}
      small={props.small}
      onClick={() => addProduct(props._id)}
    >
      <FlyingButtonOriginal
        {...props}
        targetTop={"15%"}
        targetLeft={"85%"}
        flyingItemStyling={{
          width: "auto",
          heigth: "auto",
          maxWidth: "100px",
          maxHeight: "100px",
          borderRadius: 0,
        }}
      />
    </FlyingButtonWrapper>
  );
}
