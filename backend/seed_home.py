from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

def seed_home():
    db = SessionLocal()
    
    # 1. Seed Home Hero Slides
    hero_slides = [
        {
            "small_text": "End-to-End Project Delivery Since 2014",
            "heading": "India's Trusted EPCC & EPCM Solutions Partner",
            "sub_text": "From concept to commissioning — chemicals, petrochemicals, biogas & beyond.",
            "button_text": "Explore Our Capabilities",
            "button_link": "/services",
            "order": 1
        },
        {
            "small_text": "Process Industries We Serve",
            "heading": "Chemicals · Petrochemicals · Biogas · Environmental Technologies",
            "sub_text": "Customized, cost-effective, and sustainable plant solutions built around your process requirements.",
            "button_text": "Learn More",
            "button_link": "/about",
            "order": 2
        },
        {
            "small_text": "Why Reva Process Technologies",
            "heading": "Engineering Strength. In-House Manufacturing. Robust Site Execution.",
            "sub_text": "One integrated team delivering precision-engineered plants — on time, on budget, no compromise.",
            "button_text": "Get In Touch",
            "button_link": "/contact",
            "order": 3
        }
    ]

    # Check if slides already exist
    if db.query(models.HomeHeroSlide).count() == 0:
        for slide_data in hero_slides:
            slide = models.HomeHeroSlide(**slide_data)
            db.add(slide)
        print("✓ Home Hero slides seeded.")
    else:
        print("Skipping Home Hero slides seeding (already exists).")

    # 2. Seed Home About Content
    home_about = {
        "label": "About Reva Process Technologies",
        "heading": "One Roof. Every Stage.",
        "sub_heading": "Engineering to Commissioning, Delivered Right.",
        "description": "Established in 2014 and headquartered at Trident Business Center, Baner, Pune, Reva Process Technologies integrates Engineering, Procurement, Construction, and Commissioning (EPCC) under one roof — delivering fit-for-purpose plants aligned with client performance, safety, and reliability expectations.",
        "highlight_text": "Our core process engineering and design competence, combined with strong in-house manufacturing and robust site execution capabilities, enables us to serve clients across India and international markets in chemicals, petrochemicals, biogas, environmental technologies, and allied sectors.",
        "pillars": ["Excellence", "Quality", "Trust", "Innovation", "Teamwork"],
        "stat_year": "2014",
        "stat_text": "Est. in Pune, India",
        "image_main": "./hero1.png",
        "image_sub": "./hero2.png"
    }

    # Check if home about content already exists
    existing_about = db.query(models.HomeAboutContent).first()
    if not existing_about:
        db_about = models.HomeAboutContent(**home_about)
        db.add(db_about)
        print("✓ Home About content seeded.")
    else:
        # Update existing record with the base fields
        for key in ["label", "heading", "sub_heading", "description", "highlight_text", "pillars", "stat_year", "stat_text", "image_main", "image_sub"]:
            setattr(existing_about, key, home_about[key])
        print("✓ Home About content updated.")

    # 3. Seed Strategic Advice Content
    strategic_advice = {
        "label": "Expert Guidance",
        "heading": "Strategic advice. Practical delivery.",
        "sub_heading": "We don't just talk strategy, we deliver on it.",
        "description": "We're a global team of consultants, engineers, strategists, scientists and digital experts. With decades of hands-on experience and the latest insights and technologies, we turn ambition into action.",
        "features": ["Strategic consulting", "Digital transformation", "Decarbonization solutions", "End-to-end delivery"],
        "image": "./strategic-advice.jpg",
        "exp_year": "25+",
        "exp_text": "Years Experience"
    }

    existing_advice = db.query(models.StrategicAdvice).first()
    if not existing_advice:
        db_advice = models.StrategicAdvice(**strategic_advice)
        db.add(db_advice)
        print("✓ Strategic Advice content seeded.")
    else:
        for key, value in strategic_advice.items():
            setattr(existing_advice, key, value)
        print("✓ Strategic Advice content updated.")

    db.commit()
    db.close()

if __name__ == "__main__":
    # Create tables if they don't exist
    models.Base.metadata.create_all(bind=engine)
    seed_home()
