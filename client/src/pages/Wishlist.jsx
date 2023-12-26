import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { userRequest } from '../requestMethods';
import Product from '../components/Product';
import styled from "styled-components";
import Navbar from '../components/Navbar';
import Categorybar from '../components/Categorybar';
import Footer from '../components/Footer';

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


const Wishlist = () => {
  const [wishListItems, setWishListItems] = useState([]);
  const [wishList, setWishList] = useState(null);
  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {
    const fetchWishList = async() => {
       try{
        const response = await userRequest.get("wishlist/" + user._id);;
        setWishList(response.data);
        console.log(response.data);
       }catch(err){
        console.log(err.message);
       }
    }
    fetchWishList();
  }, []);

  useEffect(() => {
    const fetchProducts = async() => {
        try {
        const promises = wishList.products.map(productId => userRequest.get(`products/find/${productId}`));
        let products = await Promise.all(promises);
        products = products.map(product => product.data);
        setWishListItems(products);
        // console.log(products);
        } catch (error) {
            console.log(error.message);
        }
    };
    fetchProducts();
  }, [wishList]);

  return (
    <React.Fragment>
    <Navbar/>
    <Container>
    <ProductType>Wishlist</ProductType>
    <Wrapper>
      {wishListItems.length > 0 ? wishListItems.map((item) => <Product item={item} key={item.id} />) : 
      <h3 style={{color: "red"}}>Please Add add some items to Wishlist</h3>
    }
      </Wrapper>
    </Container>
    <Footer/>
    </React.Fragment>
  )
}

export default Wishlist;