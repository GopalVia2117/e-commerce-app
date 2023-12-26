import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";

import { userRequest } from "../requestMethods";
import { removeProduct, incrementProductQuantity, decrementProductQuantity } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import {loadStripe} from "@stripe/stripe-js";
import {Link} from 'react-router-dom';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};

  &:disabled{
    background-color: lightgray;
    cursor: not-allowed;
  }
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 42vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:disabled{
    background-color: lightgray;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
    cursor: pointer;
    border: none;
    outline: none;
    padding: 10px;
    background-color: red;
    color: white;
    font-weight: 600;
    margin-top: 10px;
`;

const NoProducts = styled.div`
    flex: 3;
`;

const AddButton = styled.button`
    background-color: transparent;
    outline: none;
    border: none;
`;

const SubtractButton = styled.button`
    background-color: transparent;
    outline: none;
    border: none;
`;




const Cart = () => {
  const SERVER_URL = process.env.REACT_APP_BASE_URL;
  const user = useSelector((state) => state.user);

  const cart = useSelector((state) => state.cart);
  // const [stripeToken, setStripeToken] = useState(null);
  // const history = useHistory();
  const dispatch = useDispatch();


  const makePayment = async () => {
    try {
       const {data: res} = await userRequest.post(`${SERVER_URL}/checkout/create-checkout-session`, {products: cart.products, user: user});
       window.location = res.url;
      } catch {}
  }


  const removeCartItem = async (obj) => {
    // console.log(id);
    dispatch(removeProduct(obj));
  }

  const incrementProduct = async (obj) => {
    dispatch(incrementProductQuantity(obj));
  }

  const decrementProduct = async (obj) => {
    dispatch(decrementProductQuantity(obj));
  }


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton><Link to="/shop">CONTINUE SHOPPING</Link></TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton disabled={!user.currentUser || cart.products.length == 0} onClick={makePayment} type="filled">CHECKOUT NOW</TopButton>
        </Top>

        <Bottom>
        {cart.products.length > 0 ?
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.thumbnail} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size || 'XS'}
                    </ProductSize>

                    <DeleteButton onClick={() => removeCartItem({id: product._id})}>Remove From Cart</DeleteButton>

                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                   <AddButton onClick={() => incrementProduct({id: product._id})}><Add/></AddButton> 
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <SubtractButton onClick={() => decrementProduct({id: product._id})}><Remove/></SubtractButton>
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
           : 
           <NoProducts>
            <h3 style={{color: "red", marginBottom: "20px"}}>Please Add add some items to Cart</h3>
           </NoProducts>
           }
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <Button disabled={!user.currentUser || cart.products.length == 0} onClick={makePayment}>CHECKOUT NOW</Button>
              </Summary>
              </Bottom>
              </Wrapper>
              <Footer />
    </Container>
  );
};

export default Cart;





  

