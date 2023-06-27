import Button from "@/components/Button";
import Center from "@/components/Center";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import { useState } from "react";
import styled from "styled-components";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  async function login() {
    await signIn("google");
  }
  async function saveInformation() {
    const data = {
      name,
      email,
      country,
      city,
      postalCode,
      streetAddress,
    };
    axios.put("/api/information", data);
  }

  return (
    <>
      <Header />
      <Container>
        <Center>
          <ColsWrapper>
            <div>
              <RevealWrapper origin="left" delay={50}>
                <WhiteBox>
                  <h2>Wishlist</h2>
                </WhiteBox>
              </RevealWrapper>
            </div>
            <div>
              <RevealWrapper origin delay={200}>
                <WhiteBox>
                  <h2>Account details</h2>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    name="name"
                    onChange={(ev) => setName(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                  <CityHolder>
                    <Input
                      type="text"
                      placeholder="Country"
                      value={country}
                      name="country"
                      onChange={(ev) => setCountry(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="City"
                      value={city}
                      name="city"
                      onChange={(ev) => setCity(ev.target.value)}
                    />
                  </CityHolder>
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                  />
                  <Button block primary onClick={saveInformation}>
                    Save
                  </Button>
                  <hr />
                  {session && (
                    <Button primary onClick={logout}>
                      Log out
                    </Button>
                  )}
                  {!session && (
                    <Button primary onClick={login}>
                      Login
                    </Button>
                  )}
                </WhiteBox>
              </RevealWrapper>
            </div>
          </ColsWrapper>
        </Center>
      </Container>
    </>
  );
}
