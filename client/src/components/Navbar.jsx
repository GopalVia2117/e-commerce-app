import { Badge } from "@material-ui/core";
import { FavoriteBorder, Person, Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {logout} from "../redux/userRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 300px;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  margin-left: 25px;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  align-items: center;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Logout = styled.span`
  // margin-left: 10px;
`;

const LogoutText = styled.span`
  ${mobile({display: "none"})}
`;


const Cart = styled.span`
 display: block;
 ${mobile({display: "none"})};
`;

const Wishlist = styled.span`
 display: block;
 ${mobile({display: "none"})};
`;


const Navbar = () => {
  const dispatch = useDispatch();
  const quantity = useSelector(state=>state.cart.quantity)
  const user = useSelector(state => state.user);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          
        </Left>
        <Center>
          <Link to="/"><Logo>.ESHOP.</Logo></Link>
        </Center>
        <Right>

          <Link to="/cart">
          <MenuItem>
            <Badge style={{display: "flex", alignItems: "center"}} badgeContent={quantity} color="primary">
              <ShoppingCartOutlined /> <Cart>Cart</Cart>
            </Badge>
          </MenuItem>
          </Link>
          {user && user.currentUser && (
          <Link to="/wishlist">
          <MenuItem>
            <Badge style={{display: "flex", alignItems: "center"}} badgeContent={0} color="primary">
              <FavoriteBorder/> <Wishlist>Wishlist</Wishlist>
            </Badge>
          </MenuItem>
          </Link>)}

          <MenuItem>
          {user && !user.currentUser ? (<Link style={{display: "flex", alignItems: "center"}} to="/login"> <Person/> Sign In</Link>) : ""}
          {user && user.currentUser ? (<Logout style={{display: "flex", alignItems: "center"}} onClick={() => dispatch(logout())}><Person/><LogoutText>Log Out</LogoutText></Logout>): ""}
          </MenuItem>
         
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;


// (<MenuItem><Link to="/register">REGISTER</Link></MenuItem>



// <SearchContainer>
//             <Input list="categories" placeholder="Search" />
//             <Search style={{ color: "gray", fontSize: 16 }} />
//           </SearchContainer>
