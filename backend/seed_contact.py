import sys
import os
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models

# Add the current directory to sys.path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def seed_contact():
    db = SessionLocal()
    try:
        # Drop tables to ensure fresh schema
        models.ContactSetting.__table__.drop(engine, checkfirst=True)
        models.ContactMessage.__table__.drop(engine, checkfirst=True)
        
        # Create tables
        models.ContactSetting.__table__.create(engine, checkfirst=True)
        models.ContactMessage.__table__.create(engine, checkfirst=True)

        print("Checking if contact settings exist...")
        existing_settings = db.query(models.ContactSetting).first()

        if existing_settings:
            print("Contact settings already exist, skipping seed. To re-seed, drop the table first.")
        else:
            print("Seeding contact settings...")
            settings_data = models.ContactSetting(
                email_inquiry="info@revaprocesstechnologies.com",
                phone_primary="+91 98765 43210",
                address_hq="Trident Business Center, Baner, Pune, Maharashtra – 411045",
                map_link="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.0!2d73.7793!3d18.5590!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e4a1234567%3A0xabcdef1234567890!2sBaner%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123",
                hours_weekday="9:00 AM – 6:00 PM",
                hours_saturday="9:00 AM – 2:00 PM",
                hours_sunday="Closed",
                social_linkedin="https://linkedin.com/",
                social_twitter="https://twitter.com/",
                social_facebook="https://facebook.com/",
                social_instagram="https://instagram.com/",
                markets_served=[
                    "India",
                    "Middle East",
                    "International",
                    "Chemicals",
                    "Petrochemicals",
                    "Biogas",
                    "Environmental Tech"
                ]
            )
            db.add(settings_data)
            db.commit()
            print("Successfully seeded contact settings.")

    except Exception as e:
        print(f"Error seeding contact settings: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_contact()
