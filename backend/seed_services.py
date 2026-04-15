"""
Seed file for Services module.
Seeds: Feasibility & Pilot Plant Study (all sections + items)
Run: python seed_services.py
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy import text
from database import SessionLocal, engine
import models

def seed_services():
    db = SessionLocal()
    try:
        # Drop existing service-related tables using CASCADE to handle dependencies
        print("Dropping existing service tables...")
        with engine.connect() as conn:
            conn.execute(text("DROP TABLE IF EXISTS section_items CASCADE"))
            conn.execute(text("DROP TABLE IF EXISTS service_sections CASCADE"))
            conn.execute(text("DROP TABLE IF EXISTS services CASCADE"))
            # Also drop any old leftover tables from previous attempts
            conn.execute(text("DROP TABLE IF EXISTS service_section_items CASCADE"))
            conn.commit()

        print("Creating service tables...")
        models.Service.__table__.create(engine, checkfirst=True)
        models.ServiceSection.__table__.create(engine, checkfirst=True)
        models.SectionItem.__table__.create(engine, checkfirst=True)

        print("Seeding Feasibility & Pilot Plant Study...")

        # =====================================================================
        # SERVICE: Feasibility & Pilot Plant Study
        # =====================================================================
        feasibility = models.Service(
            title="Feasibility & Pilot Plant Study",
            slug="feasibility",
            tagline="De-Risk Before You Invest",
            description="Comprehensive feasibility studies evaluating technical viability, economic returns, environmental impact, and regulatory compliance -- plus pilot plant design to validate processes before commercial-scale commitment.",
            icon_name="FlaskConical",
            number="01",
            href="/feasibility",
            tags=["Technical Feasibility", "Pilot Plant Design", "Economic Viability"],
            hero_breadcrumb="Services / Feasibility & Pilot Plant Study",
            hero_title="Feasibility & Pilot Plant",
            hero_highlight="Studies",
            hero_description="Reva evaluates technical feasibility, economic viability, and environmental impact before you commit to full-scale investment -- then engineers pilot facilities that replicate real-world conditions to de-risk scale-up and ensure smoother transition to commercial plants.",
            hero_pills=[
                "Technical Feasibility",
                "Economic Viability",
                "Environmental Impact",
                "Regulatory Compliance",
                "Pilot Plant Design",
                "Scale-up Support"
            ],
            hero_image="./process.png",
            hero_stat_title="De-Risk First",
            hero_stat_text="Validate before full-scale investment",
            hero_cta1_text="Discuss Your Study",
            hero_cta1_link="/contact",
            hero_cta2_text="View All Services",
            hero_cta2_link="/services",
            is_active=True,
            display_order=1
        )
        db.add(feasibility)
        db.flush()

        # -----------------------------------------------------------------
        # SECTION 1: Services / Features ("What We Offer")
        # -----------------------------------------------------------------
        sec_services = models.ServiceSection(
            service_id=feasibility.id,
            section_key="services",
            section_label="What We Offer",
            title="Feasibility & Pilot Plant",
            title_highlight="Services",
            description="From concept validation to pilot-scale execution -- Reva provides the technical and economic intelligence needed to de-risk your investment before committing to full-scale plant development.",
            extra_data={},
            display_order=1
        )
        db.add(sec_services)
        db.flush()

        services_items = [
            {"title": "Technical Feasibility Assessment", "description": "Rigorous evaluation of process chemistry, technology options, and engineering requirements to confirm technical viability before committing to full-scale investment.", "icon_name": "Search", "display_order": 1},
            {"title": "Economic Viability Analysis", "description": "Detailed assessment of CAPEX, OPEX, market demand, and return on investment to provide decision-makers with a clear view of financial risks and returns.", "icon_name": "BarChart3", "display_order": 2},
            {"title": "Pilot Plant Design & Engineering", "description": "Engineering of pilot facilities that replicate real-world process conditions -- enabling testing of new processes, optimization of operating parameters, and identification of bottlenecks in a controlled environment.", "icon_name": "FlaskConical", "display_order": 3},
            {"title": "Scale-Up & Technology Transfer", "description": "Structured transition from pilot scale to commercial-scale units, minimizing scale-up risk and ensuring smoother start-up of full-scale plants aligned with performance guarantees.", "icon_name": "Rocket", "display_order": 4},
            {"title": "Environmental Impact & Regulatory Compliance", "description": "Evaluation of environmental impact, HSE implications, and regulatory requirements to ensure proposed plants meet applicable standards and approvals from the outset.", "icon_name": "Shield", "display_order": 5},
            {"title": "Feasibility Report & Decision Support", "description": "Comprehensive feasibility reports covering technical, economic, environmental, and strategic findings -- giving stakeholders the clarity needed for informed go/no-go decisions.", "icon_name": "FileCheck", "display_order": 6},
        ]
        for item_data in services_items:
            db.add(models.SectionItem(section_id=sec_services.id, **item_data))

        # -----------------------------------------------------------------
        # SECTION 2: Technical Capabilities ("What We Assess & Design")
        # -----------------------------------------------------------------
        sec_capabilities = models.ServiceSection(
            service_id=feasibility.id,
            section_key="capabilities",
            section_label="Our Study Capabilities",
            title="What We",
            title_highlight="Assess & Design",
            description="From comprehensive feasibility reports to engineered pilot facilities -- Reva provides the technical intelligence and hands-on design capability to validate your process before full-scale commitment.",
            extra_data={
                "summary_title": "Validate First. Build with Confidence.",
                "summary_description": "Reva's feasibility and pilot plant studies are designed to give clients a clear technical and commercial picture before any major capital commitment -- reducing risk, improving project outcomes, and supporting smoother scale-up to commercial plants.",
                "summary_tags": ["De-Risk Investment", "Validate Process", "Optimize Parameters", "Support Scale-Up", "HSE Compliant", "Decision-Ready Reports"]
            },
            display_order=2
        )
        db.add(sec_capabilities)
        db.flush()

        study_scope_items = ["Technical Feasibility Reports", "Economic Viability Analysis", "Market Demand Assessment", "Environmental Impact Evaluation", "Regulatory Compliance Review", "Risk & Return Analysis", "Go / No-Go Decision Support", "Concept Selection & Screening"]
        for i, t in enumerate(study_scope_items):
            db.add(models.SectionItem(section_id=sec_capabilities.id, title=t, icon_name="clipboard", extra_data={"column": "studyScope", "column_title": "Feasibility Study Scope"}, display_order=i+1))

        pilot_plant_items = ["Pilot Plant Process Design", "Equipment Sizing & Selection", "Operating Parameter Optimization", "Bottleneck Identification", "Mass & Energy Balance", "Safety & HSE Integration", "Data Collection & Analysis", "Scale-Up Methodology"]
        for i, t in enumerate(pilot_plant_items):
            db.add(models.SectionItem(section_id=sec_capabilities.id, title=t, icon_name="microscope", extra_data={"column": "pilotPlant", "column_title": "Pilot Plant Design"}, display_order=i+100))

        expertise_items = ["Chemicals & Petrochemicals", "Biogas / CBG Plants", "Used Oil Distillation", "Pyrolysis Oil Refining", "Phenol-Formaldehyde Resin", "Fuel Gas Desulphurization", "Vapour Adsorption Units", "Environmental Technologies"]
        for i, t in enumerate(expertise_items):
            db.add(models.SectionItem(section_id=sec_capabilities.id, title=t, icon_name="FiCheckCircle", extra_data={"column": "expertise", "column_title": "Industries & Applications"}, display_order=i+200))

        # -----------------------------------------------------------------
        # SECTION 3: Workflow / Process ("Our Approach")
        # -----------------------------------------------------------------
        sec_workflow = models.ServiceSection(
            service_id=feasibility.id,
            section_key="workflow",
            section_label="Our Approach",
            title="Feasibility & Pilot Plant",
            title_highlight="Study Process",
            description="A structured, step-by-step methodology to validate your process, de-risk investment, and build the confidence needed for full-scale plant development.",
            extra_data={
                "cta_text": "Every study is tailored to the client's process, capacity, and investment objectives --",
                "cta_highlight": "no generic reports, no off-the-shelf assessments.",
                "cta_button_text": "Start Your Feasibility Study",
                "cta_button_link": "/contact"
            },
            display_order=3
        )
        db.add(sec_workflow)
        db.flush()

        workflow_steps = [
            {"step_number": "01", "title": "Client Briefing & Scope Definition", "description": "Understanding project objectives, process requirements, capacity targets, regulatory constraints, and investment boundaries to define a clear and focused study scope.", "display_order": 1},
            {"step_number": "02", "title": "Technical Feasibility Assessment", "description": "Evaluating process chemistry, technology options, feedstock availability, and engineering requirements to confirm technical viability and identify the most suitable process route.", "display_order": 2},
            {"step_number": "03", "title": "Economic Viability & Market Analysis", "description": "Detailed assessment of CAPEX, OPEX, market demand, projected returns, and risk factors -- providing decision-makers with a clear financial picture before capital commitment.", "display_order": 3},
            {"step_number": "04", "title": "Pilot Plant Design & Engineering", "description": "Engineering of pilot-scale facilities that replicate real-world process conditions, enabling testing of new processes, parameter optimization, and bottleneck identification in a controlled environment.", "display_order": 4},
            {"step_number": "05", "title": "Environmental, HSE & Regulatory Review", "description": "Evaluation of environmental impact, health & safety implications, and applicable regulatory compliance requirements to ensure the proposed plant meets all approvals from the outset.", "display_order": 5},
            {"step_number": "06", "title": "Feasibility Report & Scale-Up Roadmap", "description": "Delivery of a comprehensive feasibility report with technical, economic, and environmental findings -- plus a structured scale-up roadmap to support smooth transition to commercial-scale plant development.", "display_order": 6},
        ]
        for step_data in workflow_steps:
            db.add(models.SectionItem(section_id=sec_workflow.id, **step_data))

        # -----------------------------------------------------------------
        # SECTION 4: Industries Served ("Sectors Served")
        # -----------------------------------------------------------------
        sec_industries = models.ServiceSection(
            service_id=feasibility.id,
            section_key="industries",
            section_label="Sectors Served",
            title="Industries We",
            title_highlight="Study & Serve",
            description="Reva conducts feasibility studies and designs pilot plants across a wide range of process industries -- from conventional chemicals to emerging green technologies.",
            extra_data={
                "intro_text": "Our documented project references span a wide range of chemistries and process types -- reflecting capability in handling complex, multi-disciplinary feasibility and pilot plant scopes.",
                "image": "./hero1.png",
                "image_badge_title": "Concept to Pilot",
                "image_badge_text": "Across diverse process industries",
                "bottom_tags": ["Oil & Gas", "Hexamine Plants", "Vapour Adsorption", "Carbon Capture"]
            },
            display_order=4
        )
        db.add(sec_industries)
        db.flush()

        industry_items = ["Chemicals & Petrochemicals", "Biogas / CBG Plants", "Used Lube Oil Refining", "Pyrolysis Oil Processing", "Phenol-Formaldehyde Resin", "Fuel Gas Desulphurization", "Environmental Technologies", "Wastewater Treatment"]
        for i, industry in enumerate(industry_items):
            db.add(models.SectionItem(section_id=sec_industries.id, title=industry, display_order=i+1))

        # =====================================================================
        # SERVICE: Basic Engineering
        # =====================================================================
        basic = models.Service(
            title="Basic Engineering",
            slug="basic-engineering",
            tagline="Where Every Project Begins",
            description="Reva develops rigorous basic engineering packages — covering process schemes, PFDs, heat & mass balances, equipment sizing, P&IDs, and design basis documentation — providing a technically sound foundation for detailed engineering, procurement, and plant construction.",
            icon_name="GitBranch",
            number="02",
            href="/BasicEngineering",
            tags=["PFDs & P&IDs", "Heat & Mass Balance", "Equipment Sizing", "Design Basis", "Process Simulation", "HAZID Studies"],
            hero_breadcrumb="Services / Basic Engineering",
            hero_title="Basic Engineering",
            hero_highlight="Where Every Project Begins",
            hero_description="Reva develops rigorous basic engineering packages — covering process schemes, PFDs, heat & mass balances, equipment sizing, P&IDs, and design basis documentation — providing a technically sound foundation for detailed engineering, procurement, and plant construction.",
            hero_pills=[
                "PFDs & P&IDs",
                "Heat & Mass Balance",
                "Equipment Sizing",
                "Design Basis",
                "Process Simulation",
                "HAZID Studies"
            ],
            hero_image="./hero2.png",
            hero_stat_title="Complete BEP Package",
            hero_stat_text="Design Basis · PFDs · P&IDs · Datasheets",
            hero_cta1_text="Discuss Your Engineering Scope",
            hero_cta1_link="/contact",
            hero_cta2_text="View All Services",
            hero_cta2_link="/services",
            is_active=True,
            display_order=2
        )
        db.add(basic)
        db.flush()

        # -----------------------------------------------------------------
        # SECTION 1: Coverage ("What We Cover")
        # -----------------------------------------------------------------
        sec_coverage = models.ServiceSection(
            service_id=basic.id,
            section_key="coverage",
            section_label="What We Cover",
            title="Basic Engineering",
            title_highlight="Scope",
            description="Reva's basic engineering scope covers all elements required to establish a technically rigorous, simulation-backed engineering foundation — ready for FEED, detailed engineering, or direct project execution.",
            extra_data={},
            display_order=1
        )
        db.add(sec_coverage)
        db.flush()

        coverage_items = [
            {"title": "Process Scheme Development", "description": "Development of block flow diagrams (BFDs) and process flow diagrams (PFDs) defining the overall process route, unit operations, stream flows, and key operating conditions.", "icon_name": "GitBranch", "display_order": 1},
            {"title": "Heat & Mass Balance", "description": "Rigorous heat and mass balance calculations for all process streams and equipment, forming the quantitative foundation for equipment sizing, utility estimation, and energy integration.", "icon_name": "SlidersHorizontal", "display_order": 2},
            {"title": "Equipment Sizing & Selection", "description": "Preliminary sizing and selection of major process equipment — reactors, columns, heat exchangers, vessels, pumps, and compressors — with performance specifications and design basis.", "icon_name": "Layers", "display_order": 3},
            {"title": "P&ID Development", "description": "Preparation of Piping & Instrumentation Diagrams (P&IDs) capturing process lines, instrumentation, control loops, safety systems, and equipment interconnections to ANSI/ISA standards.", "icon_name": "FlaskConical", "display_order": 4},
            {"title": "Engineering Basis Documentation", "description": "Preparation of design basis documents covering process conditions, utility systems, site data, applicable codes and standards, and engineering philosophy for the project.", "icon_name": "FileText", "display_order": 5},
            {"title": "Safety & Regulatory Alignment", "description": "Integration of safety studies, hazard identification (HAZID), and regulatory compliance checks at the basic engineering stage — reducing risk before detailed design commences.", "icon_name": "ShieldCheck", "display_order": 6},
        ]
        for item_data in coverage_items:
            db.add(models.SectionItem(section_id=sec_coverage.id, **item_data))

        # -----------------------------------------------------------------
        # SECTION 2: Workflow ("Our Approach")
        # -----------------------------------------------------------------
        sec_workflow_basic = models.ServiceSection(
            service_id=basic.id,
            section_key="workflow",
            section_label="Our Approach",
            title="Basic Engineering",
            title_highlight="Workflow",
            description="A structured, phase-by-phase approach — from design basis through complete BEP issue — ensuring every deliverable is technically grounded, coordinated, and ready for the next project phase.",
            extra_data={},
            display_order=2
        )
        db.add(sec_workflow_basic)
        db.flush()

        workflow_steps_basic = [
            {"step_number": "01", "title": "Design Basis Establishment", "description": "Review of client requirements, site data, feed compositions, product specifications, applicable codes, and regulatory framework to establish an agreed engineering design basis before any design work begins.", "display_order": 1},
            {"step_number": "02", "title": "Process Scheme & BFD Development", "description": "Development of the overall process route, technology selection rationale, block flow diagrams, and preliminary material balance to define the conceptual design framework.", "display_order": 2},
            {"step_number": "03", "title": "PFD & Heat/Mass Balance", "description": "Rigorous process simulation and development of PFDs with heat and mass balances, stream data tables, and utility consumption estimates across all operating cases.", "display_order": 3},
            {"step_number": "04", "title": "Equipment Sizing & Datasheet Preparation", "description": "Preliminary sizing of all major process and utility equipment with preparation of equipment lists and preliminary datasheets for use in FEED and procurement planning.", "display_order": 4},
            {"step_number": "05", "title": "P&ID Development & HAZID", "description": "Development of P&IDs to define process control, instrumentation philosophy, and safety systems, followed by HAZID review to identify and address major hazards at an early stage.", "display_order": 5},
            {"step_number": "06", "title": "Basic Engineering Package (BEP) Issue", "description": "Compilation and issue of the complete Basic Engineering Package — covering design basis, PFDs, P&IDs, equipment list, datasheets, utility summary, and plot plan — ready for FEED or detailed engineering.", "display_order": 6},
        ]
        for step_data in workflow_steps_basic:
            db.add(models.SectionItem(section_id=sec_workflow_basic.id, **step_data))

        # -----------------------------------------------------------------
        # SECTION 3: Standards ("Technical Foundation")
        # -----------------------------------------------------------------
        sec_standards = models.ServiceSection(
            service_id=basic.id,
            section_key="standards",
            section_label="Technical Foundation",
            title="Tools, Deliverables &",
            title_highlight="Engineering Standards",
            description="Reva's basic engineering is executed using industry-standard simulation and design software, produces a complete BEP deliverable set, and is fully compliant with applicable international codes.",
            extra_data={
                "bottom_note": "All basic engineering deliverables are reviewed, approved, and issued as Approved for Design (AFD) documents — ensuring detailed engineering, procurement, and construction teams have a complete, accurate baseline to work from."
            },
            display_order=3
        )
        db.add(sec_standards)
        db.flush()

        standards_data = {
            "software": ["Aspen HYSYS / Aspen Plus", "SmartPlant P&ID", "AutoCAD & Plant 3D", "HTRI (Heat Transfer Research)", "Microsoft Visio / PFD tools", "PV Elite (vessel checks)"],
            "deliverables": ["Design Basis Document", "Block Flow Diagrams (BFDs)", "Process Flow Diagrams (PFDs)", "Heat & Mass Balance Tables", "Equipment List & Datasheets", "P&IDs (Approved for Design)", "Utility Summary", "Plot Plan (Preliminary)"],
            "codes": ["ASME Sec VIII (vessels)", "ASME B31.3 (process piping)", "API 650 / API 660", "ISO 10628 (P&ID symbols)", "IEC 61511 (functional safety)", "IS 875 / IS 1893 (loads)", "TEMA Standards", "IBR Regulations"]
        }
        
        for col_key, items in standards_data.items():
            for i, title in enumerate(items):
                db.add(models.SectionItem(
                    section_id=sec_standards.id,
                    title=title,
                    extra_data={"column": col_key},
                    display_order=i+1
                ))

        # -----------------------------------------------------------------
        # SECTION 4: Highlights ("The Reva Difference")
        # -----------------------------------------------------------------
        sec_highlights = models.ServiceSection(
            service_id=basic.id,
            section_key="highlights",
            section_label="The Reva Difference",
            title="Basic Engineering That's",
            title_highlight="Built to Last Through Execution",
            description="Reva's basic engineering doesn't stop at documentation — it's simulation-backed, multi-discipline coordinated, and structured to carry through detailed engineering, procurement, and site without rework or gaps.",
            extra_data={
                "bottom_stats": [
                    {"label": "Design Approach", "value": "Simulation-Backed"},
                    {"label": "Discipline Coordination", "value": "Multi-Discipline"},
                    {"label": "Package Issue", "value": "AFD Standard"},
                    {"label": "Team Continuity", "value": "Basic → Detail"}
                ]
            },
            display_order=4
        )
        db.add(sec_highlights)
        db.flush()

        highlights_items = [
            {
                "title": "Process Simulation–Backed Design",
                "description": "Reva uses industry-standard simulation tools (Aspen HYSYS / Aspen Plus) to build rigorous process models — ensuring heat and mass balances are accurate and equipment sizing is grounded in real process behaviour.",
                "icon_name": "⚗️",
                "extra_data": {"features": ["Rigorous process simulation", "Multi-case operating scenarios", "Energy integration studies"]},
                "display_order": 1
            },
            {
                "title": "Technology-Agnostic Approach",
                "description": "Reva evaluates multiple process routes and technology options objectively — recommending the solution that best fits client performance, cost, operability, and reliability requirements, not a preferred vendor's package.",
                "icon_name": "🔬",
                "extra_data": {"features": ["Route selection & comparison", "Technology evaluation matrix", "Client-aligned recommendation"]},
                "display_order": 2
            },
            {
                "title": "Safety-First from Day One",
                "description": "HAZID and regulatory compliance checks are built into the basic engineering stage — identifying and addressing major hazards in design before they are locked in, reducing costly changes during detailed engineering.",
                "icon_name": "🛡️",
                "extra_data": {"features": ["Early HAZID integration", "Regulatory compliance review", "Safe design philosophy"]},
                "display_order": 3
            }
        ]
        for h_data in highlights_items:
            db.add(models.SectionItem(section_id=sec_highlights.id, **h_data))

        # -----------------------------------------------------------------
        # SECTION 5: Why Reva ("Value Proposition")
        # -----------------------------------------------------------------
        sec_why = models.ServiceSection(
            service_id=basic.id,
            section_key="why_reva",
            section_label="Value Proposition",
            title="Why Reva for",
            title_highlight="Basic Engineering?",
            description="Reva's basic engineering is not a documentation exercise — it's a technically rigorous, simulation-validated foundation designed to carry your project through detailed engineering, procurement, and construction without gaps or rework.",
            extra_data={
                "contact": {
                    "phone": "+91 98765 43210",
                    "email": "info@revaprocesstechnologies.com"
                },
                "bottom_stats_bar": [
                    {"value": "Simulation", "label": "Backed H&MB"},
                    {"value": "Multi-Disc", "label": "Coordination"},
                    {"value": "AFD Issue", "label": "Full BEP Package"},
                    {"value": "1 Team", "label": "Basic to Detailed"}
                ]
            },
            display_order=5
        )
        db.add(sec_why)
        db.flush()

        why_points_basic = [
            {"title": "Simulation-Backed Accuracy", "description": "Every heat and mass balance is built on a rigorous process simulation model — not spreadsheet estimates — ensuring equipment sizing is accurate from the start.", "extra_data": {"metric": "Rigorous", "metricLabel": "Simulation Models"}, "display_order": 1},
            {"title": "Multi-Discipline from the Start", "description": "Basic engineering at Reva involves process, piping, mechanical, civil, and instrumentation inputs early — preventing downstream design conflicts during detailed engineering.", "extra_data": {"metric": "All-Disc", "metricLabel": "Early Coordination"}, "display_order": 2},
            {"title": "BEP Ready for FEED or Detail", "description": "Reva's Basic Engineering Package is structured to serve directly as the input to FEED studies, detailed engineering, or client's own engineering team — with zero gaps.", "extra_data": {"metric": "BEP", "metricLabel": "Complete Package"}, "display_order": 3},
            {"title": "Code-Compliant from Concept", "description": "Applicable codes, standards, and regulatory requirements are identified and embedded in the design basis — not applied retrospectively during detailed engineering.", "extra_data": {"metric": "Day 1", "metricLabel": "Code Alignment"}, "display_order": 4},
            {"title": "Risk Identified Early", "description": "HAZID and operability studies integrated at the basic engineering stage mean major hazards are addressed when changes are cheapest — not during construction or commissioning.", "extra_data": {"metric": "Early", "metricLabel": "HAZID & Risk Review"}, "display_order": 5},
            {"title": "Single Engineering Team", "description": "The same team that delivers basic engineering continues through detailed engineering and procurement — ensuring design intent is preserved through every phase of execution.", "extra_data": {"metric": "1 Team", "metricLabel": "Full Continuity"}, "display_order": 6},
        ]
        for w_data in why_points_basic:
            db.add(models.SectionItem(section_id=sec_why.id, **w_data))

        # -----------------------------------------------------------------
        # SECTION 6: CTA ("Start Strong")
        # -----------------------------------------------------------------
        sec_cta_basic = models.ServiceSection(
            service_id=basic.id,
            section_key="cta",
            section_label="Start Strong",
            title="Ready to Build on a",
            title_highlight="Solid Engineering Foundation?",
            description="Talk to Reva's engineering team about your project — greenfield or brownfield, process design from scratch or FEED review. We'll scope the right basic engineering engagement for your needs.",
            extra_data={
                "button1_text": "Discuss Your Project",
                "button1_link": "/contact",
                "button2_text": "View All Services",
                "button2_link": "/services"
            },
            display_order=6
        )
        db.add(sec_cta_basic)
        db.flush()

        # =====================================================================
        # SERVICE: Detailed Engineering
        # =====================================================================
        detailed = models.Service(
            title="Detailed Engineering",
            slug="detailed",
            tagline="From Design to Execution-Ready",
            description="Reva develops comprehensive detailed engineering packages across all disciplines — delivering constructible, code-compliant designs aligned with client performance, safety, and reliability expectations.",
            icon_name="HardHat",
            number="03",
            href="/detailed",
            tags=["PFDs & P&IDs", "Equipment Sizing", "3D Modeling", "Civil & Structural", "Electrical & Instrumentation", "Piping Design"],
            hero_breadcrumb="Services / Detailed Engineering",
            hero_title="Detailed Engineering",
            hero_highlight="From Design to Execution-Ready",
            hero_description="Reva develops comprehensive detailed engineering packages across process, piping, mechanical, civil, structural, electrical, and instrumentation disciplines — delivering constructible, code-compliant designs aligned with client performance, safety, and reliability expectations.",
            hero_pills=[
                "PFDs & P&IDs",
                "Equipment Sizing",
                "3D Modeling",
                "Civil & Structural",
                "Electrical & Instrumentation",
                "Piping Design"
            ],
            hero_image="./manufacturing.png",
            hero_stat_title="Multi-Discipline",
            hero_stat_text="Process · Piping · Civil · E&I",
            hero_cta1_text="Discuss Your Engineering Scope",
            hero_cta1_link="/contact",
            hero_cta2_text="View All Services",
            hero_cta2_link="/services",
            is_active=True,
            display_order=3
        )
        db.add(detailed)
        db.flush()

        # -----------------------------------------------------------------
        # SECTION 1: Coverage ("Engineering Disciplines")
        # -----------------------------------------------------------------
        sec_disc = models.ServiceSection(
            service_id=detailed.id,
            section_key="coverage",
            section_label="Engineering Disciplines",
            title="Detailed Engineering",
            title_highlight="Capabilities",
            description="Reva delivers multi-discipline detailed engineering packages that are constructible, code-compliant, and execution-ready — covering every discipline from process through civil, structural, electrical, and instrumentation.",
            extra_data={},
            display_order=1
        )
        db.add(sec_disc)
        db.flush()

        disc_items = [
            {"title": "Process Engineering", "description": "Development of PFDs, P&IDs, heat & mass balances, equipment datasheets, process simulations, and operating philosophies for all process units.", "icon_name": "drafting-compass", "display_order": 1},
            {"title": "Piping Engineering", "description": "Piping layouts, isometrics, stress analysis, support design, and 3D piping models ensuring constructible and code-compliant routing across all plant areas.", "icon_name": "project-diagram", "display_order": 2},
            {"title": "Mechanical Engineering", "description": "Equipment specifications, mechanical datasheets, vendor drawing review, and engineering for static and rotating equipment aligned with ASME and API standards.", "icon_name": "cogs", "display_order": 3},
            {"title": "Civil & Structural Engineering", "description": "Foundation design, structural steel detailing, pipe racks, equipment platforms, and plant building structures engineered for load cases and site conditions.", "icon_name": "building", "display_order": 4},
            {"title": "Electrical & Instrumentation", "description": "Electrical load lists, single-line diagrams, cable schedules, instrument index, control philosophy, loop diagrams, and hazardous area classification drawings.", "icon_name": "bolt", "display_order": 5},
            {"title": "3D Plant Modeling & Review", "description": "Integrated 3D models for clash detection, constructability review, and model-based deliverables — reducing rework during site execution and commissioning.", "icon_name": "layer-group", "display_order": 6},
        ]
        for item_data in disc_items:
            db.add(models.SectionItem(section_id=sec_disc.id, **item_data))

        # -----------------------------------------------------------------
        # SECTION 2: Scope ("Engineering Scope")
        # -----------------------------------------------------------------
        sec_scope = models.ServiceSection(
            service_id=detailed.id,
            section_key="scope",
            section_label="Engineering Scope",
            title="What Our Detailed Engineering",
            title_highlight="Covers",
            description="Reva's detailed engineering scope spans all disciplines required for a complete, execution-ready engineering package — from process simulation through construction-issue drawings and vendor documentation.",
            extra_data={
                "bottom_note_title": "All deliverables issued to IFC standard",
                "bottom_note_text": "Every engineering package is reviewed, approved, and issued for construction — ready for procurement and site execution without gaps."
            },
            display_order=2
        )
        db.add(sec_scope)
        db.flush()

        scope_categories = [
            {
                "category": "Process & Simulation",
                "items": [
                    "PFD & P&ID development",
                    "Heat & mass balance calculations",
                    "Process simulation & modeling",
                    "Equipment datasheet preparation",
                    "Operating & control philosophy",
                    "HAZOP & safety studies"
                ],
                "display_order": 1
            },
            {
                "category": "Multi-Discipline Design",
                "items": [
                    "Piping layouts & isometrics",
                    "Stress analysis & support design",
                    "Mechanical equipment specifications",
                    "Civil & structural detailing",
                    "Electrical SLDs & cable schedules",
                    "Instrument index & loop diagrams"
                ],
                "display_order": 2
            },
            {
                "category": "Standards & Deliverables",
                "items": [
                    "ASME, API & ISO code compliance",
                    "3D plant modeling & clash detection",
                    "Vendor drawing review & approval",
                    "Construction & as-built drawings",
                    "Material take-off (MTO) packages",
                    "IFC drawing issue management"
                ],
                "display_order": 3
            }
        ]
        for cat in scope_categories:
            db.add(models.SectionItem(
                section_id=sec_scope.id,
                title=cat["category"],
                extra_data={"items": cat["items"]},
                display_order=cat["display_order"]
            ))

        # -----------------------------------------------------------------
        # SECTION 3: Standards ("Technical Foundation")
        # -----------------------------------------------------------------
        sec_standards_detailed = models.ServiceSection(
            service_id=detailed.id,
            section_key="standards",
            section_label="Technical Foundation",
            title="Tools, Deliverables &",
            title_highlight="Engineering Standards",
            description="Reva's detailed engineering is executed using industry-standard software, produces complete IFC-level deliverable packages, and is fully compliant with applicable international design codes.",
            extra_data={
                "bottom_note": "All engineering deliverables are reviewed, stamped where required, and issued as Issued for Construction (IFC) documents — ensuring site teams have complete, accurate, and approved packages before mobilization."
            },
            display_order=3
        )
        db.add(sec_standards_detailed)
        db.flush()

        standards_detailed_data = {
            "software": ["Aspen HYSYS / Aspen Plus", "AVEVA E3D / PDMS", "AutoCAD Plant 3D", "SmartPlant P&ID", "HTRI (Heat Transfer)", "Caesar II (Pipe Stress)", "PV Elite (Vessel Design)", "STAAD.Pro (Structural)"],
            "deliverables": ["PFDs & P&IDs (IFC Issue)", "Equipment Datasheets & Specs", "Piping Isometrics & GADs", "Civil & Structural Drawings", "Electrical SLDs & Layouts", "Instrument Loop Diagrams", "Material Take-Off (MTO)", "3D Model & Clash Reports"],
            "codes": ["ASME Sec VIII Div 1 & 2", "ASME B31.3 (Process Piping)", "API 650 / API 660 / API 661", "IS 875 / IS 1893 (Structural)", "IEC 60079 (Hazardous Area)", "ISO 10628 (P&ID symbols)", "TEMA Standards", "IBR Regulations"]
        }
        
        for col_key, items in standards_detailed_data.items():
            col_titles = {"software": "Software & Tools", "deliverables": "Key Deliverables", "codes": "Codes & Standards"}
            col_icons = {"software": "💻", "deliverables": "📐", "codes": "📋"}
            for i, title in enumerate(items):
                db.add(models.SectionItem(
                    section_id=sec_standards_detailed.id,
                    title=title,
                    extra_data={"column": col_key, "column_title": col_titles[col_key], "column_icon": col_icons[col_key]},
                    display_order=i+1
                ))

        # -----------------------------------------------------------------
        # SECTION 4: Workflow ("Our Approach")
        # -----------------------------------------------------------------
        sec_workflow_detailed = models.ServiceSection(
            service_id=detailed.id,
            section_key="workflow",
            section_label="Our Approach",
            title="Detailed Engineering",
            title_highlight="Workflow",
            description="A disciplined, phase-by-phase engineering process — from scope definition through IFC issue and site support — ensuring every deliverable is complete, coordinated, and construction-ready.",
            extra_data={
                "bottom_note": "Every step. Every discipline. One team.",
                "bottom_note_desc": "Reva manages the full detailed engineering scope in-house — eliminating coordination gaps between disciplines and giving clients a single point of accountability."
            },
            display_order=4
        )
        db.add(sec_workflow_detailed)
        db.flush()

        workflow_steps_detailed = [
            {"step_number": "01", "title": "Client Brief & Scope Definition", "description": "Detailed review of client requirements, project specifications, applicable codes, site conditions, and engineering basis — establishing a clear scope of work before design begins.", "display_order": 1},
            {"step_number": "02", "title": "Basic Engineering & FEED Review", "description": "Review and validation of FEED documents, process simulations, and equipment lists to establish a solid engineering foundation for detailed design across all disciplines.", "display_order": 2},
            {"step_number": "03", "title": "Multi-Discipline Detailed Design", "description": "Parallel development of process, piping, mechanical, civil, structural, electrical, and instrumentation engineering — coordinated through a single integrated project team.", "display_order": 3},
            {"step_number": "04", "title": "3D Modeling & Clash Detection", "description": "Plant-wide 3D modeling using AVEVA E3D or equivalent tools, with inter-discipline clash detection and constructability reviews to eliminate field rework before IFC issue.", "display_order": 4},
            {"step_number": "05", "title": "Review, Approval & IFC Issue", "description": "Internal design reviews, client approval cycles, and HAZOP/safety study incorporation — followed by formal Issued for Construction (IFC) release of all engineering packages.", "display_order": 5},
            {"step_number": "06", "title": "Site & Procurement Support", "description": "Continued engineering support during procurement, fabrication, and site execution — including vendor drawing review, RFI responses, and as-built drawing preparation.", "display_order": 6},
        ]
        for step_data in workflow_steps_detailed:
            db.add(models.SectionItem(section_id=sec_workflow_detailed.id, **step_data))

        # -----------------------------------------------------------------
        # SECTION 5: Why Reva ("The Reva Difference")
        # -----------------------------------------------------------------
        sec_why_detailed = models.ServiceSection(
            service_id=detailed.id,
            section_key="why_reva",
            section_label="Why Choose Reva",
            title="Detailed Engineering That's",
            title_highlight="Built to Execute",
            description="Reva's detailed engineering differentiators go beyond drawing production — they're about delivering packages that are constructible, code-compliant, and complete from day one.",
            extra_data={
                "bottom_checklist": [
                    "Multi-Discipline In-House",
                    "IFC-Ready Deliverables",
                    "ASME / API / IEC Compliant",
                    "Site Execution Support"
                ]
            },
            display_order=5
        )
        db.add(sec_why_detailed)
        db.flush()

        why_points_detailed = [
            {"title": "Single-Team, Multi-Discipline Execution", "description": "All engineering disciplines — process, piping, mechanical, civil, E&I — handled by one integrated team, eliminating inter-discipline coordination gaps and interface risks.", "icon_name": "Layers", "display_order": 1},
            {"title": "Design Rooted in Constructability", "description": "Every drawing and deliverable is reviewed for site buildability — reducing RFIs, field changes, and rework during execution, saving time and cost.", "icon_name": "GitMerge", "display_order": 2},
            {"title": "Code-Compliant from Day One", "description": "Engineering is designed to applicable codes (ASME, API, IEC, IS) from the start — not retrofitted for compliance at the review stage, avoiding costly late-stage rework.", "icon_name": "ShieldCheck", "display_order": 3},
            {"title": "On-Schedule IFC Delivery", "description": "Structured engineering schedule with discipline-wise milestones, internal reviews, and client approval cycles — ensuring IFC packages are issued on time for procurement and site.", "icon_name": "Clock", "display_order": 4},
            {"title": "Complete Engineering Documentation", "description": "Full deliverable register including PFDs, P&IDs, datasheets, isometrics, MTOs, drawings, and vendor documents — organized and traceable throughout the project lifecycle.", "icon_name": "FileCheck", "display_order": 5},
            {"title": "Engineering Support Through Execution", "description": "Continued technical support during procurement, fabrication, and commissioning — including vendor drawing approval, site RFI resolution, and as-built preparation.", "icon_name": "Headphones", "display_order": 6},
        ]
        for w_data in why_points_detailed:
            db.add(models.SectionItem(section_id=sec_why_detailed.id, **w_data))

        # -----------------------------------------------------------------
        # SECTION 6: CTA ("Start Your Project")
        # -----------------------------------------------------------------
        sec_cta_detailed = models.ServiceSection(
            service_id=detailed.id,
            section_key="cta",
            section_label="Start Your Project",
            title="Ready to Build with",
            title_highlight="Engineering Excellence?",
            description="Partner with Reva for detailed engineering services that deliver real results. From P&IDs to 3D modeling, we manage every discipline to ensure your project is buildable and compliant.",
            extra_data={
                "button1_text": "Request A Quote",
                "button1_link": "/contact",
                "button2_text": "View All Services",
                "button2_link": "/services"
            },
            display_order=6
        )
        db.add(sec_cta_detailed)
        db.flush()

        # =====================================================================
        # SERVICE: Procurement & Expediting
        # =====================================================================
        procurement = models.Service(
            title="Procurement & Expediting",
            slug="procurement",
            tagline="Right Quality. Right Time.",
            description="Reva manages the full procurement cycle — from vendor identification and techno-commercial evaluation through purchase order placement, expediting, and delivery — ensuring equipment and bulk materials arrive on time, to spec, and within budget.",
            icon_name="ClipboardList",
            number="04",
            href="/procurement",
            tags=["Vendor Evaluation", "PO Placement", "Expediting", "Inspection & QA", "Logistics Coordination"],
            hero_breadcrumb="Services / Procurement & Expediting",
            hero_title="Procurement & Expediting",
            hero_highlight="Right Quality. Right Time.",
            hero_description="Reva manages the full procurement cycle — from vendor identification and techno-commercial evaluation through purchase order placement, expediting, and delivery — ensuring equipment and bulk materials arrive on time, to spec, and within budget to keep your project on schedule.",
            hero_pills=[
                "Vendor Evaluation",
                "Techno-Commercial Comparison",
                "PO Placement",
                "Expediting & Tracking",
                "Inspection & QA",
                "Logistics Coordination"
            ],
            hero_image="./maintenance.png",
            hero_stat_title="End-to-End",
            hero_stat_text="Spec → Vendor → PO → Delivery",
            hero_cta1_text="Discuss Your Procurement Scope",
            hero_cta1_link="/contact",
            hero_cta2_text="View All Services",
            hero_cta2_link="/services",
            is_active=True,
            display_order=4
        )
        db.add(procurement)
        db.flush()

        # -----------------------------------------------------------------
        # SECTION 1: Services ("What We Handle")
        # -----------------------------------------------------------------
        sec_proc_services = models.ServiceSection(
            service_id=procurement.id,
            section_key="services",
            section_label="What We Handle",
            title="Procurement & Expediting",
            title_highlight="Services",
            description="Reva manages every stage of the procurement cycle — from specification preparation and vendor evaluation through PO placement, active expediting, and pre-dispatch inspection — ensuring right quality, right time, every time.",
            extra_data={
                "bottom_note_title": "Procurement aligned with engineering — not separate from it.",
                "bottom_note_desc": "Because Reva's engineering and procurement teams work under one roof, specifications are precise, vendor evaluations are technically sound, and deviations are caught early — before they reach site."
            },
            display_order=1
        )
        db.add(sec_proc_services)
        db.flush()

        proc_services_items = [
            {"title": "Specification & MR Preparation", "description": "Development of detailed material requisitions (MRs), equipment specifications, and technical datasheets aligned with engineering design requirements and applicable codes.", "icon_name": "FaClipboardList", "display_order": 1},
            {"title": "Vendor Identification & Evaluation", "description": "Identification of qualified vendors from approved lists, pre-qualification assessments, and technical capability reviews to ensure suppliers meet project quality and delivery standards.", "icon_name": "FaBalanceScale", "display_order": 2},
            {"title": "Techno-Commercial Comparison", "description": "Structured bid evaluation covering technical compliance, commercial terms, delivery schedules, and vendor track record — providing clear recommendations for purchase order award.", "icon_name": "FaHandshake", "display_order": 3},
            {"title": "PO Placement & Contract Management", "description": "Purchase order preparation, terms negotiation, and contract management to ensure supplier commitments on scope, quality, schedule, and documentation are clearly defined and enforceable.", "icon_name": "FaClipboardList", "display_order": 4},
            {"title": "Expediting & Delivery Tracking", "description": "Active follow-up with vendors on manufacturing progress, drawing submissions, inspection readiness, and dispatch — ensuring equipment and materials arrive on schedule to support site execution.", "icon_name": "FaTruck", "display_order": 5},
            {"title": "Inspection & QA Coordination", "description": "Third-party inspection coordination, vendor drawing review and approval, pre-dispatch inspections, and material test record (MTR) verification to ensure supplied items meet specification.", "icon_name": "FaSearchPlus", "display_order": 6},
        ]
        for item_data in proc_services_items:
            db.add(models.SectionItem(section_id=sec_proc_services.id, **item_data))

        # -----------------------------------------------------------------
        # SECTION 2: Workflow ("Our Process")
        # -----------------------------------------------------------------
        sec_proc_workflow = models.ServiceSection(
            service_id=procurement.id,
            section_key="workflow",
            section_label="Our Process",
            title="Procurement",
            title_highlight="Step by Step",
            description="A structured, end-to-end procurement process — from engineering basis through vendor selection, PO placement, active expediting, and delivery — designed to keep your project on schedule and on spec.",
            extra_data={
                "bottom_note_title": "One team. Engineering to delivery.",
                "bottom_note_desc": "Reva's in-house engineering and procurement teams work in tandem — specifications are precise, evaluations are technically grounded, and deviations are caught before they reach site."
            },
            display_order=2
        )
        db.add(sec_proc_workflow)
        db.flush()

        proc_workflow_steps = [
            {"step_number": "01", "title": "Engineering Basis & MR Preparation", "description": "Review of engineering specifications, P&IDs, and equipment lists to prepare accurate Material Requisitions (MRs) and technical datasheets — forming the foundation for a clean, unambiguous procurement package.", "display_order": 1},
            {"step_number": "02", "title": "Vendor Identification & Pre-Qualification", "description": "Identification of capable vendors from approved lists or through pre-qualification, assessing technical competence, quality certifications, manufacturing capacity, and past delivery performance.", "display_order": 2},
            {"step_number": "03", "title": "Bid Invitation & Techno-Commercial Evaluation", "description": "Issue of enquiries, bid receipt, and structured techno-commercial comparison covering scope compliance, deviations, delivery schedule, commercial terms, and vendor track record — with clear award recommendations.", "display_order": 3},
            {"step_number": "04", "title": "PO Placement & Contract Finalization", "description": "Purchase order preparation, scope and terms negotiation, and contract execution — ensuring supplier commitments on quality, schedule, documentation, and performance guarantees are fully defined before work begins.", "display_order": 4},
            {"step_number": "05", "title": "Expediting & Progress Monitoring", "description": "Active vendor follow-up on manufacturing progress, drawing and document submissions, inspection readiness, and dispatch schedules — proactively managing delays before they impact site execution.", "display_order": 5},
            {"step_number": "06", "title": "Inspection, QA & Logistics Coordination", "description": "Third-party inspection coordination, vendor drawing approval, pre-dispatch inspection, MTR verification, and logistics planning — ensuring every item arrives on site to specification, on time, and damage-free.", "display_order": 6},
        ]
        for step_data in proc_workflow_steps:
            db.add(models.SectionItem(section_id=sec_proc_workflow.id, **step_data))

        # -----------------------------------------------------------------
        # SECTION 3: Highlights ("The Reva Difference")
        # -----------------------------------------------------------------
        sec_proc_highlights = models.ServiceSection(
            service_id=procurement.id,
            section_key="highlights",
            section_label="The Reva Difference",
            title="Procurement That's Backed",
            title_highlight="by Engineering Intelligence",
            description="Unlike standalone procurement agencies, Reva's procurement is executed by a team that understands the engineering — delivering specifications that are accurate, evaluations that are technically sound, and supply that is inspection-verified before despatch.",
            extra_data={
                "bottom_stats": [
                    {"label": "Spec-to-PO", "value": "Single Team"},
                    {"label": "Vendor Evaluation", "value": "Techno-Commercial"},
                    {"label": "Supply Quality", "value": "Inspection-Verified"},
                    {"label": "Expediting", "value": "Proactive"}
                ]
            },
            display_order=3
        )
        db.add(sec_proc_highlights)
        db.flush()

        proc_highlights_items = [
            {
                "title": "Engineering-Driven Specifications",
                "description": "Procurement at Reva begins in the engineering team — MRs and datasheets are prepared by the same engineers who designed the process, ensuring specifications are technically precise and unambiguous before going to vendors.",
                "icon_name": "📐",
                "extra_data": {"features": ["Process-aligned MR preparation", "Equipment datasheets & specs", "Zero ambiguity at bid stage"]},
                "display_order": 1
            },
            {
                "title": "Active Expediting & Vendor Follow-Up",
                "description": "Reva's procurement team actively tracks vendor manufacturing progress, drawing submissions, and dispatch readiness — intervening early when delays are identified rather than reacting after they impact site.",
                "icon_name": "🚚",
                "extra_data": {"features": ["Regular vendor progress reviews", "Drawing submission tracking", "Proactive delay management"]},
                "display_order": 2
            },
            {
                "title": "Quality Assured Supply",
                "description": "Every item procured goes through technical bid evaluation, vendor drawing approval, third-party inspection, and pre-dispatch verification — ensuring supplied equipment and materials arrive to spec, first time.",
                "icon_name": "✅",
                "extra_data": {"features": ["Third-party inspection coordination", "MTR & documentation review", "Pre-dispatch QA verification"]},
                "display_order": 3
            }
        ]
        for item_data in proc_highlights_items:
            db.add(models.SectionItem(section_id=sec_proc_highlights.id, **item_data))

        # -----------------------------------------------------------------
        # SECTION 4: Quality & Why ("Value Proposition")
        # -----------------------------------------------------------------
        sec_proc_why = models.ServiceSection(
            service_id=procurement.id,
            section_key="quality_proposition",
            section_label="Value Proposition",
            title="Why Reva for",
            title_highlight="Procurement & Expediting?",
            description="Reva's procurement is not a standalone function — it's driven by the same engineering team that designed the plant, ensuring specifications are precise, evaluations are technically grounded, and supply is verified before it reaches your site.",
            extra_data={
                "contact_phone": "+91 98765 43210",
                "contact_email": "info@revaprocesstechnologies.com",
                "cta_button_text": "Start Procurement Planning",
                "cta_button_link": "/contact",
                "bottom_stats": [
                    {"value": "End-to-End", "label": "Procurement Scope"},
                    {"value": "In-House", "label": "Engineering + Procurement"},
                    {"value": "Pre-Dispatch", "label": "QA & Inspection"},
                    {"value": "On-Time", "label": "Site Delivery Focus"}
                ]
            },
            display_order=4
        )
        db.add(sec_proc_why)
        db.flush()

        proc_why_items = [
            {"title": "Specifications Written by Engineers", "description": "MRs and datasheets are prepared by the same engineers who designed the process — eliminating ambiguity at the bid stage and reducing vendor queries and deviations.", "extra_data": {"metric": "Zero", "metricLabel": "Spec Ambiguity"}, "display_order": 1},
            {"title": "Techno-Commercially Sound Evaluation", "description": "Bid evaluations cover both technical compliance and commercial terms — ensuring award decisions are based on fit-for-purpose supply, not just lowest price.", "extra_data": {"metric": "100%", "metricLabel": "Technical Review"}, "display_order": 2},
            {"title": "Proactive Expediting", "description": "Active vendor follow-up on manufacturing progress, drawing submissions, and dispatch readiness — identifying delays early before they cascade to site execution.", "extra_data": {"metric": "Early", "metricLabel": "Delay Detection"}, "display_order": 3},
            {"title": "Inspection-Verified Supply", "description": "Third-party inspection, vendor drawing approval, and pre-dispatch QA ensure every item arrives to specification — reducing site rejections and rework.", "extra_data": {"metric": "Pre-Dispatch", "metricLabel": "QA Verification"}, "display_order": 4},
            {"title": "Schedule-Aligned Delivery", "description": "Procurement timelines are built around the engineering and site schedule — ensuring equipment and bulk materials are available when construction teams need them.", "extra_data": {"metric": "On-Time", "metricLabel": "Site Delivery"}, "display_order": 5},
            {"title": "Single-Window Accountability", "description": "One team handles engineering, procurement, and expediting — eliminating interface gaps between disciplines and giving clients a single point of contact for all supply issues.", "extra_data": {"metric": "1 Team", "metricLabel": "Full Ownership"}, "display_order": 6},
        ]
        for item_data in proc_why_items:
            db.add(models.SectionItem(section_id=sec_proc_why.id, **item_data))

        # =====================================================================
        # SERVICE: EPC Project Management
        # =====================================================================
        epc = models.Service(
            title="EPC Project Management",
            slug="epc-project-management",
            tagline="Professional Services",
            description="From initial planning through commissioning and handover — we manage every aspect of your engineering project with precision, transparency, and proven methodology.",
            icon_name="Target",
            number="05",
            href="/epc-project-management",
            tags=["Planning", "Coordination", "Execution", "Monitoring", "Handover"],
            hero_breadcrumb="Services / EPC Project Management",
            hero_title="Project Management",
            hero_highlight="Excellence",
            hero_description="From initial planning through commissioning and handover — we manage every aspect of your engineering project with precision, transparency, and proven methodology.",
            hero_pills=["Planning", "Coordination", "Execution", "Monitoring", "Handover"],
            hero_image="/project.jpg",
            hero_stat_title="40+",
            hero_stat_text="Industries Served",
            hero_cta1_text="Discuss Your Project",
            hero_cta1_link="/contact",
            hero_cta2_text="View All Services",
            hero_cta2_link="/services",
            is_active=True,
            display_order=5
        )
        db.add(epc)
        db.flush()

        # 1. Methodology / Approach
        sec_epc_approach = models.ServiceSection(
            service_id=epc.id,
            section_key="approach",
            section_label="Methodology",
            title="Our 4-Step",
            title_highlight="Approach",
            description="Define project scope, objectives, deliverables, and success criteria with detailed planning and resource allocation.",
            extra_data={
                "hero_stats": [
                    {"value": "250+", "label": "Projects Delivered"},
                    {"value": "98%", "label": "On-Time Rate"},
                    {"value": "15+", "label": "Years Experience"}
                ]
            },
            display_order=1
        )
        db.add(sec_epc_approach)
        db.flush()

        epc_approach_items = [
            {"step_number": "01", "title": "Planning & Initiation", "description": "Define project scope, objectives, deliverables, and success criteria with detailed planning and resource allocation.", "icon_name": "FiTarget", "display_order": 1},
            {"step_number": "02", "title": "Team Coordination", "description": "Assemble and manage cross-functional teams, assign responsibilities, and ensure seamless collaboration across all disciplines.", "icon_name": "FiUsers", "display_order": 2},
            {"step_number": "03", "title": "Execution & Monitoring", "description": "Track progress against schedules, manage budgets, control changes, and implement corrective actions as needed.", "icon_name": "FiTrendingUp", "display_order": 3},
            {"step_number": "04", "title": "Completion & Handover", "description": "Ensure quality standards are met, conduct final inspections, deliver documentation, and facilitate smooth handover.", "icon_name": "FiCheckCircle", "display_order": 4},
        ]
        for item in epc_approach_items:
            db.add(models.SectionItem(section_id=sec_epc_approach.id, **item))

        # 2. PM Services
        sec_epc_services = models.ServiceSection(
            service_id=epc.id,
            section_key="services",
            section_label="What We Do",
            title="Comprehensive",
            title_highlight="PM Services",
            description="End-to-end capabilities covering every phase of your engineering project — from planning to commissioning.",
            extra_data={"sidebar_stat_value": "8", "sidebar_stat_label": "Core service areas covering full project lifecycle"},
            display_order=2
        )
        db.add(sec_epc_services)
        db.flush()

        epc_services_items = [
            {"title": "Project Planning & Scheduling", "description": "Detailed project plans, WBS, critical path analysis, resource loading, and schedule development using Primavera P6 and MS Project.", "display_order": 1},
            {"title": "Budget & Cost Management", "description": "Cost estimation, budget preparation, cash flow forecasting, cost control, and earned value management.", "display_order": 2},
            {"title": "Risk Management", "description": "Risk identification, qualitative and quantitative analysis, mitigation planning, and continuous monitoring.", "display_order": 3},
            {"title": "Procurement Management", "description": "Vendor prequalification, bid evaluation, contract negotiation, PO management, and logistics coordination.", "display_order": 4},
            {"title": "Quality Assurance & Control", "description": "Quality management systems, inspection and test plans, non-conformance management, and deliverable verification.", "display_order": 5},
            {"title": "Stakeholder Communication", "description": "Progress reporting, stakeholder meetings, change management, documentation control, and transparent communication.", "display_order": 6},
            {"title": "Construction Management", "description": "Site supervision, contractor coordination, safety oversight, progress monitoring, and punch list management.", "display_order": 7},
            {"title": "Commissioning Support", "description": "Pre-commissioning planning, testing procedures, start-up coordination, performance verification, and ops transition.", "display_order": 8},
        ]
        for item in epc_services_items:
            db.add(models.SectionItem(section_id=sec_epc_services.id, **item))

        # 3. Benefits
        sec_epc_benefits = models.ServiceSection(
            service_id=epc.id,
            section_key="benefits",
            section_label="Why REVA",
            title="Why Choose",
            title_highlight="REVA",
            description="Partner with REVA Process Technologies for professional project management services that deliver real results.",
            display_order=3
        )
        db.add(sec_epc_benefits)
        db.flush()

        epc_benefits_items = [
            {"title": "On-Time Delivery", "description": "Proven track record of delivering projects on schedule through effective planning and proactive monitoring.", "icon_name": "FiClock", "display_order": 1},
            {"title": "Budget Control", "description": "Rigorous cost management ensures projects stay within budgets with full financial transparency.", "icon_name": "FiDollarSign", "display_order": 2},
            {"title": "Quality Assurance", "description": "Comprehensive quality systems guarantee all deliverables meet or exceed specified requirements.", "icon_name": "FiAward", "display_order": 3},
            {"title": "Experienced Team", "description": "Certified PMs with deep technical knowledge across diverse engineering disciplines.", "icon_name": "FiUsers", "display_order": 4},
            {"title": "Clear Communication", "description": "Transparent reporting and communication channels ensure alignment throughout the lifecycle.", "icon_name": "FiFileText", "display_order": 5},
            {"title": "Risk Mitigation", "description": "Systematic risk management identifies issues early and minimizes project disruptions.", "icon_name": "FiCheckCircle", "display_order": 6},
        ]
        for item in epc_benefits_items:
            db.add(models.SectionItem(section_id=sec_epc_benefits.id, **item))

        # 4. Industries
        sec_epc_industries = models.ServiceSection(
            service_id=epc.id,
            section_key="industries",
            section_label="Sectors",
            title="Industries",
            title_highlight="We Serve",
            description="Our project management expertise spans across critical industries.",
            extra_data={"industries": [
                "Oil & Gas Refineries", "Petrochemical Plants", "Chemical Processing",
                "Pharmaceutical Manufacturing", "Power Generation", "Water Treatment",
                "Food & Beverage", "Mining & Minerals", "Steel & Metallurgy",
                "Environmental Engineering", "Renewable Energy", "Infrastructure Projects",
            ]},
            display_order=4
        )
        db.add(sec_epc_industries)
        db.flush()

        # 5. CTA
        sec_epc_cta = models.ServiceSection(
            service_id=epc.id,
            section_key="cta",
            section_label="Get in Touch",
            title="Ready to Start Your",
            title_highlight="Project?",
            description="Partner with REVA Process Technologies for professional project management services that deliver real results.",
            extra_data={
                "cta_primary_text": "Contact Us",
                "cta_primary_link": "/contact",
                "cta_secondary_text": "Learn More",
                "cta_secondary_link": "/about"
            },
            display_order=5
        )
        db.add(sec_epc_cta)
        db.flush()

        # =====================================================================
        # SERVICE: EPC Solutions (Route: /basic)
        # =====================================================================
        epc_sol = models.Service(
            title="EPC Solutions",
            slug="epc-solutions",
            tagline="Concept to Commissioning",
            description="Reva delivers fully integrated EPC and EPCCM solutions for process industry projects — combining in-house engineering, procurement, manufacturing, site construction, and commissioning under one accountable team, from concept to operating plant.",
            icon_name="ShieldCheck",
            number="06",
            href="/basic",
            tags=["Engineering", "Procurement", "Construction", "Commissioning", "EPCCM"],
            hero_breadcrumb="Services / EPC Solutions",
            hero_title="Complete EPC Solutions",
            hero_highlight="Concept to Commissioning",
            hero_description="Reva delivers fully integrated EPC and EPCCM solutions for process industry projects — combining in-house engineering, procurement, manufacturing, site construction, and commissioning under one accountable team, from concept to operating plant.",
            hero_pills=[
                "Basic & Detailed Engineering",
                "Procurement & Expediting",
                "Manufacturing & Supply",
                "Site Construction",
                "Commissioning & Startup",
                "Single-Point Accountability",
            ],
            hero_image="./epc.png",
            hero_stat_title="EPCC & EPCM",
            hero_stat_text="Engineering · Procurement · Construction · Commissioning",
            hero_cta1_text="Discuss Your EPC Project",
            hero_cta1_link="/contact",
            hero_cta2_text="View All Services",
            hero_cta2_link="/services",
            is_active=True,
            display_order=6
        )
        db.add(epc_sol)
        db.flush()

        # 1. Services Grid
        sec_epc_services = models.ServiceSection(
            service_id=epc_sol.id,
            section_key="services",
            section_label="Complete EPC Delivery",
            title="Integrated",
            title_highlight="EPC Services",
            description="End-to-end project execution covering every phase from concept to commissioning.",
            display_order=1
        )
        db.add(sec_epc_services)
        db.flush()

        epc_services_items = [
            {
                "title": "Engineering",
                "description": "Comprehensive design, detailed engineering, and technical documentation including FEED, basic & detailed engineering, 3D modeling, and P&IDs.",
                "icon_name": "FaRulerCombined",
                "extra_data": {"points": ["FEED Studies", "Detailed Engineering", "3D Modeling", "Technical Documentation"]},
                "display_order": 1
            },
            {
                "title": "Procurement",
                "description": "Strategic sourcing, vendor management, quality assurance, and logistics coordination to ensure timely delivery of materials and equipment.",
                "icon_name": "FaBoxOpen",
                "extra_data": {"points": ["Vendor Selection", "Quality Control", "Logistics Management", "Contract Negotiation"]},
                "display_order": 2
            },
            {
                "title": "Construction",
                "description": "On-site execution, project management, safety compliance, and commissioning support ensuring seamless project delivery within budget and schedule.",
                "icon_name": "FaHardHat",
                "extra_data": {"points": ["Site Management", "Safety Compliance", "Quality Assurance", "Commissioning Support"]},
                "display_order": 3
            },
        ]
        for item in epc_services_items:
            db.add(models.SectionItem(section_id=sec_epc_services.id, **item))

        # 2. Lifecycle Vertical Timeline
        sec_epc_lifecycle = models.ServiceSection(
            service_id=epc_sol.id,
            section_key="lifecycle",
            section_label="Project Execution",
            title="EPC",
            title_highlight="Project Lifecycle",
            description="Structured approach ensuring seamless execution from concept to completion.",
            display_order=2
        )
        db.add(sec_epc_lifecycle)
        db.flush()

        epc_lifecycle_items = [
            {"step_number": "01", "title": "Project Initiation & FEED", "description": "Feasibility studies, conceptual design, cost estimation, and front-end engineering definition.", "display_order": 1},
            {"step_number": "02", "title": "Detailed Engineering", "description": "Complete design documentation, P&IDs, equipment specifications, 3D models, and construction drawings.", "display_order": 2},
            {"step_number": "03", "title": "Procurement & Logistics", "description": "Vendor selection, material procurement, quality inspections, and delivery coordination.", "display_order": 3},
            {"step_number": "04", "title": "Construction & Installation", "description": "On-site execution, civil/mechanical/electrical works, safety management, and progress monitoring.", "display_order": 4},
            {"step_number": "05", "title": "Commissioning & Handover", "description": "System testing, performance validation, training, documentation, and final project handover.", "display_order": 5},
        ]
        for item in epc_lifecycle_items:
            db.add(models.SectionItem(section_id=sec_epc_lifecycle.id, **item))

        # 3. Capabilities / Delivery Models (Dark)
        sec_epc_capabilities = models.ServiceSection(
            service_id=epc_sol.id,
            section_key="capabilities",
            section_label="Project Delivery Models",
            title="EPC Execution",
            title_highlight="Capabilities",
            description="Flexible delivery approaches tailored to your project requirements, timeline, and budget constraints.",
            display_order=3
        )
        db.add(sec_epc_capabilities)
        db.flush()

        epc_capabilities_items = [
            {"title": "Greenfield Projects", "icon_name": "Leaf", "description": "Complete new facility construction from ground up", "display_order": 1},
            {"title": "Brownfield Expansion", "icon_name": "Wrench", "description": "Retrofitting and upgrading existing facilities", "display_order": 2},
            {"title": "Modular Construction", "icon_name": "Package", "description": "Pre-fabricated modules for faster deployment", "display_order": 3},
            {"title": "LSTK Projects", "icon_name": "Target", "description": "Lump Sum Turnkey delivery with fixed pricing", "display_order": 4},
            {"title": "Plant Revamps", "icon_name": "Recycle", "description": "Modernization and capacity enhancement", "display_order": 5},
            {"title": "Fast Track Execution", "icon_name": "Zap", "description": "Accelerated project delivery with parallel workflows", "display_order": 6},
        ]
        for item in epc_capabilities_items:
            db.add(models.SectionItem(section_id=sec_epc_capabilities.id, **item))

        # 4. Advantages / Differentiators
        sec_epc_advantages = models.ServiceSection(
            service_id=epc_sol.id,
            section_key="advantages",
            section_label="The Reva Advantage",
            title="Why Choose",
            title_highlight="Integrated EPC?",
            description="Our comprehensive EPC model streamlines project delivery, reduces complexity, and delivers superior outcomes through proven methodologies and technical excellence.",
            display_order=4
        )
        db.add(sec_epc_advantages)
        db.flush()

        epc_advantages_items = [
            {"step_number": "01", "title": "Single Point Responsibility", "description": "Unified accountability from design to commissioning eliminates coordination gaps and ensures seamless project execution.", "display_order": 1},
            {"step_number": "02", "title": "Cost & Schedule Certainty", "description": "Fixed-price contracts with guaranteed delivery timelines provide predictable budgets and reduced financial risk.", "display_order": 2},
            {"step_number": "03", "title": "Integrated Project Management", "description": "Cross-functional teams working in parallel accelerate timelines and optimize resource utilization throughout the project.", "display_order": 3},
            {"step_number": "04", "title": "Quality Assurance Framework", "description": "Rigorous QA/QC protocols at every stage ensure compliance with international standards and client specifications.", "display_order": 4},
        ]
        for item in epc_advantages_items:
            db.add(models.SectionItem(section_id=sec_epc_advantages.id, **item))

        # =====================================================================
        # SERVICE: Manufacturing & Site Services (Route: /site)
        # =====================================================================
        manu_site = models.Service(
            title="Manufacturing & Site Services",
            slug="manufacturing-site-services",
            tagline="Fabrication & Installation",
            description="REVA Process Technologies offers comprehensive manufacturing and site services, delivering turnkey solutions from fabrication through installation and commissioning. Our state-of-the-art manufacturing facilities and experienced site teams ensure quality execution of complex industrial projects.",
            icon_name="Hammer",
            number="05",
            href="/site",
            tags=["Fabrication", "Installation", "Pressure Vessels", "Site Management", "Maintenance"],
            hero_breadcrumb="Services / Manufacturing & Site Services",
            hero_title="Manufacturing & Site Services",
            hero_highlight="Fabrication & Installation",
            hero_description="REVA Process Technologies offers comprehensive manufacturing and site services, delivering turnkey solutions from fabrication through installation and commissioning. Our state-of-the-art manufacturing facilities and experienced site teams ensure quality execution of complex industrial projects.",
            hero_pills=[
                "Pressure Vessel Fabrication",
                "Structural Steel Fabrication",
                "Piping Prefabrication",
                "Equipment Installation",
                "Pre-Commissioning",
                "Turnaround Services",
            ],
            hero_image="/manage.jpg",
            hero_stat_title="Turnkey Execution",
            hero_stat_text="From shop fabrication to site commissioning",
            hero_cta1_text="Request Quote",
            hero_cta1_link="/contact",
            is_active=True,
            display_order=5
        )
        db.add(manu_site)
        db.flush()

        # 1. Manufacturing Capabilities
        sec_man_cap = models.ServiceSection(
            service_id=manu_site.id,
            section_key="capabilities",
            section_label="Fabrication Excellence",
            title="Manufacturing",
            title_highlight="Capabilities",
            description="Advanced fabrication facilities equipped with modern machinery and skilled workforce",
            display_order=1
        )
        db.add(sec_man_cap)
        db.flush()

        man_cap_items = [
            {"title": "Pressure Vessel Fabrication", "icon_name": "FiSettings", "description": "ASME-certified manufacturing of pressure vessels, columns, reactors, and heat exchangers with complete code compliance and documentation.", "display_order": 1},
            {"title": "Structural Steel Fabrication", "icon_name": "FiPackage", "description": "Heavy structural steel fabrication including platforms, pipe racks, equipment supports, and building frames with precision cutting and welding.", "display_order": 2},
            {"title": "Piping Prefabrication", "icon_name": "FiLayers", "description": "Shop fabrication of piping spools, assemblies, and modules with reduced field labor, improved quality, and faster installation schedules.", "display_order": 3},
            {"title": "Mechanical Assembly", "icon_name": "FiTool", "description": "Complete mechanical assembly and testing of process equipment, skid-mounted systems, and packaged units in controlled shop environment.", "display_order": 4},
            {"title": "Advanced Welding", "icon_name": "FiZap", "description": "Certified welders proficient in SMAW, GTAW, GMAW, and SAW processes for carbon steel, stainless steel, and exotic alloy materials.", "display_order": 5},
            {"title": "Quality Control", "icon_name": "FiShield", "description": "Comprehensive NDT testing, dimensional inspection, hydrostatic testing, and material verification ensuring code compliance and quality.", "display_order": 6},
        ]
        for item in man_cap_items:
            db.add(models.SectionItem(section_id=sec_man_cap.id, **item))

        # 2. Comprehensive Site Services
        sec_site_serv = models.ServiceSection(
            service_id=manu_site.id,
            section_key="services",
            section_label="On-Site Execution",
            title="Comprehensive",
            title_highlight="Site Services",
            description="Complete on-site execution capabilities from installation through commissioning",
            display_order=2
        )
        db.add(sec_site_serv)
        db.flush()

        site_serv_items = [
            {"step_number": "1", "title": "Equipment Installation & Erection", "description": "Professional rigging, lifting, positioning, and installation of process equipment including vessels, columns, heat exchangers, pumps, and rotating machinery. Complete foundation work, grouting, alignment, and anchor bolt installation ensuring proper equipment setting and long-term stability.", "display_order": 1},
            {"step_number": "2", "title": "Piping Installation", "description": "Field installation of process piping, utility lines, and interconnecting piping with proper support, alignment, and fit-up. Field welding, radiography, hydrostatic testing, and complete documentation ensuring code compliance and system integrity.", "display_order": 2},
            {"step_number": "3", "title": "Structural Erection", "description": "Installation of structural steel including pipe racks, platforms, stairways, equipment supports, and building frames. Complete anchor bolt installation, steel erection, field welding, bolting, and alignment verification opting structural integrity and safety.", "display_order": 3},
            {"step_number": "4", "title": "Mechanical Completion", "description": "Systematic completion of mechanical installation including torqueing of bolts, gasket installation, valve installation, instrumentation hookup, insulation, painting, and ensuring all mechanical systems are ready for pre-commissioning and start-up activities.", "display_order": 4},
            {"step_number": "5", "title": "Pre-Commissioning & Commissioning", "description": "Pre-commissioning activities including system flushing, leak testing, instrument calibration, motor rotation checks, and mechanical run tests. Commissioning support including start-up assistance, performance testing, troubleshooting, and operator training.", "display_order": 5},
            {"step_number": "6", "title": "Maintenance & Turnaround Services", "description": "Planned maintenance, preventive maintenance programs, emergency repair services, and plant turnaround support. Equipment inspection, overhaul, replacement of internals, and performance restoration ensuring optimal plant reliability and uptime.", "display_order": 6},
            {"step_number": "7", "title": "Modification & Revamp Projects", "description": "Brownfield modifications, capacity expansion projects, process improvements, and equipment upgrades. Design, engineering, fabrication, and installation of modifications with minimal disruption to ongoing plant operations.", "display_order": 7},
            {"step_number": "8", "title": "Safety & Quality Management", "description": "Comprehensive HSE programs, safety training, hazard analysis, permit to work systems, and incident prevention. Quality assurance plans, inspection and test plans, material traceability, and complete documentation ensuring safe, quality execution.", "display_order": 8},
        ]
        for item in site_serv_items:
            db.add(models.SectionItem(section_id=sec_site_serv.id, **item))

        # 3. Why Choose REVA (Advantages)
        sec_man_adv = models.ServiceSection(
            service_id=manu_site.id,
            section_key="advantages",
            section_label="The Reva Edge",
            title="Why Choose",
            title_highlight="REVA",
            description="Delivering excellence through integrated manufacturing and site services",
            display_order=3
        )
        db.add(sec_man_adv)
        db.flush()

        man_adv_items = [
            {"title": "Code Compliance", "icon_name": "FiAward", "description": "ASME, API, ANSI, and international code compliant manufacturing with complete documentation and third-party inspection support.", "display_order": 1},
            {"title": "Skilled Workforce", "icon_name": "FiUsers", "description": "Certified welders, qualified riggers, experienced fabricators, and skilled craftsmen ensuring quality workmanship and safe execution.", "display_order": 2},
            {"title": "Quality Assurance", "icon_name": "FiCheckCircle", "description": "Comprehensive QA/QC programs, NDT testing, material traceability, and complete documentation ensuring compliance and reliability.", "display_order": 3},
            {"title": "On-Time Delivery", "icon_name": "FiClock", "description": "Effective planning, resource management, and execution control ensuring projects are completed on schedule without compromising quality.", "display_order": 4},
            {"title": "Safety Excellence", "icon_name": "FiShield", "description": "World-class HSE programs, safety training, hazard prevention, and zero-incident culture protecting personnel and assets.", "display_order": 5},
            {"title": "Turnkey Solutions", "icon_name": "FiTruck", "description": "Single-source responsibility from design through commissioning simplifying coordination and accelerating project delivery.", "display_order": 6},
        ]
        for item in man_adv_items:
            db.add(models.SectionItem(section_id=sec_man_adv.id, **item))

        # 4. Industries We Serve
        sec_man_inds = models.ServiceSection(
            service_id=manu_site.id,
            section_key="industries",
            section_label="Sectors",
            title="Industries",
            title_highlight="We Serve",
            description="Delivering manufacturing and site services across diverse industrial sectors",
            display_order=4
        )
        db.add(sec_man_inds)
        db.flush()

        man_inds_items = [
            {"title": "Oil & Gas", "display_order": 1},
            {"title": "Petrochemical", "display_order": 2},
            {"title": "Chemical Processing", "display_order": 3},
            {"title": "Pharmaceutical", "display_order": 4},
            {"title": "Power Generation", "display_order": 5},
            {"title": "Water Treatment", "display_order": 6},
            {"title": "Food & Beverage", "display_order": 7},
            {"title": "Mining & Minerals", "display_order": 8},
        ]
        for item in man_inds_items:
            db.add(models.SectionItem(section_id=sec_man_inds.id, **item))

        # 5. Final CTA
        sec_man_cta = models.ServiceSection(
            service_id=manu_site.id,
            section_key="cta",
            title="Let's Build Your Project Together",
            description="Experience the REVA difference with integrated manufacturing and site services. Contact us to discuss your fabrication and installation requirements.",
            display_order=5
        )
        db.add(sec_man_cta)
        db.flush()

        db.commit()
        print("[OK] Successfully seeded all major Services.")
    except Exception as e:
        print(f"[ERROR] Error seeding services: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_services()
