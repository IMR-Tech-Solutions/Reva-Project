from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
import uvicorn
from typing import List, Optional
import os
from pathlib import Path
import shutil

import models
import schemas
import crud
from database import SessionLocal, engine, get_db
from email_service import (
    send_application_received_email,
    send_admin_notification_email,
    send_application_approved_email,
    send_application_rejected_email,
    send_contact_form_notification_email,
)
import logging
from auth_utils import verify_password, create_access_token, SECRET_KEY, ALGORITHM
from jose import JWTError, jwt

logger = logging.getLogger(__name__)

app = FastAPI(title="Reva API", description="Dynamic Backend for Reva Project")

# Enable CORS (allowing your frontend to talk to the backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://reva-web.imrtechsolutions.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
UPLOADS_DIR = Path(__file__).parent / "uploads" / "resumes"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

ABOUT_UPLOADS_DIR = Path(__file__).parent / "uploads" / "about"
ABOUT_UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

CAREER_UPLOADS_DIR = Path(__file__).parent / "uploads" / "career"
CAREER_UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

HERO_UPLOADS_DIR = Path(__file__).parent / "uploads" / "hero"
HERO_UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

# Static files serving for uploaded images
from fastapi.staticfiles import StaticFiles
app.mount("/api/uploads", StaticFiles(directory=Path(__file__).parent / "uploads"), name="uploads")

@app.get("/")
async def root():
    return {"message": "Welcome to the Reva API"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

# --- Auth Dependencies ---
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_admin(current_user: models.AdminUser = Depends(get_current_user)):
    if not current_user.is_active or not current_user.is_admin:
        raise HTTPException(status_code=400, detail="Not authorized as admin")
    return current_user

# --- Authentication API ---
@app.post("/auth/login", response_model=schemas.Token)
def login_for_access_token(login_data: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=login_data.email)
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "user": user}

@app.get("/auth/me", response_model=schemas.UserRead)
async def read_users_me(current_user: models.AdminUser = Depends(get_current_active_admin)):
    return current_user

