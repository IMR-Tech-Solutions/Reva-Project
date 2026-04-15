import React, { useState, useEffect } from "react";
import ProcessHero from "../Component/ProcessServiceComponents/ProcessHero";
import Breadcrumb from "../Component/Breadcrumb";
import ProcessServices from "../Component/ProcessServiceComponents/ProcessServices";
import ProcessWorkflow from "../Component/ProcessServiceComponents/ProcessWorkflow";
import IndustriesServed from "../Component/ProcessServiceComponents/IndustriesServed";
import TechnicalCapabilities from "../Component/ProcessServiceComponents/TechnicalCapabilities";
import api from "../api/api";

const Feasibility = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getServiceBySlug("feasibility");
        setService(data);
      } catch (err) {
        console.error("Failed to fetch feasibility service:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Breadcrumb />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  if (!service) {
    return (
      <>
        <Breadcrumb />
        <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
          Service not found.
        </div>
      </>
    );
  }

  // Extract sections by key
  const sections = service.sections || [];
  const servicesSection = sections.find(s => s.section_key === "services");
  const capabilitiesSection = sections.find(s => s.section_key === "capabilities");
  const workflowSection = sections.find(s => s.section_key === "workflow");
  const industriesSection = sections.find(s => s.section_key === "industries");

  return (
    <>
      <Breadcrumb />
      <ProcessHero service={service} />
      {servicesSection && <ProcessServices section={servicesSection} />}
      {capabilitiesSection && <TechnicalCapabilities section={capabilitiesSection} />}
      {workflowSection && <ProcessWorkflow section={workflowSection} />}
      {industriesSection && <IndustriesServed section={industriesSection} />}
    </>
  );
};

export default Feasibility;
