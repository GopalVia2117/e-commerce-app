import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';


const Bar = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-inline: 8px;
    padding-block: 16px;
	
    &::-webkit-scrollbar{
	display: none;
    }
`;
const Category = styled.span`
    padding-inline: 10px;
    padding-block: 5px;
    font-weight: bold;
    border-radius: 20px;
    border: 1px solid black;
    margin-left: 4px;
    text-wrap: nowrap;
`
const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"
  ];


const Categorybar = () => {
  return (
    <Bar>
        {categories.map(category => <Link style={{textDecoration: "none", color: "black"}} to={`/products/${category}`}><Category>{category[0].toUpperCase() + category.substring(1)}</Category></Link>)}
    </Bar>
  )
}

export default Categorybar