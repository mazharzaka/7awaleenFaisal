import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import Downto500 from "./Downto500";
import LogoCarousel from "../UI/LogoCarousel";

const Home = () => {
  return (
    <main>
      <Hero />
      <LogoCarousel  logos={[{image:"/images/logo/valu.png",title:"logo",length:10,width:10,height:10},{image:"/images/logo/BTECH.png",title:"logo",length:10,width:10,height:10},{image:"/images/logo/logo-removebg-preview.png",title:"logo",length:10,width:10,height:10}]}/>  
      <Categories />
      <Testimonials />
      <NewArrival />
      <PromoBanner show={true} />
      <Downto500 />
      <PromoBanner />
      <BestSeller />
      <CounDown />
      <Newsletter />
    </main>
  );
};

export default Home;
