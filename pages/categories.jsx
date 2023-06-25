import Center from "@/components/Center";
import Container from "@/components/Container";
import Header from "@/components/Header";
import ProductWhiteBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Link from "next/link";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 6px;
  gap: 10px;
  h2 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  a {
    color: #222;
  }
`;

const ShowMoreSquare = styled(Link)`
  background-color: #ddd;
  height: 160px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  text-decoration: none;
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

export default function CategoriesPage({ mainCategories, categoriesProducts }) {
  return (
    <>
      <Header />
      <Container>
        <Center>
          {mainCategories.map((cat) => (
            <CategoryWrapper key={cat._id}>
              <CategoryTitle>
                <h2>{cat.name}</h2>
                <Link href={"/categories/" + cat._id}>Show all</Link>
              </CategoryTitle>
              <CategoryGrid className="">
                {categoriesProducts[cat._id].map((p, index) => (
                  <RevealWrapper delay={index * 50} key={p._id}>
                    <ProductWhiteBox {...p} />
                  </RevealWrapper>
                ))}
                <RevealWrapper delay={categoriesProducts[cat._id].length * 50}>
                  <ShowMoreSquare href={"/categories/" + cat._id}>
                    Show more &rarr;
                  </ShowMoreSquare>
                </RevealWrapper>
              </CategoryGrid>
            </CategoryWrapper>
          ))}
        </Center>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProducts = {};

  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId) //here
      .map((c) => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 },
    });
    categoriesProducts[mainCatId] = products;
  }

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
    },
  };
}
