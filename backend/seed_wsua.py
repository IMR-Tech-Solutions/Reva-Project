"""
Seed script for 'What Sets Us Apart?' section.
Run: python seed_wsua.py
"""
from database import engine, SessionLocal
import models

def seed():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Content already exists from first run, skip
        existing_items = db.query(models.WhatSetsUsApartItem).count()
        if existing_items > 0:
            print("[OK] Items already seeded, skipping.")
            return

        items_data = [
            {
                "title": "Superior Expertise",
                "description": "We possess strong proficiency in Process Designing, Mechanical, Piping, Instrumentation, and Control Systems.Our team of experts is well-versed in these areas, enabling us to deliver exceptional results.",
                "icon": "LuHardHat",
                "order": 1,
                "is_active": True,
            },
            {
                "title": "Timely Delivery & Quality",
                "description": "We take pride in delivering projects that not only meet but exceed customer expectations within the agreed-upon time frame. Our commitment to world-class quality ensures that our clients receive the best possible outcomes.",
                "icon": "LuClock",
                "order": 2,
                "is_active": True,
            },
            {
                "title": "Tailor-Made Solutions",
                "description": "Our team comprises experienced engineers and consultants who work collaboratively to provide customized solutions that address the evolving needs of our clients. We understand that each project is unique, and our approach is always tailored accordingly.",
                "icon": "LuPencilRuler",
                "order": 3,
                "is_active": True,
            },
            {
                "title": "Strong Infrastructure",
                "description": "Our infrastructure supports process designing, manufacturing, project management, and plant maintenance activities.",
                "icon": "LuFactory",
                "order": 4,
                "is_active": True,
            },
            {
                "title": "Expert Project Management",
                "description": "Our project management team ensures smooth coordination, efficient execution, and timely completion.",
                "icon": "LuUsers",
                "order": 5,
                "is_active": True,
            },
            {
                "title": "Advanced Network IT System",
                "description": "We use a secured and advanced Network IT System for efficient operations and secure data handling.",
                "icon": "LuLock",
                "order": 6,
                "is_active": True,
            },
            {
                "title": "Process License Acquisition",
                "description": "REVA has acquired the Process License for Hydrogen Sulfide (H2S) Removal using ISET Technology developed by IISc Bangalore.",
                "icon": "LuFileBadge",
                "order": 7,
                "is_active": True,
            },
        ]

        for item_data in items_data:
            item = models.WhatSetsUsApartItem(**item_data)
            db.add(item)

        db.commit()
        print("[OK] %d feature items created" % len(items_data))
        print("[DONE] What Sets Us Apart seed completed!")

    except Exception as e:
        db.rollback()
        print("[ERROR] Seed failed: %s" % str(e))
    finally:
        db.close()

if __name__ == "__main__":
    seed()
