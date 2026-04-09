import React from "react";
import ProcessHero from "../Component/ProcessServiceComponents/ProcessHero";
import Breadcrumb from "../Component/Breadcrumb";
import ProcessServices from "../Component/ProcessServiceComponents/ProcessServices";
import ProcessWorkflow from "../Component/ProcessServiceComponents/ProcessWorkflow";
import IndustriesServed from "../Component/ProcessServiceComponents/IndustriesServed";
import TechnicalCapabilities from "../Component/ProcessServiceComponents/TechnicalCapabilities";

const Feasibility = () => {
  return (
    <>
      <Breadcrumb />
      <ProcessHero />
      <ProcessServices />
       <TechnicalCapabilities />
      <ProcessWorkflow />
      <IndustriesServed />
     
      
    </>
  );
};

export default Feasibility;
