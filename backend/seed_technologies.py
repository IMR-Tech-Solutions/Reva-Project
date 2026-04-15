import sys
import os

# Add the current directory to sys.path so we can import database and models
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from database import SessionLocal
import models

def seed_technologies():
    db = SessionLocal()
    try:
        # Check if already seeded
        existing = db.query(models.Technology).count()
        if existing >= 3:
            print(f"Vault already contains {existing} systems. Skipping seeding.")
            return

        techs = [
            {
                "title": "Amine Gas Treating",
                "slug": "amine-treating",
                "herosub": "Acid Gas Removal Technology",
                "herotitle": "Efficient H2S and CO2 Separation",
                "paragraph1": "Our Amine Treating systems are engineered for the selective removal of acid gases from natural gas and refinery streams. Using advanced solvent formulations, we achieve ultra-low H2S specifications while optimizing energy consumption.",
                "paragraph2": "The modular execution approach ensures rapid deployment and high reliability in demanding environments, suitable for both onshore and offshore applications.",
                "img": "/uploads/technologies/amine_treating_placeholder.jpg",
                "keysubheading": "Engineering Excellence in Gas Processing",
                "features": [
                    {"title": "Selective Absorption", "description": "Optimize H2S removal while controlling CO2 slip to meet specific pipeline requirements."},
                    {"title": "Energy Recovery", "description": "Integrated cross-exchangers reduce the thermal load on the reboiler protocol."},
                    {"title": "Modular Skids", "description": "Pre-assembled and tested units for minimal site installation time."}
                ],
                "stats": [
                    {"label": "H2S Removal", "value": "99.9%"},
                    {"label": "Uptime", "value": "98.5%"},
                    {"label": "Energy Saving", "value": "20%"}
                ]
            },
            {
                "title": "Molecular Sieve Dehydration",
                "slug": "mole-sieve-dehydration",
                "herosub": "Deep Water Removal",
                "herotitle": "Reliable Natural Gas Dehydration",
                "paragraph1": "REVA's molecular sieve systems provide deep dehydration to meet cryogenic processing requirements. By utilizing high-capacity adsorbents and advanced cycle automation, we ensure continuous operation with minimal pressure drop.",
                "paragraph2": "Our regeneration technology minimizes gas flaring and maximizes heat efficiency, extending the life of the adsorbent beds by up to 40% compared to standard designs.",
                "img": "/uploads/technologies/mole_sieve_placeholder.jpg",
                "keysubheading": "Advanced Adsorption Engineering",
                "features": [
                    {"title": "Dew Point Control", "description": "Achieve water dew points as low as -100°C for LNG pre-treatment."},
                    {"title": "Automated Cycles", "description": "Smart PLC logic optimizes switching time based on actual feed moisture load."},
                    {"title": "Low Flare Design", "description": "Optimized regeneration gas recovery reduces environmental impact."}
                ],
                "stats": [
                    {"label": "Water Content", "value": "<0.1ppm"},
                    {"label": "Cycle Life", "value": "4 Years"},
                    {"label": "System Purity", "value": "100%"}
                ]
            },
            {
                "title": "Sulfur Recovery Unit (SRU)",
                "slug": "sru-technology",
                "herosub": "Environmental Compliance",
                "herotitle": "Claus Process Sulfur Production",
                "paragraph1": "Our Sulfur Recovery Units convert toxic H2S into valuable elemental sulfur. With high-efficiency thermal stages and catalytic converters, we enable refineries and gas plants to meet the most stringent emission standards.",
                "paragraph2": "We specialize in both conventional Claus and advanced tail gas treatment processes to ensure overall sulfur recovery efficiency exceeds 99.9%.",
                "img": "/uploads/technologies/sru_placeholder.jpg",
                "keysubheading": "Meeting Tomorrow's Emission Standards",
                "features": [
                    {"title": "High Recovery Rate", "description": "Multi-stage catalytic conversion for maximum sulfur yield."},
                    {"title": "Robust Burners", "description": "Integrated high-intensity burners for stable combustion of acid gas feed."},
                    {"title": "Tail Gas Ready", "description": "Seamless integration with TGTU for near-zero emission profiles."}
                ],
                "stats": [
                    {"label": "Recovery Rate", "value": "99.9%"},
                    {"label": "Compliance", "value": "Tier 3"},
                    {"label": "Thermal Duty", "value": "95%"}
                ]
            }
        ]

        for tech_data in techs:
            # Check if slug exists
            db_tech = db.query(models.Technology).filter(models.Technology.slug == tech_data["slug"]).first()
            if not db_tech:
                new_tech = models.Technology(**tech_data)
                db.add(new_tech)
                print(f"Adding system to vault: {tech_data['title']}")
        
        db.commit()
        print("Vault seeding complete.")
    except Exception as e:
        db.rollback()
        print(f"Seeding protocol breached: {str(e)}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_technologies()
