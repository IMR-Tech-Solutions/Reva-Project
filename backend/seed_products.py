import sys
import os
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models
import schemas

# Add the current directory to sys.path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def seed_products():
    db = SessionLocal()
    try:
        # We explicitly drop the old table and recreate it because schema has changed
        print("Dropping existing products table to apply new schema...")
        models.Product.__table__.drop(engine, checkfirst=True)
        print("Creating products table...")
        models.Product.__table__.create(engine, checkfirst=True)

        print("Seeding products...")
        product_data = [
            {
                "title": "Boilers",
                "path": "/boilers",
                "herosub": "Industrial Steam Generation Systems",
                "herotitle": "High-Efficiency Industrial Boilers",
                "paragraph1": "At REVA Process Technologies, we design and manufacture industrial boilers that set the standard for efficiency, reliability, and safety. Our boiler systems are engineered to meet the demanding requirements of process industries.",
                "paragraph2": "From fire-tube to water-tube configurations, our boilers are built with premium materials and advanced combustion technology.",
                "img": "/productimages/boiler.png",
                "keysubheading": "Engineered for performance, designed for durability, and optimized for efficiency",
                "features": [
                    {
                        "title": "Superior Thermal Efficiency",
                        "description": "Our boilers achieve up to 95% thermal efficiency through advanced combustion control."
                    },
                    {
                        "title": "Robust Construction",
                        "description": "Built with high-grade carbon steel and alloy materials, our boilers are designed to withstand high pressures."
                    }
                ],
                "applications": [
                    "Oil & Gas Refineries",
                    "Petrochemical Plants",
                    "Power Generation",
                    "Chemical Processing",
                    "Food & Beverage",
                    "Pharmaceutical"
                ]
            },
            {
                "title": "Basket Filters",
                "path": "/basket-filters",
                "herosub": "Efficient Solid-Liquid Separation Systems",
                "herotitle": "Industrial Basket Filters",
                "paragraph1": "REVA Process Technologies offers high-performance basket filters designed for reliable solid-liquid separation in process industries.",
                "paragraph2": "Available in various sizes and materials of construction, our basket filters feature quick-opening designs for easy maintenance and cleaning.",
                "img": "/productimages/basket.png",
                "keysubheading": "Protecting your process with reliable, easy-to-maintain filtration solutions",
                "features": [
                    {
                        "title": "Quick-Opening Design",
                        "description": "Tool-free basket removal with swing-bolt closures enables rapid cleaning and filter element replacement."
                    },
                    {
                        "title": "Wide Range of Mesh Sizes",
                        "description": "Available in mesh sizes from coarse strainers (10-20 mesh) to fine filters (200+ mesh)."
                    }
                ],
                "applications": [
                    "Chemical Processing",
                    "Petrochemical Plants",
                    "Water Treatment",
                    "Oil & Gas",
                    "Pharmaceutical",
                    "Food & Beverage"
                ]
            }
        ]

        for item in product_data:
            db_product = models.Product(
                title=item["title"],
                path=item["path"],
                herosub=item.get("herosub"),
                herotitle=item.get("herotitle"),
                paragraph1=item.get("paragraph1"),
                paragraph2=item.get("paragraph2"),
                img=item.get("img"),
                keysubheading=item.get("keysubheading"),
                features=item.get("features", []),
                applications=item.get("applications", [])
            )
            db.add(db_product)
        
        db.commit()
        print(f"Successfully seeded {len(product_data)} products.")

    except Exception as e:
        print(f"Error seeding products: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_products()
