import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {useSelector} from "react-redux";
import { userRequest } from "../requestMethods";


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  max-width: 75%;
  height: 75%;
  object-fit: cover;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ProductTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  margin-top: 10px;
`;
const Product = ({ item }) => {
  
  const user = useSelector(state => state.user.currentUser);
  const addToWishlist = async (productId) => {
    try{
     const response = await userRequest.post("wishlist", {userId: user._id, productId});
     console.log(response.data);
    }
    catch(err){
      console.log(err.message);
    }
  }

  const addToCart = () => {

  }
  return (
    <Container>
      <Circle />
      <Image src={item.thumbnail} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
          <SearchOutlined />
          </Link>
        </Icon>
        <Icon onClick={() => addToWishlist(item._id)}>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
      <ProductTitle>{item.title}</ProductTitle>
      <ProductPrice>$ {item.price}</ProductPrice>
    </Container>
  );
};

export default Product;
