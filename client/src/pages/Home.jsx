import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import Categorybar from "../components/Categorybar";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Categorybar/>
      <Slider />
      <Products tag="popular" title="Popular Products"/>
      <Products tag="latest" title="Latest Products"/>
      <Products tag="new" title="New Arrival Products"/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;

// <Categories />

