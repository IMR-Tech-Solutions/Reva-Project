import os
import sys

# Add the current directory to sys.path to import local modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import models
from database import SessionLocal, engine, Base

def seed_about():
    # Ensure all tables exist
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # 1. Clear existing About data to avoid duplicates during seeding
        db.query(models.AboutContent).delete()
        db.query(models.TeamMember).delete()
        db.query(models.CompanyValueIndicator).delete()
        db.query(models.DifferentiatorCard).delete()
        db.query(models.Testimonial).delete()
        db.commit()

        # 2. Seed AboutContent (Singleton)
        about_content = models.AboutContent(
            hero_title="One Roof. Every Stage.",
            hero_subtitle="Engineering to Commissioning, Delivered Right.",
            hero_description="Established in 2014 and headquartered at Trident Business Center, Baner, Pune, Reva Process Technologies integrates Engineering, Procurement, Construction & Commissioning (EPCC) under one roof — serving chemicals, petrochemicals, biogas, and environmental technology sectors across India and international markets.",
            hero_year="2014",
            hero_image_main="./hero1.png",
            hero_image_sub="./hero2.png",
            highlights=[
                {"label": "EPCC & EPCM", "desc": "End-to-end project delivery under one roof"},
                {"label": "Process Engineering", "desc": "Core competence in design & process chemistry"},
                {"label": "In-House Manufacturing", "desc": "Fabrication backed by strong site execution"},
                {"label": "Global Reach", "desc": "Serving India & international markets since 2014"}
            ],
            core_pills=["Excellence", "Quality", "Trust", "Innovation", "Teamwork"],
            mission_text="To provide efficient and effective engineering services — combining proven and innovative methods with full employee engagement — to create sustainable value for all stakeholders while maintaining a strong sense of social responsibility.",
            vision_text="To become a premier EPCC & EPCM company delivering process technologies and customized solutions — recognized for quality, cost-effectiveness, and adherence to the highest HSE standards across every project we undertake.",
            values_title="Our Core Values",
            values_description="These principles guide every decision — from concept and design through procurement, construction, and final commissioning.",
            why_us_title="Why Choose Reva",
            why_us_description="Reva Process Technologies brings process engineering depth, in-house manufacturing, and robust site execution under one roof — delivering fit-for-purpose, cost-effective plants tailored to your exact process requirements.",
            why_us_years_excellence="2014",
            why_us_image="./why-choose-us.jpg",
            advantages=[
                "Single-window EPCC & EPCM delivery — concept to commissioning",
                "Core process engineering strength with in-house manufacturing",
                "Multi-disciplinary team: process, mechanical, piping, civil, E&I",
                "Proven across chemicals, petrochemicals, biogas & environmental tech",
                "Stringent HSE standards embedded from design through handover",
                "Customized solutions — no off-the-shelf packages"
            ],
            team_title="Our Leadership Team",
            team_subtitle="A growing team of qualified professionals across process, mechanical, piping, civil, electrical, instrumentation, and project management disciplines."
        )
        db.add(about_content)

        # 3. Seed Team Members (Original Content)
        team_members = [
            models.TeamMember(
                name="Kedar Chaudhari",
                role="Founder & CEO",
                bio="Visionary leader driving Reva's growth from engineering services to a full-scope EPCCM partner since 2014.",
                image="./team-1.jpg",
                linkedin="#",
                email="kedar@revaprocess.com",
                order=1
            ),
            models.TeamMember(
                name="Process Engineering Lead",
                role="Head – Process & Design",
                bio="Core process design competence spanning PFDs, P&IDs, equipment sizing, and FEED across diverse chemistries.",
                image="./team-2.jpg",
                linkedin="#",
                email="process@revaprocess.com",
                order=2
            ),
            models.TeamMember(
                name="Projects Lead",
                role="Head – EPC Project Management",
                bio="Manages end-to-end project execution — planning, procurement, site coordination, and commissioning handover.",
                image="./team-3.jpg",
                linkedin="#",
                email="projects@revaprocess.com",
                order=3
            ),
            models.TeamMember(
                name="Manufacturing Lead",
                role="Head – Manufacturing & Site",
                bio="Oversees in-house fabrication, equipment supply, site erection, and commissioning across all project scopes.",
                image="./team-4.jpg",
                linkedin="#",
                email="manufacturing@revaprocess.com",
                order=4
            )
        ]
        db.add_all(team_members)

        # 4. Seed Company Values
        values = [
            models.CompanyValueIndicator(
                title="Safety & HSE",
                description="Stringent health, safety, and environmental standards embedded across every project — from design through commissioning.",
                icon_name="FiShield",
                order=1
            ),
            models.CompanyValueIndicator(
                title="Integrity",
                description="Transparent, ethical conduct in every client engagement, partnership, and delivery milestone.",
                icon_name="FiAward",
                order=2
            ),
            models.CompanyValueIndicator(
                title="Innovation",
                description="Combining proven engineering methods with innovative approaches to deliver fit-for-purpose, cost-effective solutions.",
                icon_name="FiZap",
                order=3
            ),
            models.CompanyValueIndicator(
                title="Teamwork",
                description="Full employee engagement and cross-functional collaboration — from process design to site execution.",
                icon_name="FiUsers",
                order=4
            )
        ]
        db.add_all(values)

        # 5. Seed Differentiators
        differentiators = [
            models.DifferentiatorCard(
                title="HSE First",
                description="Safety & environment built into every design decision",
                icon_name="FiShield",
                order=1
            ),
            models.DifferentiatorCard(
                title="Innovation",
                description="Proven methods combined with forward-thinking engineering",
                icon_name="FiZap",
                order=2
            ),
            models.DifferentiatorCard(
                title="Expert Team",
                description="Qualified professionals across all engineering disciplines",
                icon_name="FiUsers",
                order=3
            ),
            models.DifferentiatorCard(
                title="Quality Assured",
                description="Rigorous QA across procurement, fabrication & commissioning",
                icon_name="FiAward",
                order=4
            )
        ]
        db.add_all(differentiators)

        # 6. Seed Testimonials (Original Content)
        testimonials = [
            models.Testimonial(
                name="Rajesh Kulkarni",
                role="Project Director",
                company="Reliance Industries",
                quote="REVA Engineering delivered exceptional process equipment with outstanding quality and adherence to timelines. Their attention to detail is unmatched.",
                rating=5,
                order=1
            ),
            models.Testimonial(
                name="Anita Deshmukh",
                role="Plant Head",
                company="HPCL",
                quote="Their engineering expertise and attention to safety standards made them a trusted long-term partner for our critical projects.",
                rating=5,
                order=2
            ),
            models.Testimonial(
                name="Vikram Mehta",
                role="Operations Manager",
                company="L&T Heavy Engineering",
                quote="Professional execution, clear communication, and reliable performance across complex projects. Highly recommended.",
                rating=5,
                order=3
            ),
            models.Testimonial(
                name="Suresh Patil",
                role="Maintenance Lead",
                company="IOCL",
                quote="High-quality fabrication and excellent post-installation support. They exceeded our expectations.",
                rating=5,
                order=4
            )
        ]
        db.add_all(testimonials)

        db.commit()
        print("✓ About Us module data seeded successfully.")
    except Exception as e:
        db.rollback()
        print(f"✗ Seeding failed: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_about()
