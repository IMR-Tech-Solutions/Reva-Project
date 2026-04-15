import React from "react";
import HeroHome from "../Component/HomeComponents/HeroHome.jsx";
import AboutHero from "../Component/HomeComponents/AboutHero.jsx";
import IndustriesSection from "../Component/HomeComponents/IndustriesSection.jsx";
import StrategicAdviceSection from "../Component/HomeComponents/StrategicAdviceSection.jsx";
import WorkInActionSection from "../Component/HomeComponents/WorkInActionSection.jsx";
import JoinTeamSection from "../Component/HomeComponents/JoinTeamSection.jsx";
// import LatestNewsSection from "../Component/HomeComponents/LatestNewsSection.jsx";
import GetInTouchSection from "../Component/HomeComponents/GetInTouchSection.jsx";
import ProductsShowcase from "../Component/HomeComponents/ProductsShowcase.jsx";
import TestimonialsSection from "../Component/HomeComponents/TestimonialsSection.jsx";
// import GlobalPresenceSection from "../Component/HomeComponents/GlobalPresenceSection.jsx";


const Home = () => {
  return (
    <>
      <HeroHome />
      <AboutHero />
      <IndustriesSection />
      <WorkInActionSection />
      <ProductsShowcase />
      <StrategicAdviceSection />
      <JoinTeamSection />
      <TestimonialsSection />
      {/* <LatestNewsSection /> */}
      {/* <GlobalPresenceSection /> */}
      <GetInTouchSection />
    </>
  );
};

export default Home;
