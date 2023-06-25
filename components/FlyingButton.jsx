import styled from "styled-components";
import { ButtonStyle } from "./Button";
import FlyingButtonOriginal from "react-flying-item";
import { CartContext } from "./CartContext";
import { useContext, useEffect, useRef, useState } from "react";
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
    align-items: center;
    width: 100%;
    justify-content: center;

    ${(props) =>
      props.white &&
      css`
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

  function animateSendImageToCart(ev, imageSrc) {
    console.log(ev, imageSrc);
  }

  return (
    <>
      <div style={{ width: "1px", height: "1px" }}></div>
      <FlyingButtonWrapper
        primary={props.primary}
        white={props.white}
        small={props.small}
        onClick={() => addProduct(props._id)}
      >
        <button
          onClick={(ev) => animateSendImageToCart(ev, props.src)}
          {...props}
        />
      </FlyingButtonWrapper>
    </>
  );
}
