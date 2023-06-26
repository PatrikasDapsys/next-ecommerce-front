import Center from "@/components/Center";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductGrid from "@/components/ProductGrid";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const SearchInput = styled(Input)`
  padding: 5px 10px;
  font-size: 1.4rem;
`;
const InputWrapper = styled.div`
  position: sticky;
  top: 65px;
  background-color: #eeeeee90;
  backdrop-filter: blur(2px);
  padding-top: 10px;
  padding-bottom: 10px;
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);

  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);

  function searchProducts(phrase) {
    axios
      .get("/api/products?phrase=" + encodeURIComponent(phrase))
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }

  return (
    <>
      <Header />
      <Container>
        <Center>
          <Title>Search</Title>
          <InputWrapper>
            <SearchInput
              value={phrase}
              onChange={(ev) => setPhrase(ev.target.value)}
              autoFocus
              placeholder="Search For Products..."
            />
          </InputWrapper>
          {!isLoading && phrase !== "" && products.length === 0 && (
            <h2>No product found for "{phrase}"</h2>
          )}
          {isLoading && <Spinner fullWidth={true} />}
          {!isLoading && products.length > 0 && (
            <ProductGrid products={products} />
          )}
        </Center>
      </Container>
    </>
  );
}
