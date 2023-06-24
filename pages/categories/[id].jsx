import Center from "@/components/Center";
import Container from "@/components/Container";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Title from "@/components/Title";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 1.5em;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: #444;
  select {
    background-color: transparent;
    border: 0;
    font-size: inherit;
  }
`;

export default function CategoryPage({
  category,
  subCategories,
  products: originalProducts,
}) {
  const [products, setProducts] = useState(originalProducts);
  const [filterValues, setFilterValues] = useState(
    category.properties.map((p) => ({ name: p.name, value: "all" }))
  );

  function handleFilterChange(filterName, filterValue) {
    setFilterValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
  }

  useEffect(() => {
    const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];
    const params = new URLSearchParams();
    params.set("categories", catIds.join(","));
    filterValues.forEach((f) => {
      if (f.value !== "all") {
        params.set(f.name, f.value);
      }
    });
    const url = `/api/products?${params.toString()}`;
    axios.get(url).then((response) => {
        setProducts(response.data);
    });
  }, [filterValues]);

  return (
    <>
      <Header />
      <Container>
        <Center>
          <CategoryHeader>
            <h1>{category.name}</h1>
            <FiltersWrapper>
              {category.properties.map((prop) => (
                <Filter key={prop.name}>
                  <span>{prop.name}: &nbsp;</span>
                  <select
                    onChange={() =>
                      handleFilterChange(prop.name, event.target.value)
                    }
                    value={filterValues.find((f) => f.name === prop.name).value}
                  >
                    <option value={"all"}>All</option>
                    {prop.values.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </Filter>
              ))}
            </FiltersWrapper>
          </CategoryHeader>
          <ProductGrid products={products} />
        </Center>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({ parent: category._id });
  const catIds = [category._id, ...subCategories.map((c) => c._id)];
  const products = await Product.find({ category: catIds });

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}