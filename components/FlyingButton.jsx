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
    white-space: nowrap;
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
  @keyframes fly {
    100% {
      top: 0;
      left: 100%;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }
  img {
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    display: none;
    animation: fly 1s;
    z-index: 5;
  }
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  const imgRef = useRef();

  function animateSendImageToCart(ev) {
    imgRef.current.style.display = "inline-block";
    imgRef.current.style.left = ev.clientX - 50 + "px";
    imgRef.current.style.top = ev.clientY - 50 + "px";
    setTimeout(() => {
      imgRef.current.style.display = "none";
    }, 1000);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imgRef.current.closest("div[data-sr-id]");
      if (reveal?.style.opacity === "1") {
        reveal.style.transform = "none";
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <FlyingButtonWrapper
        primary={props.primary}
        white={props.white}
        small={props.small}
        onClick={() => addProduct(props._id)}
      >
        <img src={props.src} ref={imgRef} />
        <button onClick={(ev) => animateSendImageToCart(ev)} {...props} />
      </FlyingButtonWrapper>
    </>
  );
}
