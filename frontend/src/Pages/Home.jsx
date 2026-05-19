import React from "react";
import SEO from "../Component/SEO.jsx";
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
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://revaprocess.in/#organization",
        "name": "REVA Process Technologies",
        "url": "https://revaprocess.in",
        "logo": "https://revaprocess.in/logo.png",
        "sameAs": [
          "https://www.linkedin.com/company/reva-process-technologies"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-20-6723-6400",
          "contactType": "customer service",
          "email": "info@revaprocesstechnologies.com"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Baner",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "postalCode": "411045",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://revaprocess.in/#website",
        "url": "https://revaprocess.in",
        "name": "REVA Process Technologies",
        "description": "REVA Process Technologies delivers complete engineering and manufacturing solutions for chemical, petrochemical, biogas, and environmental industries. Based in Pune, India.",
        "publisher": {
          "@id": "https://revaprocess.in/#organization"
        }
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Engineering & Process Solutions"
        description="REVA Process Technologies delivers complete engineering and manufacturing solutions for chemical, petrochemical, biogas, and environmental industries. Based in Pune, India."
        keywords="process engineering, process skids, chemical plant design, biogas upgradation, reactors, detailed engineering, Pune, India, revaprocess"
        schema={homeSchema}
      />
      <HeroHome />
      <AboutHero />
      <IndustriesSection />
      <WorkInActionSection />
      <ProductsShowcase />
      <StrategicAdviceSection />
      {/* <JoinTeamSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <LatestNewsSection /> */}
      {/* <GlobalPresenceSection /> */}
      <GetInTouchSection />
    </>
  );
};

export default Home;
