import React from "react";
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

const Bioremediation = () => {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-secondary selection:text-primary">
      <Breadcrumb />

      <BioremediationHero />
      <WhatIsBioremediation />
      <WhereItFits />
      <RevaApproach />
      <SolutionToolbox />
      <WhatClientsReceive />
      <EuropeLeadership />
      <PilotSystems />
      {/* <BioremediationCTA /> */}
    </div>
  );
};

export default Bioremediation;
