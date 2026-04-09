import sys
import os
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models
import schemas

# Add the current directory to sys.path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def seed_technologies():
    db = SessionLocal()
    try:
        # Check if technologies already exists to avoid duplicates
        existing_count = db.query(models.Technology).count()
        if existing_count > 0:
            print(f"Database already has {existing_count} technologies. Skipping seeding.")
            return

        print("Seeding technologies...")
        
        tech_data = [
            {
                "title": "Amine System",
                "slug": "amine",
                "herosub": "Gas Treatment Technology",
                "herotitle": "Amine Gas Treating System",
                "paragraph1": "At Reva Process Technologies, we specialize in providing cutting-edge solutions to address the environmental challenges posed by fuel gases produced in refineries. Our Amine Gas Treating System stands at the forefront of innovation, removing harmful elements from fuel gases and ensuring cleaner combustion for a greener tomorrow.",
                "paragraph2": "Amine Gas Treating, also known as amine scrubbing, gas sweetening, and acid gas removal, is a paramount process that targets the removal of hydrogen sulfide (H2S) and carbon dioxide (CO2) from gases generated in various industrial processes. This process is a cornerstone of our commitment to preventing air pollution, promoting environmental responsibility, and enhancing operational efficiency in Petrochemical Refineries, natural gas processing plants and other various process industries.",
                "img": "/dynamicpagesimg/gas.png",
                "keysubheading": "Discover what makes our Amine Gas Treating System a trusted industry solution",
                "features": [
                    {
                        "title": "Comprehensive Removal",
                        "description": "Our Amine Gas Treating System employs aqueous solutions of alkyl amines, commonly known as amines, to efficiently extract both hydrogen sulfide and carbon dioxide from fuel gases, guaranteeing a cleaner burn."
                    },
                    {
                        "title": "Wide Industry Application",
                        "description": "This proven method isn't limited to refineries; it's a trusted solution in petrochemical plants, natural gas processing facilities, and various industrial sectors."
                    }
                ]
            },
            {
                "title": "Bio-Gas Upgradation System",
                "slug": "biogas",
                "herosub": "Advanced Biogas Purification for Renewable Energy Applications",
                "herotitle": "Bio-Gas Upgradation System",
                "paragraph1": "At REVA PROCESS TECHNOLOGIES, we're driven by innovation that transforms ordinary into extraordinary. Our Bio-Gas Upgradation System is the pinnacle of this commitment, enriching the energy potential of biogas to deliver enhanced efficiency, extended driving ranges, and a greener planet.",
                "paragraph2": "Our Bio-Gas Upgradation System doesn't just stop at energy enhancement – it redefines it. By effectively removing carbon dioxide, we ensure a consistent gas quality that translates into a more potent energy source, resulting in longer driving distances with the same gas storage volume.",
                "img": "/dynamicpagesimg/biogas.png",
                "keysubheading": "REVA PROCESS TECHNOLOGIES has harnessed a state-of-the-art H2S scrubbing technique that goes beyond removal – it transforms hydrogen sulfide into water molecules and elemental sulfur. This revolutionary technique not only enhances energy quality but also ensures environmental compatibility.",
                "features": [
                    {
                        "title": "Biogas Upgrading: Fueling a Cleaner Future",
                        "description": "Biogas upgrading, also known as purification, is the process where impurities in the raw biogas are meticulously absorbed or scrubbed, leaving behind a purer form of methane. This pristine product, known as bio-methane, can be further compressed and bottled, earning the name Bio-CNG."
                    },
                    {
                        "title": "Empowering Sustainability",
                        "description": "In a world demanding cleaner energy solutions, REVA PROCESS TECHNOLOGIES is at the forefront. Our Bio-Gas Upgradation System reimagines biogas potential, aligning it with the aspirations of a sustainable tomorrow."
                    }
                ]
            }
        ]

        for item in tech_data:
            db_tech = models.Technology(
                title=item["title"],
                slug=item["slug"],
                herosub=item.get("herosub"),
                herotitle=item.get("herotitle"),
                paragraph1=item.get("paragraph1"),
                paragraph2=item.get("paragraph2"),
                img=item.get("img"),
                keysubheading=item.get("keysubheading"),
                features=item.get("features", [])
            )
            db.add(db_tech)
        
        db.commit()
        print(f"Successfully seeded {len(tech_data)} technologies.")

    except Exception as e:
        print(f"Error seeding technologies: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # Create the tables if they don't exist
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    seed_technologies()
