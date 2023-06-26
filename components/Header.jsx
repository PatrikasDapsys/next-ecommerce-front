import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/BarsIcon";
import SearchIcon from "./icons/SearchIcon";

const StyledHeader = styled.header`
  background-color: rgba(34, 34, 34, 0.8);
  backdrop-filter: blur(20px);
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 8;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  svg {
    height: 18px;
  }
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
    display: block;
    width: 100vw; 
    height: 100vh;
    background-color: #222;
    `
      : `
    display: none;
    `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  color: white;
  width: 30px;
  height: 30px;
  border: 0;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a {
    color: #fff;
    svg {
      width: 14px;
      height: 14px;
      padding: unset;
    }
  }
`;

export default function Header() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(null);
  const { cartProducts } = useContext(CartContext);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    if (mobileNavActive && windowWidth < 768) {
      setMobileNavActive(false);
    }
  }, [windowWidth]);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All Products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts?.length})</NavLink>
          </StyledNav>
          <SideIcons>
            <Link href={"/search"}>
              <SearchIcon />
            </Link>
            <NavButton onClick={() => setMobileNavActive(!mobileNavActive)}>
              <BarsIcon />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