@app.get("/auth/stats", response_model=schemas.AdminDashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.get_admin_dashboard_stats(db)

# --- News API ---
@app.get("/news", response_model=List[schemas.News])
def read_news(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    news_articles = crud.get_news(db, skip=skip, limit=limit)
    return news_articles

@app.post("/news", response_model=schemas.News)
def create_news_article(news: schemas.NewsCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_news(db=db, news=news)

@app.get("/news/{news_id}", response_model=schemas.News)
def read_news_article(news_id: int, db: Session = Depends(get_db)):
    db_news = db.query(models.NewsArticle).filter(models.NewsArticle.id == news_id).first()
    if not db_news:
        raise HTTPException(status_code=404, detail="News article not found")
    return db_news

@app.get("/news/slug/{slug}", response_model=schemas.News)
def read_news_article_by_slug(slug: str, db: Session = Depends(get_db)):
    db_news = db.query(models.NewsArticle).filter(models.NewsArticle.slug == slug).first()
    if not db_news:
        raise HTTPException(status_code=404, detail="News article not found")
    return db_news

@app.put("/news/{news_id}", response_model=schemas.News)
def update_news_article(news_id: int, news: schemas.NewsCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_news = crud.update_news(db=db, news_id=news_id, news=news)
    if not db_news:
        raise HTTPException(status_code=404, detail="News article not found")
    return db_news

@app.delete("/news/{news_id}")
def delete_news_article(news_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_news = crud.delete_news(db=db, news_id=news_id)
    if not db_news:
        raise HTTPException(status_code=404, detail="News article not found")
    return {"message": "News article deleted successfully"}

# --- Career Positions API ---
@app.get("/career/positions", response_model=List[schemas.CareerPosition])
def read_career_positions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    positions = crud.get_career_positions(db, skip=skip, limit=limit)
    return positions

@app.post("/career/positions", response_model=schemas.CareerPosition)
def create_career_position(position: schemas.CareerPositionCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_career_position(db=db, position=position)

@app.put("/career/positions/{position_id}", response_model=schemas.CareerPosition)
def update_career_position(position_id: int, position: schemas.CareerPositionCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_position = crud.update_career_position(db=db, position_id=position_id, position=position)
    if not db_position:
        raise HTTPException(status_code=404, detail="Position not found")
    return db_position

@app.delete("/career/positions/{position_id}")
def delete_career_position(position_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_position = crud.delete_career_position(db=db, position_id=position_id)
    if not db_position:
        raise HTTPException(status_code=404, detail="Position not found")
    return {"message": "Position deleted successfully"}

# --- Career Applications API ---
@app.get("/career/applications", response_model=List[schemas.CareerApplication])
def read_career_applications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    applications = crud.get_career_applications(db, skip=skip, limit=limit)
    return applications

@app.post("/career/applications", response_model=schemas.CareerApplication)
def create_career_application(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    position: str = Form(...),
    experience: str = Form(...),
    resume: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    """Create a career application with optional file upload."""
    resume_filename = None
    
    # Handle file upload if provided
    if resume and resume.filename:
        try:
            # Get file extension from original filename
            file_ext = Path(resume.filename).suffix.lower()
            
            # Sanitize name and position for filename
            safe_name = name.replace(' ', '_').replace('/', '_').replace('\\', '_')
            safe_position = position.replace(' ', '_').replace('/', '_').replace('\\', '_')
            
            # Create filename without timestamp first (for consistency)
            base_filename = f"{safe_name}_{safe_position}{file_ext}"
            file_path = UPLOADS_DIR / base_filename
            
            # If file already exists, add timestamp to make it unique
            if file_path.exists():
                import time
                timestamp = int(time.time())
                resume_filename = f"{safe_name}_{safe_position}_{timestamp}{file_ext}"
                file_path = UPLOADS_DIR / resume_filename
            else:
                resume_filename = base_filename
            
            # Ensure uploads directory exists
            UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
            
            # Read file content
            file_content = resume.file.read()
            if not file_content:
                raise Exception("File is empty")
            
            # Save file to disk
            with open(file_path, "wb") as buffer:
                buffer.write(file_content)
            
            # Verify file was saved
            if not file_path.exists():
                raise Exception("File was not saved to disk")
            
            file_size = file_path.stat().st_size
            print(f"✓ File uploaded: {resume_filename} ({file_size} bytes)")
            
        except Exception as e:
            print(f"✗ File upload error: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Failed to upload file: {str(e)}")
    
    try:
        # Create application data with defaults
        from datetime import datetime
        application_data = schemas.CareerApplicationCreate(
            name=name,
            email=email,
            phone=phone,
            position=position,
            experience=experience,
            resume=resume_filename,
            appliedDate=datetime.now().strftime("%Y-%m-%d"),
            status="Pending"
        )
        
        result = crud.create_career_application(db=db, application=application_data)
        print(f"✓ Application created: ID={result.id}, Resume={resume_filename}")
        
        # Send emails (non-blocking - don't break API if email fails)
        try:
            send_application_received_email(name, email, position, resume_filename)
            send_admin_notification_email(name, email, phone, position, experience, resume_filename)
        except Exception as e:
            logger.error(f"Email sending failed: {str(e)}")
            # Don't raise - application is already saved
        
        return result
    except Exception as e:
        print(f"✗ Application creation error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to create application: {str(e)}")

@app.patch("/career/applications/{application_id}/status", response_model=schemas.CareerApplication)
def update_application_status(application_id: int, status: str = None, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    """Update application status and send email notifications."""
    
    # Validate status parameter
    if not status or status not in ["Pending", "Reviewed", "Approved", "Rejected"]:
        print(f"✗ Invalid status: {status}")
        raise HTTPException(status_code=400, detail=f"Invalid status: {status}")
    
    print(f"📋 Status update request - App ID: {application_id}, Status: {status}")
    
    # Update status in database
    db_application = crud.update_application_status(db=db, application_id=application_id, status=status)
    if not db_application:
        print(f"✗ Application not found: {application_id}")
        raise HTTPException(status_code=404, detail="Application not found")
    
    print(f"✓ Status updated in DB - ID: {application_id}, Status: {status}")
    print(f"📧 Sending email to: {db_application.email}")
    
    # Send status update emails (non-blocking - don't break API if email fails)
    try:
        if status == "Approved":
            print(f"📧 Sending APPROVAL email to {db_application.name} ({db_application.email})")
            result = send_application_approved_email(
                db_application.name, 
                db_application.email, 
                db_application.position
            )
            print(f"{'✓' if result else '✗'} Approval email {'sent' if result else 'failed'}")
            
        elif status == "Rejected":
            print(f"📧 Sending REJECTION email to {db_application.name} ({db_application.email})")
            result = send_application_rejected_email(
                db_application.name, 
                db_application.email, 
                db_application.position
            )
            print(f"{'✓' if result else '✗'} Rejection email {'sent' if result else 'failed'}")
            
    except Exception as e:
        print(f"✗ Email sending exception: {str(e)}")
        logger.error(f"Status update email failed: {str(e)}")
        # Don't raise - status is already updated
    
    print(f"✓ Status update complete - ID: {application_id}")
    return db_application

@app.delete("/career/applications/{application_id}")
def delete_career_application(application_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_application = crud.delete_career_application(db=db, application_id=application_id)
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"message": "Application deleted successfully"}

# Career Page Content Endpoints
@app.get("/career/content", response_model=schemas.CareerContent)
def get_career_content(db: Session = Depends(get_db)):
    return crud.get_career_content(db)

@app.put("/career/content", response_model=schemas.CareerContent)
async def update_career_content(
    hero_title: Optional[str] = Form(None),
    hero_subtitle: Optional[str] = Form(None),
    hero_description: Optional[str] = Form(None),
    hero_year: Optional[str] = Form(None),
    total_employees: Optional[str] = Form(None),
    total_countries: Optional[str] = Form(None),
    total_roles: Optional[str] = Form(None),
    specs: str = Form("[]"),
    benefits: str = Form("[]"),
    hero_image: Optional[str] = Form(None),
    hero_file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    import json
    import time
    
    # Handle Image Upload
    if hero_file and hero_file.filename:
        ext = os.path.splitext(hero_file.filename)[1]
        filename = f"career_hero_{int(time.time())}{ext}"
        file_path = CAREER_UPLOADS_DIR / filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(hero_file.file, buffer)
        hero_image = f"/api/uploads/career/{filename}"

    # Parse JSON fields
    try:
        specs_list = json.loads(specs)
        benefits_list = json.loads(benefits)
    except:
        specs_list = []
        benefits_list = []

    content_data = schemas.CareerContentCreate(
        hero_title=hero_title,
        hero_subtitle=hero_subtitle,
        hero_description=hero_description,
        hero_year=hero_year,
        hero_image=hero_image,
        specs=specs_list,
        benefits=benefits_list,
        total_employees=total_employees,
        total_countries=total_countries,
        total_roles=total_roles
    )
    return crud.update_career_content(db=db, content_update=content_data)

@app.get("/career/applications/{application_id}/download-resume")
def download_resume(application_id: int, db: Session = Depends(get_db)):
    """Download the resume file for an application."""
    # Get the application
    db_application = db.query(models.CareerApplication).filter(
        models.CareerApplication.id == application_id
    ).first()
    
    if not db_application:
        print(f"✗ Application not found: ID={application_id}")
        raise HTTPException(status_code=404, detail="Application not found")
    
    if not db_application.resume:
        print(f"✗ No resume for application: ID={application_id}")
        raise HTTPException(status_code=404, detail="No resume file found for this application")
    
    # Construct file path
    file_path = UPLOADS_DIR / db_application.resume
    
    print(f"📥 Download request - App ID: {application_id}, Resume: {db_application.resume}")
    print(f"📥 Looking for file: {file_path}")
    
    # If exact file doesn't exist, try to find similar file
    if not file_path.exists():
        print(f"⚠️  Exact file not found, searching for similar files...")
        
        # Extract base name and extension
        base_name = Path(db_application.resume).stem
        ext = Path(db_application.resume).suffix.lower()
        
        # Search for files with similar name
        matching_files = list(UPLOADS_DIR.glob(f"{base_name}*{ext}"))
        
        if matching_files:
            file_path = matching_files[0]
            print(f"✓ Found similar file: {file_path.name}")
        else:
            print(f"✗ No files found matching: {base_name}*{ext}")
            raise HTTPException(status_code=404, detail=f"Resume file not found: {db_application.resume}")
    
    # Verify it's actually a file
    if not file_path.is_file():
        print(f"✗ Path is not a file: {file_path}")
        raise HTTPException(status_code=400, detail="Resume file is invalid")
    
    # Check file size
    file_size = file_path.stat().st_size
    if file_size == 0:
        print(f"✗ File is empty: {file_path}")
        raise HTTPException(status_code=400, detail="Resume file is empty")
    
    # Generate filename for download
    file_name = f"{db_application.name.replace(' ', '_')}_resume{file_path.suffix}"
    
    # Determine proper media type based on extension
    ext = file_path.suffix.lower()
    media_type = {
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    }.get(ext, 'application/octet-stream')
    
    print(f"✓ Serving download: {file_name} ({file_size} bytes, type: {media_type})")
    
    # Return file as download
    return FileResponse(
        path=file_path,
        filename=file_name,
        media_type=media_type
    )

# --- Products API ---
@app.get("/products", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_products(db, skip=skip, limit=limit)

@app.get("/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db, product_id=product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@app.get("/products/path/{path:path}", response_model=schemas.Product)
def read_product_by_path(path: str, db: Session = Depends(get_db)):
    # if path starts with a slash, we can query it that way depending on how it's stored.
    # but since it's passed via URL, wait, FastAPI might strip it or we just use path:path
    # actually `/boilers` would be passed as `path/boilers` -> `path="boilers"` if we strip leading slash in frontend
    # Let's just use path:path
    db_product = crud.get_product_by_path(db, path=path)
    if not db_product:
        # Also try with leading slash in case it was stored as "/boilers"
        db_product_with_slash = crud.get_product_by_path(db, path=f"/{path}")
        if not db_product_with_slash:
            raise HTTPException(status_code=404, detail="Product not found")
        return db_product_with_slash
    return db_product

@app.post("/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_product(db=db, product=product)

@app.put("/products/{product_id}", response_model=schemas.Product)
def update_product(product_id: int, product: schemas.ProductCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_product = crud.update_product(db=db, product_id=product_id, product=product)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_product = crud.delete_product(db=db, product_id=product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

# --- Technologies API ---
@app.get("/technologies", response_model=List[schemas.Technology])
def read_technologies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_technologies(db, skip=skip, limit=limit)

@app.get("/technologies/{tech_id}", response_model=schemas.Technology)
def read_technology(tech_id: int, db: Session = Depends(get_db)):
    db_tech = crud.get_technology(db, tech_id=tech_id)
    if not db_tech:
        raise HTTPException(status_code=404, detail="Technology not found")
    return db_tech

@app.get("/technologies/slug/{slug}", response_model=schemas.Technology)
def read_technology_by_slug(slug: str, db: Session = Depends(get_db)):
    db_tech = crud.get_technology_by_slug(db, slug=slug)
    if not db_tech:
        raise HTTPException(status_code=404, detail="Technology not found")
    return db_tech

@app.post("/technologies", response_model=schemas.Technology)
def create_technology(tech: schemas.TechnologyCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_technology(db=db, tech=tech)

@app.put("/technologies/{tech_id}", response_model=schemas.Technology)
def update_technology(tech_id: int, tech: schemas.TechnologyCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_tech = crud.update_technology(db=db, tech_id=tech_id, tech=tech)
    if not db_tech:
        raise HTTPException(status_code=404, detail="Technology not found")
    return db_tech

@app.delete("/technologies/{tech_id}")
def delete_technology(tech_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_tech = crud.delete_technology(db=db, tech_id=tech_id)
    if not db_tech:
        raise HTTPException(status_code=404, detail="Technology not found")
    return {"message": "Technology deleted successfully"}

# --- Contact API ---

@app.get("/contact/settings", response_model=schemas.ContactSetting)
def get_contact_settings(db: Session = Depends(get_db)):
    settings = crud.get_contact_settings(db)
    if not settings:
        raise HTTPException(status_code=404, detail="Contact settings not found")
    return settings

@app.put("/contact/settings", response_model=schemas.ContactSetting)
def update_contact_settings(settings: schemas.ContactSettingCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.update_contact_settings(db=db, settings=settings)

@app.post("/contact/messages", response_model=schemas.ContactMessage)
def create_contact_message(message: schemas.ContactMessageCreate, db: Session = Depends(get_db)):
    # Save the message
    saved_msg = crud.create_contact_message(db=db, message=message)
    
    # Notify admin via email
    try:
        send_contact_form_notification_email(
            full_name=message.full_name,
            email=message.email,
            phone=message.phone,
            company=message.company_name,
            project_type=message.project_type,
            message=message.message_body
        )
    except Exception as e:
        print(f"Failed to send contact email notification: {e}")
        
    return saved_msg

@app.get("/contact/messages", response_model=List[schemas.ContactMessage])
def get_contact_messages(db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.get_contact_messages(db)

@app.put("/contact/messages/{message_id}/read", response_model=schemas.ContactMessage)
def mark_message_read(message_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_msg = crud.mark_message_read(db, message_id=message_id)
    if not db_msg:
        raise HTTPException(status_code=404, detail="Message not found")
    return db_msg

@app.delete("/contact/messages/{message_id}", response_model=schemas.ContactMessage)
def delete_contact_message(message_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_msg = crud.delete_contact_message(db, message_id=message_id)
    if not db_msg:
        raise HTTPException(status_code=404, detail="Message not found")
    return db_msg

# --- About Us API ---

@app.get("/about", response_model=schemas.AboutFullResponse)
def get_about_full(db: Session = Depends(get_db)):
    content = crud.get_about_content(db)
    if not content:
        # Create default content if it doesn't exist
        content = crud.update_about_content(db, schemas.AboutContentCreate(hero_title="About Us"))
    
    return {
        "content": content,
        "team": crud.get_team_members(db),
        "values": crud.get_company_values(db),
        "differentiators": crud.get_differentiators(db),
        "testimonials": crud.get_testimonials(db)
    }

@app.get("/about/content", response_model=schemas.AboutContent)
def get_about_content(db: Session = Depends(get_db)):
    content = crud.get_about_content(db)
    if not content:
        raise HTTPException(status_code=404, detail="About content not found")
    return content

@app.put("/about/content", response_model=schemas.AboutContent)
async def update_about_content(
    hero_title: str = Form(...),
    hero_subtitle: Optional[str] = Form(None),
    hero_description: Optional[str] = Form(None),
    hero_year: Optional[str] = Form(None),
    hero_image_main: Optional[str] = Form(None),
    hero_image_sub: Optional[str] = Form(None),
    highlights: str = Form("[]"),
    core_pills: str = Form("[]"),
    mission_text: Optional[str] = Form(None),
    vision_text: Optional[str] = Form(None),
    values_title: Optional[str] = Form(None),
    values_description: Optional[str] = Form(None),
    why_us_title: Optional[str] = Form(None),
    why_us_description: Optional[str] = Form(None),
    why_us_years_excellence: Optional[str] = Form(None),
    why_us_image: Optional[str] = Form(None),
    advantages: str = Form("[]"),
    team_title: Optional[str] = Form(None),
    team_subtitle: Optional[str] = Form(None),
    hero_main_file: Optional[UploadFile] = File(None),
    hero_sub_file: Optional[UploadFile] = File(None),
    why_us_file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    import json
    import time
    
    # Handle Hero Main Image
    if hero_main_file and hero_main_file.filename:
        ext = os.path.splitext(hero_main_file.filename)[1]
        filename = f"about_hero_main_{int(time.time())}{ext}"
        file_path = ABOUT_UPLOADS_DIR / filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(hero_main_file.file, buffer)
        hero_image_main = f"/api/uploads/about/{filename}"

    # Handle Hero Sub Image
    if hero_sub_file and hero_sub_file.filename:
        ext = os.path.splitext(hero_sub_file.filename)[1]
        filename = f"about_hero_sub_{int(time.time())}{ext}"
        file_path = ABOUT_UPLOADS_DIR / filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(hero_sub_file.file, buffer)
        hero_image_sub = f"/api/uploads/about/{filename}"

    # Handle Why Us Image
    if why_us_file and why_us_file.filename:
        ext = os.path.splitext(why_us_file.filename)[1]
        filename = f"about_why_us_{int(time.time())}{ext}"
        file_path = ABOUT_UPLOADS_DIR / filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(why_us_file.file, buffer)
        why_us_image = f"/api/uploads/about/{filename}"

    # Parse JSON fields
    try:
        highlights_list = json.loads(highlights)
        advantages_list = json.loads(advantages)
        pills_list = json.loads(core_pills)
    except:
        highlights_list = []
        advantages_list = []
        pills_list = []

    about_data = schemas.AboutContentCreate(
        hero_title=hero_title,
        hero_subtitle=hero_subtitle,
        hero_description=hero_description,
        hero_year=hero_year,
        hero_image_main=hero_image_main,
        hero_image_sub=hero_image_sub,
        highlights=highlights_list,
        core_pills=pills_list,
        mission_text=mission_text,
        vision_text=vision_text,
        values_title=values_title,
        values_description=values_description,
        why_us_title=why_us_title,
        why_us_description=why_us_description,
        why_us_years_excellence=why_us_years_excellence,
        why_us_image=why_us_image,
        advantages=advantages_list,
        team_title=team_title,
        team_subtitle=team_subtitle
    )
    return crud.update_about_content(db=db, about=about_data)

# Testimonial Endpoints
@app.get("/about/testimonials", response_model=List[schemas.Testimonial])
def get_testimonials(db: Session = Depends(get_db)):
    return crud.get_testimonials(db)

@app.post("/about/testimonials", response_model=schemas.Testimonial)
def create_testimonial(testimonial: schemas.TestimonialCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_testimonial(db, testimonial)

@app.put("/about/testimonials/{testimonial_id}", response_model=schemas.Testimonial)
def update_testimonial(testimonial_id: int, testimonial: schemas.TestimonialCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.update_testimonial(db, testimonial_id, testimonial)

@app.delete("/about/testimonials/{testimonial_id}")
def delete_testimonial(testimonial_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    res = crud.delete_testimonial(db, testimonial_id)
    if not res:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted"}

# Team Member Endpoints
@app.get("/about/team", response_model=List[schemas.TeamMember])
def get_team_members(db: Session = Depends(get_db)):
    return crud.get_team_members(db)

@app.post("/about/team", response_model=schemas.TeamMember)
async def create_team_member(
    name: str = Form(...),
    role: str = Form(...),
    bio: Optional[str] = Form(None),
    linkedin: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    order: int = Form(0),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    image_filename = None
    if image and image.filename:
        ext = os.path.splitext(image.filename)[1]
        image_filename = f"team_{name.replace(' ', '_')}_{int(os.path.getmtime(os.getcwd()) if os.name != 'nt' else 0)}{ext}"
        # A more robust filename
        import time
        image_filename = f"team_{int(time.time())}{ext}"
        file_path = ABOUT_UPLOADS_DIR / image_filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        image_filename = f"/api/uploads/about/{image_filename}"

    member_data = schemas.TeamMemberCreate(
        name=name, role=role, bio=bio, image=image_filename,
        linkedin=linkedin, email=email, order=order
    )
    return crud.create_team_member(db, member_data)

@app.put("/about/team/{member_id}", response_model=schemas.TeamMember)
async def update_team_member(
    member_id: int,
    name: str = Form(...),
    role: str = Form(...),
    bio: Optional[str] = Form(None),
    linkedin: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    order: int = Form(0),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    member = db.query(models.TeamMember).filter(models.TeamMember.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    image_filename = member.image
    if image and image.filename:
        import time
        ext = os.path.splitext(image.filename)[1]
        new_filename = f"team_{int(time.time())}{ext}"
        file_path = ABOUT_UPLOADS_DIR / new_filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        image_filename = f"/api/uploads/about/{new_filename}"

    member_data = schemas.TeamMemberCreate(
        name=name, role=role, bio=bio, image=image_filename,
        linkedin=linkedin, email=email, order=order
    )
    return crud.update_team_member(db, member_id, member_data)

@app.delete("/about/team/{member_id}")
def delete_team_member(member_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    member = crud.delete_team_member(db, member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    return {"message": "Team member deleted"}

# Company Values
@app.post("/about/values", response_model=schemas.ValueIndicator)
def create_company_value(val: schemas.ValueIndicatorCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_company_value(db, val)

@app.put("/about/values/{val_id}", response_model=schemas.ValueIndicator)
def update_company_value(val_id: int, val: schemas.ValueIndicatorCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.update_company_value(db, val_id, val)

@app.delete("/about/values/{val_id}")
def delete_company_value(val_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    val = crud.delete_company_value(db, val_id)
    if not val:
        raise HTTPException(status_code=404, detail="Value indicator not found")
    return {"message": "Value indicator deleted"}

# Differentiators
@app.post("/about/differentiators", response_model=schemas.Differentiator)
def create_differentiator(diff: schemas.DifferentiatorCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_differentiator(db, diff)

@app.put("/about/differentiators/{diff_id}", response_model=schemas.Differentiator)
def update_differentiator(diff_id: int, diff: schemas.DifferentiatorCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.update_differentiator(db, diff_id, diff)

@app.delete("/about/differentiators/{diff_id}")
def delete_differentiator(diff_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    diff = crud.delete_differentiator(db, diff_id)
    if not diff:
        raise HTTPException(status_code=404, detail="Differentiator not found")
    return {"message": "Differentiator deleted"}

# --- Home Hero API ---
@app.get("/home/hero", response_model=List[schemas.HomeHeroSlide])
def get_home_hero_slides(db: Session = Depends(get_db)):
    return crud.get_home_hero_slides(db)

@app.post("/home/hero", response_model=schemas.HomeHeroSlide)
async def create_home_hero_slide(
    small_text: str = Form(...),
    heading: str = Form(...),
    sub_text: Optional[str] = Form(None),
    button_text: Optional[str] = Form(None),
    button_link: Optional[str] = Form(None),
    media_type: str = Form("video"),
    media_file: Optional[UploadFile] = File(None),
    order: int = Form(0),
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    media_url = ""
    if media_file and media_file.filename:
        import time
        ext = os.path.splitext(media_file.filename)[1]
        filename = f"hero_{int(time.time())}{ext}"
        file_path = HERO_UPLOADS_DIR / filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(media_file.file, buffer)
        media_url = f"/api/uploads/hero/{filename}"
        # Auto-detect media type if not provided or to ensure accuracy
        if ext.lower() in [".mp4", ".webm", ".ogg"]:
            media_type = "video"
        elif ext.lower() in [".jpg", ".jpeg", ".png", ".webp", ".gif"]:
            media_type = "image"
    
    slide_data = schemas.HomeHeroSlideCreate(
        small_text=small_text,
        heading=heading,
        sub_text=sub_text,
        button_text=button_text,
        button_link=button_link,
        media_type=media_type,
        media_url=media_url,
        order=order
    )
    return crud.create_home_hero_slide(db, slide_data)

@app.put("/home/hero/{slide_id}", response_model=schemas.HomeHeroSlide)
async def update_home_hero_slide(
    slide_id: int,
    small_text: str = Form(...),
    heading: str = Form(...),
    sub_text: Optional[str] = Form(None),
    button_text: Optional[str] = Form(None),
    button_link: Optional[str] = Form(None),
    media_type: str = Form("video"),
    media_url: Optional[str] = Form(None),
    media_file: Optional[UploadFile] = File(None),
    order: int = Form(0),
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    if media_file and media_file.filename:
        import time
        ext = os.path.splitext(media_file.filename)[1]
        filename = f"hero_{int(time.time())}{ext}"
        file_path = HERO_UPLOADS_DIR / filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(media_file.file, buffer)
        media_url = f"/api/uploads/hero/{filename}"
        if ext.lower() in [".mp4", ".webm", ".ogg"]:
            media_type = "video"
        elif ext.lower() in [".jpg", ".jpeg", ".png", ".webp", ".gif"]:
            media_type = "image"

    slide_data = schemas.HomeHeroSlideCreate(
        small_text=small_text,
        heading=heading,
        sub_text=sub_text,
        button_text=button_text,
        button_link=button_link,
        media_type=media_type,
        media_url=media_url,
        order=order
    )
    db_slide = crud.update_home_hero_slide(db, slide_id, slide_data)
    if not db_slide:
        raise HTTPException(status_code=404, detail="Slide not found")
    return db_slide

@app.delete("/home/hero/{slide_id}")
def delete_home_hero_slide(slide_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    crud.delete_home_hero_slide(db, slide_id)
    return {"message": "Slide deleted successfully"}

# --- Home About API ---
@app.get("/home/about", response_model=schemas.HomeAboutContent)
def get_home_about_content(db: Session = Depends(get_db)):
    content = crud.get_home_about_content(db)
    if not content:
        # Create default content to avoid 404 on first load
        content = crud.update_home_about_content(db, schemas.HomeAboutContentCreate(heading="Welcome to Reva"))
    return content

@app.put("/home/about", response_model=schemas.HomeAboutContent)
async def update_home_about_content(
    description: str = Form(...),
    heading: str = Form(""),
    highlight_text: Optional[str] = Form(None),
    image_main: Optional[str] = Form(None),
    image_sub: Optional[str] = Form(None),
    label: Optional[str] = Form(None),
    pillars: str = Form("[]"),
    stat_text: Optional[str] = Form(None),
    stat_year: Optional[str] = Form(None),
    sub_heading: Optional[str] = Form(None),
    main_file: Optional[UploadFile] = File(None),
    sub_file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    import json
    import time
    
    # Handle Primary Image Upload
    if main_file and main_file.filename:
        ext = os.path.splitext(main_file.filename)[1]
        filename = f"about_main_{int(time.time())}{ext}"
        file_path = ABOUT_UPLOADS_DIR / filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(main_file.file, buffer)
        image_main = f"/api/uploads/about/{filename}"
        
    # Handle Secondary Image Upload
    if sub_file and sub_file.filename:
        ext = os.path.splitext(sub_file.filename)[1]
        filename = f"about_sub_{int(time.time())}{ext}"
        file_path = ABOUT_UPLOADS_DIR / filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(sub_file.file, buffer)
        image_sub = f"/api/uploads/about/{filename}"

    # Parse pillars from JSON string
    try:
        pillars_list = json.loads(pillars)
    except:
        pillars_list = []

    about_data = schemas.HomeAboutContentCreate(
        label=label,
        heading=heading,
        sub_heading=sub_heading,
        description=description,
        highlight_text=highlight_text,
        pillars=pillars_list,
        stat_year=stat_year,
        stat_text=stat_text,
        image_main=image_main,
        image_sub=image_sub
    )
    return crud.update_home_about_content(db, about_data)

# --- Strategic Advice API ---
@app.get("/home/strategic-advice", response_model=schemas.StrategicAdvice)
def get_strategic_advice(db: Session = Depends(get_db)):
    content = crud.get_strategic_advice(db)
    if not content:
        content = crud.update_strategic_advice(db, schemas.StrategicAdviceCreate(heading="Strategic Advice"))
    return content

@app.put("/home/strategic-advice", response_model=schemas.StrategicAdvice)
async def update_strategic_advice(
    label: Optional[str] = Form(None),
    heading: Optional[str] = Form(None),
    sub_heading: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    features: str = Form("[]"),
    image: Optional[str] = Form(None),
    exp_year: Optional[str] = Form(None),
    exp_text: Optional[str] = Form(None),
    strategic_file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    import json
    import time

    # Handle Image Upload
    if strategic_file and strategic_file.filename:
        ext = os.path.splitext(strategic_file.filename)[1]
        filename = f"about_strategic_{int(time.time())}{ext}"
        file_path = ABOUT_UPLOADS_DIR / filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(strategic_file.file, buffer)
        image = f"/api/uploads/about/{filename}"

    # Parse features from JSON string
    try:
        features_list = json.loads(features)
    except:
        features_list = []

    advice_data = schemas.StrategicAdviceCreate(
        label=label,
        heading=heading,
        sub_heading=sub_heading,
        description=description,
        features=features_list,
        image=image,
        exp_year=exp_year,
        exp_text=exp_text
    )
    return crud.update_strategic_advice(db, advice_data)

# --- Legal Content APIs ---
@app.get("/legal/{type}", response_model=schemas.LegalContent)
def get_legal_content(type: str, db: Session = Depends(get_db)):
    content = crud.get_legal_content(db, type)
    if not content:
        # Return a blank structure if not found to avoid 404 in frontend
        return schemas.LegalContent(type=type, title=type.capitalize(), sections=[], last_updated="Not set")
    return content

@app.put("/legal/{type}", response_model=schemas.LegalContent)
def update_legal_content(
    type: str, 
    data: schemas.LegalContentCreate, 
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    return crud.update_legal_content(db, type, data)

# --- Site Settings APIs ---
@app.get("/settings", response_model=schemas.SiteSettings)
def get_site_settings(db: Session = Depends(get_db)):
    return crud.get_site_settings(db)

@app.put("/settings", response_model=schemas.SiteSettings)
def update_site_settings(
    data: schemas.SiteSettingsCreate, 
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    return crud.update_site_settings(db, data)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
