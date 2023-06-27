import Button, { ButtonStyle } from "@/components/Button";
import Center from "@/components/Center";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";
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

const ButtonCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const AnimatedButton = styled.div`
  ${ButtonStyle};
  text-align: center;
  width: unset;
  @keyframes buttonAnimation {
    0% {
      transform: scale(1); /* Initial size */
    }
    50% {
      transform: scale(0.95); /* Smaller size */
    }
    100% {
      transform: scale(1); /* Original size */
    }
  }
  ${(props) =>
    props.animation
      ? `
    animation: buttonAnimation 100ms;
  `
      : `
    
  `}
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

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

  function buttonClicked() {
    setIsButtonClicked(true);
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 100);
  }

  useEffect(() => {
    axios.get("/api/information").then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCountry(response.data.country);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setLoaded(true);
    });
  }, []);

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
                  {!loaded && <Spinner fullWidth />}
                  {loaded && (
                    <>
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
                      <AnimatedButton
                        block
                        primary
                        animation={isButtonClicked}
                        onClick={() => {
                          buttonClicked();
                          saveInformation();
                        }}
                      >
                        Save
                      </AnimatedButton>
                    </>
                  )}
                  <hr style={{ marginTop: "20px" }} />
                  {session && (
                    <ButtonCenter className="">
                      <Button primary onClick={logout}>
                        Log out
                      </Button>
                    </ButtonCenter>
                  )}
                  {!session && (
                    <ButtonCenter className="">
                      <Button primary onClick={login}>
                        Login
                      </Button>
                    </ButtonCenter>
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
