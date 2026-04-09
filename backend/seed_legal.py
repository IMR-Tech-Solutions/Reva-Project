import sys
import os

# Add the 'backend' directory to sys.path so 'import models', 'import schemas', etc. 
# work consistently with how they are imported in other files (like crud.py)
backend_path = os.path.dirname(os.path.abspath(__file__))
if backend_path not in sys.path:
    sys.path.append(backend_path)

import models
import schemas
import crud
from database import SessionLocal, engine

def seed_legal_content():
    db = SessionLocal()
    try:
        # 1. Privacy Policy
        privacy_data = schemas.LegalContentCreate(
            title="Privacy Policy",
            description="At Reva, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data.",
            last_updated="January 19, 2026",
            contact_email="privacy@reva.com",
            contact_phone="+91 123 456 7890",
            contact_address="Reva Engineering Solutions, Pune, Maharashtra, India",
            sections=[
                {
                    "title": "Information We Collect",
                    "content": [
                        "Personal Information: When you contact us, request a quote, or use our services, we may collect personal information such as your name, email address, phone number, company name, and job title.",
                        "Technical Data: We automatically collect certain information about your device, including IP address, browser type, operating system, and browsing behavior on our website.",
                        "Cookies: Our website uses cookies to enhance user experience, analyze site traffic, and improve our services."
                    ]
                },
                {
                    "title": "How We Use Your Information",
                    "content": [
                        "To provide and improve our engineering, procurement, construction, manufacturing, and maintenance services",
                        "To respond to your inquiries, process requests, and communicate about projects",
                        "To send technical updates, service announcements, and marketing communications (with your consent)",
                        "To analyze website usage and optimize user experience",
                        "To comply with legal obligations and enforce our terms of service"
                    ]
                },
                {
                    "title": "Information Sharing and Disclosure",
                    "content": [
                        "We do not sell, trade, or rent your personal information to third parties.",
                        "We may share information with trusted service providers who assist in our operations (e.g., hosting, analytics) under strict confidentiality agreements.",
                        "We may disclose information if required by law, regulation, legal process, or governmental request.",
                        "Business transfers: In the event of a merger, acquisition, or asset sale, your information may be transferred to the acquiring entity."
                    ]
                },
                {
                    "title": "Data Security",
                    "content": [
                        "We implement industry-standard security measures including encryption, firewalls, and secure servers to protect your personal information.",
                        "Access to personal data is restricted to authorized personnel only.",
                        "Regular security audits and vulnerability assessments are conducted to ensure data protection.",
                        "However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
                    ]
                }
            ]
        )
        crud.update_legal_content(db, "privacy", privacy_data)
        print("Seeded Privacy Policy")

        # 2. Terms & Conditions
        terms_data = schemas.LegalContentCreate(
            title="Terms & Conditions",
            description="These Terms and Conditions govern your use of Reva's website and services. Please read them carefully before engaging with our services.",
            last_updated="January 19, 2026",
            contact_email="legal@reva.com",
            contact_phone="+91 123 456 7890",
            contact_address="Reva Engineering Solutions Pvt. Ltd., Business Address, Pune, Maharashtra 411001, India",
            sections=[
                {
                    "title": "Acceptance of Terms",
                    "content": [
                        "By accessing and using the Reva website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.",
                        "If you do not agree with any part of these terms, you must not use our website or services.",
                        "We reserve the right to modify these terms at any time. Your continued use of our services after changes constitutes acceptance of the modified terms."
                    ]
                },
                {
                    "title": "Services Description",
                    "content": [
                        "Reva provides engineering, procurement, and construction (EPC) services, manufacturing solutions, and maintenance & support services for industrial facilities.",
                        "Our services include but are not limited to: project design, equipment procurement, fabrication, installation, commissioning, preventive maintenance, and emergency support."
                    ]
                },
                {
                    "title": "User Obligations",
                    "content": [
                        "You agree to provide accurate, complete, and current information when requesting services or submitting inquiries.",
                        "You are responsible for maintaining the confidentiality of any login credentials or account information provided to you.",
                        "You must not use our website or services for any unlawful purpose or in violation of applicable regulations."
                    ]
                }
            ]
        )
        crud.update_legal_content(db, "terms", terms_data)
        print("Seeded Terms & Conditions")

        # 3. Default Settings
        settings_data = schemas.SiteSettingsCreate(
            site_name="Reva Process Technologies",
            site_description="Leading provider of innovative process engineering and technology solutions worldwide.",
            contact_email="info@reva.com",
            contact_phone="+91 123 456 7890",
            address="Pune, Maharashtra, India",
            facebook="https://facebook.com/reva",
            twitter="https://twitter.com/reva",
            linkedin="https://linkedin.com/company/reva",
            instagram="https://instagram.com/reva"
        )
        crud.update_site_settings(db, settings_data)
        print("Seeded Site Settings")

    except Exception as e:
        print(f"Error seeding legal content: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    # Ensure tables are created
    models.Base.metadata.create_all(bind=engine)
    seed_legal_content()
