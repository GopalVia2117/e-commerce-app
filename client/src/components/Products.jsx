import React,{ useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import {useLocation} from "react-router-dom";


const Container = styled.div`
  padding: 20px;
`;
const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductType = styled.h2`
  margin-left: 12px;
`;
const Products = ({ title, cat, tag, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useLocation();

  useEffect(() => {
    const getProducts = async () => {
      // console.log(filters);
      try {
        const res = await axios.get(
          cat && cat !== "none"
            ? `http://localhost:5000/api/products?category=${cat}`
            : (tag ? `http://localhost:5000/api/products?tag=${tag}` : "http://localhost:5000/api/products")
        );
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat, tag]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <React.Fragment>
    <Container>
    <ProductType>{title}</ProductType>
    <Wrapper>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .map((item) => <Product item={item} key={item.id} />)}
      </Wrapper>
    </Container>
    </React.Fragment>
  );
};

export default Products;
