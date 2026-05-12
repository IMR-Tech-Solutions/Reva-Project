import React, { useState, useEffect } from "react";
import Breadcrumb from "../Component/Breadcrumb";

// Import Components
import BioremediationHero from "../Component/BioremediationComponents/BioremediationHero";
import WhatIsBioremediation from "../Component/BioremediationComponents/WhatIsBioremediation";
import WhereItFits from "../Component/BioremediationComponents/WhereItFits";
import RevaApproach from "../Component/BioremediationComponents/RevaApproach";
import SolutionToolbox from "../Component/BioremediationComponents/SolutionToolbox";
import WhatClientsReceive from "../Component/BioremediationComponents/WhatClientsReceive";
import EuropeLeadership from "../Component/BioremediationComponents/EuropeLeadership";
import PilotSystems from "../Component/BioremediationComponents/PilotSystems";
// import BioremediationCTA from "../Component/BioremediationComponents/BioremediationCTA";

const API_BASE = import.meta.env.VITE_API_URL;

const Bioremediation = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/bioremediation`);
        if (res.ok) setData(await res.json());
      } catch (err) {
        console.log("Using static content fallback");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-secondary selection:text-primary">
      <Breadcrumb />
      <BioremediationHero data={data} />
      <WhatIsBioremediation data={data} />
      <WhereItFits data={data} />
      <RevaApproach data={data} />
      <SolutionToolbox data={data} />
      <WhatClientsReceive data={data} />
      <EuropeLeadership data={data} />
      <PilotSystems data={data} />
      {/* <BioremediationCTA data={data} /> */}
    </div>
  );
};

export default Bioremediation;
