import sys
import os
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
import schemas
from datetime import datetime

# Add the current directory to sys.path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def seed_news():
    db = SessionLocal()
    try:
        # Check if news already exists to avoid duplicates
        existing_count = db.query(models.NewsArticle).count()
        if existing_count > 0:
            print(f"Database already has {existing_count} news articles. Skipping seeding.")
            return

        print("Seeding news articles...")
        
        # Static news data from newsData.js
        news_data = [
            {
                "id": 1,
                "image": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
                "category": "Process Engineering",
                "published_date": "2025-12-23",
                "title": "REVA Rosenberg awarded EPC execution contract for PPF-project",
                "short_description": "Major breakthrough in process facility development with comprehensive engineering execution.",
                "slug": "reva-rosenberg-awarded-epc-execution-contract-for-ppf-project"
            },
            {
                "id": 20,
                "image": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
                "category": "Process Engineering",
                "published_date": "2026-02-05",
                "title": "Distillation column optimization reduces energy by 25%",
                "short_description": "Advanced control strategies boost separation efficiency dramatically.",
                "slug": "distillation-column-optimization-reduces-energy-by-25"
            },
            {
                "id": 21,
                "image": "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800",
                "category": "Process Engineering",
                "published_date": "2026-01-28",
                "title": "Heat exchanger retrofit delivers 18% utility savings",
                "short_description": "Pinch analysis identifies optimization opportunities in existing plants.",
                "slug": "heat-exchanger-retrofit-delivers-18-utility-savings"
            },
            {
                "id": 22,
                "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
                "category": "Process Engineering",
                "published_date": "2026-01-18",
                "title": "P&ID standardization accelerates project delivery 40%",
                "short_description": "Template-based documentation reduces design errors significantly.",
                "slug": "pid-standardization-accelerates-project-delivery-40"
            },
            {
                "id": 66,
                "image": "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=800",
                "category": "Process Engineering",
                "published_date": "2026-02-12",
                "title": "Valmet Beyond Circularity program concludes with green transition boost",
                "short_description": "Eco-system collaboration accelerates sustainable process technologies.",
                "slug": "valmet-beyond-circularity-program-concludes-with-green-transition-boost"
            },
            {
                "id": 67,
                "image": "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800",
                "category": "Process Engineering",
                "published_date": "2026-02-08",
                "title": "KnitMesh PyroCore actuator enhances process safety systems",
                "short_description": "Pyrotechnic mesh technology improves emergency shutdown reliability.",
                "slug": "knitmesh-pyrocore-actuator-enhances-process-safety-systems"
            },
            {
                "id": 3,
                "image": "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800",
                "category": "Sustainability",
                "published_date": "2025-12-12",
                "title": "COP30: Five key takeaways for industrial decarbonization",
                "short_description": "Climate summit highlights process engineering's critical role.",
                "slug": "cop30-five-key-takeaways-for-industrial-decarbonization"
            },
            {
                "id": 23,
                "image": "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800",
                "category": "Sustainability",
                "published_date": "2026-02-10",
                "title": "Zero-liquid discharge achieves compliance in textile sector",
                "short_description": "Integrated membrane-evaporation eliminates wastewater discharge.",
                "slug": "zero-liquid-discharge-achieves-compliance-in-textile-sector"
            },
            {
                "id": 24,
                "image": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
                "category": "Sustainability",
                "published_date": "2026-02-02",
                "title": "Bio-based solvents cut VOC emissions 70% in paints",
                "short_description": "Renewable alternatives match petroleum performance sustainably.",
                "slug": "bio-based-solvents-cut-voc-emissions-70-in-paints"
            },
            {
                "id": 68,
                "image": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800",
                "category": "Sustainability",
                "published_date": "2026-02-16",
                "title": "Purdue launches School of Sustainability Engineering",
                "short_description": "First program combining sustainability and environmental engineering.",
                "slug": "purdue-launches-school-of-sustainability-engineering"
            },
            {
                "id": 69,
                "image": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
                "category": "Sustainability",
                "published_date": "2026-02-09",
                "title": "RMI: New wave of innovation in chemicals sustainability",
                "short_description": "$4.7T industry invests in efficiency and carbon conversion tech.",
                "slug": "rmi-new-wave-of-innovation-in-chemicals-sustainability"
            }
        ]

        detailed_template = """
        <p>At REVA Process Technologies, this news reflects ongoing industry leadership in process innovation, sustainability, and project execution. Our teams continuously deliver high-impact solutions to help clients meet operational and regulatory goals.</p>
        <p>This article is one of many from our insights series. Explore additional case studies, technology breakthroughs, and regulatory updates in our News & Insights section.</p>
        <p>If you want to learn more about how this topic might support your project, contact us with inquiry details and we'll connect you with our engineering specialists.</p>
        """

        for item in news_data:
            db_news = models.NewsArticle(
                title=item["title"],
                slug=item["slug"],
                category=item["category"],
                short_description=item["short_description"],
                detailed_description=detailed_template,
                image=item["image"],
                published_date=item["published_date"]
            )
            db.add(db_news)
        
        db.commit()
        print(f"Successfully seeded {len(news_data)} news articles.")

    except Exception as e:
        print(f"Error seeding news: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_news()
