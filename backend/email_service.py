import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formatdate
import os
from dotenv import load_dotenv
import logging

load_dotenv()

# Configure logging
logger = logging.getLogger(__name__)

# Gmail SMTP Configuration
GMAIL_ADDRESS = os.getenv("GMAIL_ADDRESS", "reedhigohel563@gmail.com")
GMAIL_PASSWORD = os.getenv("GMAIL_PASSWORD", "pdzv yhuv oxgk xidu")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "reedhigohel563@gmail.com")

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587


def send_email(to_email: str, subject: str, body: str, is_html: bool = False) -> bool:
    """
    Send email using Gmail SMTP.
    
    Args:
        to_email: Recipient email address
        subject: Email subject
        body: Email body content
        is_html: Whether body is HTML formatted
        
    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        # Validate email
        if not to_email or "@" not in to_email:
            logger.warning(f"❌ Invalid email address: {to_email}")
            print(f"❌ Invalid email address: {to_email}")
            return False
        
        # Create message
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = GMAIL_ADDRESS
        msg["To"] = to_email
        msg["Date"] = formatdate(localtime=True)
        
        # Add body
        mime_type = "html" if is_html else "plain"
        msg.attach(MIMEText(body, mime_type))
        
        print(f"📧 Connecting to SMTP server: {SMTP_SERVER}:{SMTP_PORT}")
        
        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            print(f"📧 Logging in to Gmail...")
            server.login(GMAIL_ADDRESS, GMAIL_PASSWORD)
            print(f"📧 Sending email to {to_email}...")
            server.send_message(msg)
        
        logger.info(f"✓ Email sent to {to_email}: {subject}")
        print(f"✓ Email sent successfully to {to_email}")
        return True
        
    except Exception as e:
        logger.error(f"❌ Failed to send email to {to_email}: {str(e)}")
        print(f"❌ Email error to {to_email}: {str(e)}")
        return False


def send_application_received_email(user_name: str, user_email: str, position: str, resume_file: str = None) -> bool:
    """Send email to user confirming application received."""
    subject = "Application Received - REVA"
    body = f"""Hello {user_name},

Thank you for applying for the {position} position at REVA.

Your application has been successfully received. We appreciate your interest in joining our team. Our team will review your profile and get back to you soon.

We'll be in touch within the next 2-3 weeks with an update on your application status.

Best regards,
REVA Recruitment Team
reedhigohel563@gmail.com"""
    
    return send_email(user_email, subject, body)


def send_admin_notification_email(user_name: str, user_email: str, phone: str, position: str, experience: str, resume_file: str = None) -> bool:
    """Send email to admin notifying of new application."""
    subject = f"New Job Application - {user_name}"
    
    resume_info = f"Resume: {resume_file}" if resume_file else "Resume: Not provided"
    
    body = f"""New Application Received!

Applicant Details:
Name: {user_name}
Email: {user_email}
Phone: {phone}
Position Applied: {position}
Experience: {experience} years
{resume_info}

Please log into the admin dashboard to review this application.

REVA Admin System"""
    
    return send_email(ADMIN_EMAIL, subject, body)


def send_application_approved_email(user_name: str, user_email: str, position: str) -> bool:
    """Send email to user when application is approved."""
    print(f"📧 [APPROVAL EMAIL] Preparing email for {user_name} ({user_email})")
    
    subject = "Application Approved - REVA"
    body = f"""Hello {user_name},

Congratulations! 🎉

We are pleased to inform you that your application for the {position} position has been approved.

Our team will contact you shortly with further steps and details about the next phase of the hiring process.

Thank you for your interest in joining REVA!

Best regards,
REVA Recruitment Team
reedhigohel563@gmail.com"""
    
    print(f"📧 [APPROVAL EMAIL] Subject: {subject}")
    result = send_email(user_email, subject, body)
    print(f"📧 [APPROVAL EMAIL] Result: {'SUCCESS' if result else 'FAILED'}")
    return result


def send_application_rejected_email(user_name: str, user_email: str, position: str) -> bool:
    """Send email to user when application is rejected."""
    print(f"📧 [REJECTION EMAIL] Preparing email for {user_name} ({user_email})")
    
    subject = "Application Update - REVA"
    body = f"""Hello {user_name},

Thank you for applying for the {position} position at REVA.

After careful review of your application, we regret to inform you that your profile was not selected for this position at this time. This decision was made based on the specific requirements and qualifications we are looking for.

We encourage you to apply for other positions in the future that match your skills and experience. Your resume will remain on file for 6 months.

We wish you all the best in your career endeavors!

Best regards,
REVA Recruitment Team
reedhigohel563@gmail.com"""
    
    print(f"📧 [REJECTION EMAIL] Subject: {subject}")
    result = send_email(user_email, subject, body)
    print(f"📧 [REJECTION EMAIL] Result: {'SUCCESS' if result else 'FAILED'}")
    return result

def send_contact_form_notification_email(full_name: str, email: str, phone: str, company: str, project_type: str, message: str) -> bool:
    """Send email to admin notifying of a new contact form submission."""
    subject = f"New Contact Inquiry - {full_name}"
    
    body = f"""New Contact Form Submission received!

Details:
Name: {full_name}
Company: {company or 'Not provided'}
Email: {email}
Phone: {phone or 'Not provided'}
Project Type: {project_type or 'Not provided'}

Message:
{message}

Please log into the admin dashboard to review this message.

REVA Admin System"""
    
    return send_email(ADMIN_EMAIL, subject, body)
