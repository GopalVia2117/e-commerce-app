import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import {redirect} from "react-router-dom";
import {useHistory} from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: max-content;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const notEmpty = name && lastName && username && email && password && confirmPassword;
    if(!notEmpty){
      alert("Fields must not be empty");
      return;
    }

    if(password !== confirmPassword) { 
      console.log("Password does not match");
      return;
    }

    const data = {
      "firstname": name,
      "lastname": lastName,
      "username": username,
      "email": email,
      "password": password,
    }

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    try{
      const response = await axios.post(`${BASE_URL}/auth/register`, data);
      console.log(response.data);
      history.replace("/login");
    }
    catch(error){
      console.log(error);
    }
  }
  return (  
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input required placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
          <Input required placeholder="last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          <Input required placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <Input required placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input required placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Input required placeholder="confirm password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>

          <FlexWrapper>
          <Button onClick={handleSubmit}>CREATE</Button>
         
          <p><Link to="/login" style={{fontSize: '14px', textDecoration: 'underline'}}>Login</Link></p>
          </FlexWrapper>
         
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
