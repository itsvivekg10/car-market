import { SignInButton } from "@clerk/clerk-react";
import React from "react";
import Header from "./component/header/Header";
import Hero from "./component/Hero/Hero";
import Cateagory from "./component/Categoary/Cateagory";
import InfoSection from "./component/Infosection/InfoSection";
import Footer from "./component/Footer/Footer";
import MostSaleCar from "./component/MostSaleCar/MostSaleCar";
function Home() {
  return (
    <>
      {" "}
      <Header />
      <Hero />
      <Cateagory />
      <MostSaleCar />
      <InfoSection />
      <Footer />
    </>
  );
}

export default Home;
