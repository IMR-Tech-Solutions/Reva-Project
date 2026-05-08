from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form, APIRouter
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

app = FastAPI(title="Reva API", debug=True,description="Dynamic Backend for Reva Project")
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

SERVICES_UPLOADS_DIR = Path(__file__).parent / "uploads" / "services"
SERVICES_UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

TECHNOLOGIES_UPLOADS_DIR = Path(__file__).parent / "uploads" / "technologies"
TECHNOLOGIES_UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

# Static files serving for uploaded images
from fastapi.staticfiles import StaticFiles
app.mount("/api/uploads", StaticFiles(directory=Path(__file__).parent / "uploads"), name="uploads")

# --- API Router Setup ---
api_router = APIRouter()

@api_router.get("/")
async def root():
    return {"message": "Welcome to the Reva API"}

@api_router.get("/health")
async def health():
    return {"status": "healthy"}

# --- Auth Dependencies ---
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

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
@api_router.post("/auth/login", response_model=schemas.Token)
def login_for_access_token(login_data: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=login_data.email)
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect password or not found user",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "user": user}

@api_router.post("/auth/register", response_model=schemas.UserRead)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_admin_user(db=db, user=user)

@api_router.get("/auth/me", response_model=schemas.UserRead)
async def read_users_me(current_user: models.AdminUser = Depends(get_current_active_admin)):
    return current_user

@api_router.get("/auth/stats", response_model=schemas.AdminDashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.get_admin_dashboard_stats(db)

# --- News API ---
@api_router.get("/news", response_model=List[schemas.News])
def read_news(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    news_articles = crud.get_news(db, skip=skip, limit=limit)
    return news_articles

@api_router.post("/news", response_model=schemas.News)
def create_news_article(news: schemas.NewsCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_news(db=db, news=news)

@api_router.get("/news/{news_id}", response_model=schemas.News)
def read_news_article(news_id: int, db: Session = Depends(get_db)):
    db_news = db.query(models.NewsArticle).filter(models.NewsArticle.id == news_id).first()
    if not db_news:
        raise HTTPException(status_code=404, detail="News article not found")
    return db_news

@api_router.get("/news/slug/{slug}", response_model=schemas.News)
def read_news_article_by_slug(slug: str, db: Session = Depends(get_db)):
    db_news = db.query(models.NewsArticle).filter(models.NewsArticle.slug == slug).first()
    if not db_news:
        raise HTTPException(status_code=404, detail="News article not found")
    return db_news

@api_router.put("/news/{news_id}", response_model=schemas.News)
def update_news_article(news_id: int, news: schemas.NewsCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_news = crud.update_news(db=db, news_id=news_id, news=news)
    if not db_news:
        raise HTTPException(status_code=404, detail="News article not found")
    return db_news

@api_router.delete("/news/{news_id}")
def delete_news_article(news_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_news = crud.delete_news(db=db, news_id=news_id)
    if not db_news:
        raise HTTPException(status_code=404, detail="News article not found")
    return {"message": "News article deleted successfully"}

# --- Career Positions API ---
@api_router.get("/career/positions", response_model=List[schemas.CareerPosition])
def read_career_positions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    positions = crud.get_career_positions(db, skip=skip, limit=limit)
    return positions

@api_router.post("/career/positions", response_model=schemas.CareerPosition)
def create_career_position(position: schemas.CareerPositionCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_career_position(db=db, position=position)

@api_router.put("/career/positions/{position_id}", response_model=schemas.CareerPosition)
def update_career_position(position_id: int, position: schemas.CareerPositionCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_position = crud.update_career_position(db=db, position_id=position_id, position=position)
    if not db_position:
        raise HTTPException(status_code=404, detail="Position not found")
    return db_position

@api_router.delete("/career/positions/{position_id}")
def delete_career_position(position_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_position = crud.delete_career_position(db=db, position_id=position_id)
    if not db_position:
        raise HTTPException(status_code=404, detail="Position not found")
    return {"message": "Position deleted successfully"}

# --- Career Applications API ---
@api_router.get("/career/applications", response_model=List[schemas.CareerApplication])
def read_career_applications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    applications = crud.get_career_applications(db, skip=skip, limit=limit)
    return applications

@api_router.post("/career/applications", response_model=schemas.CareerApplication)
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

@api_router.patch("/career/applications/{application_id}/status", response_model=schemas.CareerApplication)
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

@api_router.delete("/career/applications/{application_id}")
def delete_career_application(application_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_application = crud.delete_career_application(db=db, application_id=application_id)
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"message": "Application deleted successfully"}

# Career Page Content Endpoints
@api_router.get("/career/content", response_model=schemas.CareerContent)
def get_career_content(db: Session = Depends(get_db)):
    return crud.get_career_content(db)

@api_router.put("/career/content", response_model=schemas.CareerContent)
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

@api_router.get("/career/applications/{application_id}/download-resume")
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
@api_router.get("/products", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_products(db, skip=skip, limit=limit)

@api_router.get("/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db, product_id=product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@api_router.get("/products/path/{path:path}", response_model=schemas.Product)
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

@api_router.post("/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_product(db=db, product=product)

@api_router.put("/products/{product_id}", response_model=schemas.Product)
def update_product(product_id: int, product: schemas.ProductCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_product = crud.update_product(db=db, product_id=product_id, product=product)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@api_router.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_product = crud.delete_product(db=db, product_id=product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

# --- Technologies API ---
@api_router.get("/technologies", response_model=List[schemas.Technology])
def read_technologies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_technologies(db, skip=skip, limit=limit)

@api_router.get("/technologies/{tech_id}", response_model=schemas.Technology)
def read_technology(tech_id: int, db: Session = Depends(get_db)):
    db_tech = crud.get_technology(db, tech_id=tech_id)
    if not db_tech:
        raise HTTPException(status_code=404, detail="Technology not found")
    return db_tech

@api_router.get("/technologies/slug/{slug}", response_model=schemas.Technology)
def read_technology_by_slug(slug: str, db: Session = Depends(get_db)):
    db_tech = crud.get_technology_by_slug(db, slug=slug)
    if not db_tech:
        raise HTTPException(status_code=404, detail="Technology not found")
    return db_tech

@api_router.post("/technologies", response_model=schemas.Technology)
def create_technology(tech: schemas.TechnologyCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_technology(db=db, tech=tech)

@api_router.put("/technologies/{tech_id}", response_model=schemas.Technology)
def update_technology(tech_id: int, tech: schemas.TechnologyCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_tech = crud.update_technology(db=db, tech_id=tech_id, tech=tech)
    if not db_tech:
        raise HTTPException(status_code=404, detail="Technology not found")
    return db_tech

@api_router.delete("/technologies/{tech_id}")
def delete_technology(tech_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_tech = crud.delete_technology(db=db, tech_id=tech_id)
    if not db_tech:
        raise HTTPException(status_code=404, detail="Technology not found")
    return {"message": "Technology deleted successfully"}

# --- Contact API ---

@api_router.get("/contact/settings", response_model=schemas.ContactSetting)
def get_contact_settings(db: Session = Depends(get_db)):
    settings = crud.get_contact_settings(db)
    if not settings:
        raise HTTPException(status_code=404, detail="Contact settings not found")
    return settings

@api_router.put("/contact/settings", response_model=schemas.ContactSetting)
def update_contact_settings(settings: schemas.ContactSettingCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.update_contact_settings(db=db, settings=settings)

@api_router.post("/contact/messages", response_model=schemas.ContactMessage)
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

@api_router.get("/contact/messages", response_model=List[schemas.ContactMessage])
def get_contact_messages(db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.get_contact_messages(db)

@api_router.put("/contact/messages/{message_id}/read", response_model=schemas.ContactMessage)
def mark_message_read(message_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_msg = crud.mark_message_read(db, message_id=message_id)
    if not db_msg:
        raise HTTPException(status_code=404, detail="Message not found")
    return db_msg

@api_router.delete("/contact/messages/{message_id}", response_model=schemas.ContactMessage)
def delete_contact_message(message_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    db_msg = crud.delete_contact_message(db, message_id=message_id)
    if not db_msg:
        raise HTTPException(status_code=404, detail="Message not found")
    return db_msg

# --- About Us API ---

@api_router.get("/about", response_model=schemas.AboutFullResponse)
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

@api_router.get("/about/content", response_model=schemas.AboutContent)
def get_about_content(db: Session = Depends(get_db)):
    content = crud.get_about_content(db)
    if not content:
        raise HTTPException(status_code=404, detail="About content not found")
    return content

@api_router.put("/about/content", response_model=schemas.AboutContent)
async def update_about_content(
    hero_label: Optional[str] = Form(None),
    hero_title: str = Form(...),
    hero_highlight: Optional[str] = Form(None),
    hero_subtitle: Optional[str] = Form(None),
    hero_description: Optional[str] = Form(None),
    hero_description2: Optional[str] = Form(None),
    hero_year: Optional[str] = Form(None),
    hero_year_text: Optional[str] = Form(None),
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
        hero_label=hero_label,
        hero_title=hero_title,
        hero_highlight=hero_highlight,
        hero_subtitle=hero_subtitle,
        hero_description=hero_description,
        hero_description2=hero_description2,
        hero_year=hero_year,
        hero_year_text=hero_year_text,
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
@api_router.get("/about/testimonials", response_model=List[schemas.Testimonial])
def get_testimonials(db: Session = Depends(get_db)):
    return crud.get_testimonials(db)

@api_router.post("/about/testimonials", response_model=schemas.Testimonial)
def create_testimonial(testimonial: schemas.TestimonialCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_testimonial(db, testimonial)

@api_router.put("/about/testimonials/{testimonial_id}", response_model=schemas.Testimonial)
def update_testimonial(testimonial_id: int, testimonial: schemas.TestimonialCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.update_testimonial(db, testimonial_id, testimonial)

@api_router.delete("/about/testimonials/{testimonial_id}")
def delete_testimonial(testimonial_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    res = crud.delete_testimonial(db, testimonial_id)
    if not res:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted"}

# Team Member Endpoints
@api_router.get("/about/team", response_model=List[schemas.TeamMember])
def get_team_members(db: Session = Depends(get_db)):
    return crud.get_team_members(db)

@api_router.post("/about/team", response_model=schemas.TeamMember)
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

@api_router.put("/about/team/{member_id}", response_model=schemas.TeamMember)
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

@api_router.delete("/about/team/{member_id}")
def delete_team_member(member_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    member = crud.delete_team_member(db, member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    return {"message": "Team member deleted"}

# Company Values
@api_router.post("/about/values", response_model=schemas.ValueIndicator)
def create_company_value(val: schemas.ValueIndicatorCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_company_value(db, val)

@api_router.put("/about/values/{val_id}", response_model=schemas.ValueIndicator)
def update_company_value(val_id: int, val: schemas.ValueIndicatorCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.update_company_value(db, val_id, val)

@api_router.delete("/about/values/{val_id}")
def delete_company_value(val_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    val = crud.delete_company_value(db, val_id)
    if not val:
        raise HTTPException(status_code=404, detail="Value indicator not found")
    return {"message": "Value indicator deleted"}

# Differentiators
@api_router.post("/about/differentiators", response_model=schemas.Differentiator)
def create_differentiator(diff: schemas.DifferentiatorCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_differentiator(db, diff)

@api_router.put("/about/differentiators/{diff_id}", response_model=schemas.Differentiator)
def update_differentiator(diff_id: int, diff: schemas.DifferentiatorCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.update_differentiator(db, diff_id, diff)

@api_router.delete("/about/differentiators/{diff_id}")
def delete_differentiator(diff_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    diff = crud.delete_differentiator(db, diff_id)
    if not diff:
        raise HTTPException(status_code=404, detail="Differentiator not found")
    return {"message": "Differentiator deleted"}

# --- Home Hero API ---
@api_router.get("/home/hero", response_model=List[schemas.HomeHeroSlide])
def get_home_hero_slides(db: Session = Depends(get_db)):
    return crud.get_home_hero_slides(db)

@api_router.post("/home/hero", response_model=schemas.HomeHeroSlide)
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

@api_router.put("/home/hero/{slide_id}", response_model=schemas.HomeHeroSlide)
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

@api_router.delete("/home/hero/{slide_id}")
def delete_home_hero_slide(slide_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    crud.delete_home_hero_slide(db, slide_id)
    return {"message": "Slide deleted successfully"}

# --- Home About API ---
@api_router.get("/home/about", response_model=schemas.HomeAboutContent)
def get_home_about_content(db: Session = Depends(get_db)):
    content = crud.get_home_about_content(db)
    if not content:
        # Create default content to avoid 404 on first load
        content = crud.update_home_about_content(db, schemas.HomeAboutContentCreate(heading="Welcome to Reva"))
    return content

@api_router.put("/home/about", response_model=schemas.HomeAboutContent)
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
@api_router.get("/home/strategic-advice", response_model=schemas.StrategicAdvice)
def get_strategic_advice(db: Session = Depends(get_db)):
    content = crud.get_strategic_advice(db)
    if not content:
        content = crud.update_strategic_advice(db, schemas.StrategicAdviceCreate(heading="Strategic Advice"))
    return content

@api_router.put("/home/strategic-advice", response_model=schemas.StrategicAdvice)
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
@api_router.get("/legal/{type}", response_model=schemas.LegalContent)
def get_legal_content(type: str, db: Session = Depends(get_db)):
    content = crud.get_legal_content(db, type)
    if not content:
        # Return a blank structure if not found to avoid 404 in frontend
        return schemas.LegalContent(type=type, title=type.capitalize(), sections=[], last_updated="Not set")
    return content

@api_router.put("/legal/{type}", response_model=schemas.LegalContent)
def update_legal_content(
    type: str, 
    data: schemas.LegalContentCreate, 
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    return crud.update_legal_content(db, type, data)

# --- Site Settings APIs ---
@api_router.get("/settings", response_model=schemas.SiteSettings)
def get_site_settings(db: Session = Depends(get_db)):
    return crud.get_site_settings(db)

@api_router.put("/settings", response_model=schemas.SiteSettings)
def update_site_settings(
    data: schemas.SiteSettingsCreate, 
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    return crud.update_site_settings(db, data)

# =====================================================================
# SERVICES MODULE API
# =====================================================================

# --- Public Endpoints ---
@api_router.get("/services", response_model=List[schemas.ServiceCard])
def get_active_services(db: Session = Depends(get_db)):
    """Public: Get all active services for the All Services page"""
    return crud.get_active_services(db)

@api_router.get("/services/{slug}", response_model=schemas.ServiceFull)
def get_service_by_slug(slug: str, db: Session = Depends(get_db)):
    """Public: Get a single service with all sections and items"""
    service = crud.get_service_by_slug(db, slug)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

# --- Admin Service Endpoints ---
@api_router.get("/admin/services", response_model=List[schemas.ServiceAdmin])
def admin_get_all_services(db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    """Admin: Get all services including inactive"""
    return crud.get_all_services(db)

@api_router.get("/admin/services/{service_id}", response_model=schemas.ServiceFull)
def admin_get_service(service_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    """Admin: Get single service with sections and items"""
    service = crud.get_service_by_id(db, service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@api_router.post("/admin/services", response_model=schemas.ServiceAdmin)
def admin_create_service(service: schemas.ServiceCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_service(db, service.model_dump())

@api_router.put("/admin/services/{service_id}", response_model=schemas.ServiceAdmin)
def admin_update_service(service_id: int, service: schemas.ServiceUpdate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    result = crud.update_service(db, service_id, service.model_dump(exclude_unset=True))
    if not result:
        raise HTTPException(status_code=404, detail="Service not found")
    return result

@api_router.delete("/admin/services/{service_id}")
def admin_delete_service(service_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    result = crud.delete_service(db, service_id)
    if not result:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service deleted successfully"}

@api_router.put("/admin/services/reorder")
def admin_reorder_services(ordered_ids: List[int], db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    crud.reorder_services(db, ordered_ids)
    return {"message": "Services reordered successfully"}

# --- Admin Section Endpoints ---
@api_router.post("/admin/services/{service_id}/sections", response_model=schemas.ServiceSection)
def admin_create_section(service_id: int, section: schemas.ServiceSectionCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_section(db, service_id, section.model_dump())

@api_router.put("/admin/sections/{section_id}", response_model=schemas.ServiceSection)
def admin_update_section(section_id: int, section: schemas.ServiceSectionCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    result = crud.update_section(db, section_id, section.model_dump(exclude_unset=True))
    if not result:
        raise HTTPException(status_code=404, detail="Section not found")
    return result

@api_router.delete("/admin/sections/{section_id}")
def admin_delete_section(section_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    result = crud.delete_section(db, section_id)
    if not result:
        raise HTTPException(status_code=404, detail="Section not found")
    return {"message": "Section deleted successfully"}

@api_router.put("/admin/services/{service_id}/sections/reorder")
def admin_reorder_sections(service_id: int, ordered_ids: List[int], db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    crud.reorder_sections(db, service_id, ordered_ids)
    return {"message": "Sections reordered successfully"}

# --- Admin Item Endpoints ---
@api_router.post("/admin/sections/{section_id}/items", response_model=schemas.SectionItem)
def admin_create_item(section_id: int, item: schemas.SectionItemCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    return crud.create_item(db, section_id, item.model_dump())

@api_router.put("/admin/items/{item_id}", response_model=schemas.SectionItem)
def admin_update_item(item_id: int, item: schemas.SectionItemCreate, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    result = crud.update_item(db, item_id, item.model_dump(exclude_unset=True))
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")
    return result

@api_router.delete("/admin/items/{item_id}")
def admin_delete_item(item_id: int, db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    result = crud.delete_item(db, item_id)
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted successfully"}

# --- Service Image Upload ---
@api_router.post("/admin/services/upload-image")
async def upload_service_image(
    image: UploadFile = File(...),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    """Upload an image for use in services (hero, section, etc.)"""
    import time
    ext = os.path.splitext(image.filename)[1]
    filename = f"service_{int(time.time())}{ext}"
    file_path = SERVICES_UPLOADS_DIR / filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    url = f"/api/uploads/services/{filename}"
    return {"url": url, "filename": filename}

@api_router.post("/admin/technologies/upload-image")
async def upload_technology_image(
    image: UploadFile = File(...),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    """Upload an image for use in technologies"""
    import time
    ext = os.path.splitext(image.filename)[1]
    filename = f"tech_{int(time.time())}{ext}"
    file_path = TECHNOLOGIES_UPLOADS_DIR / filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    url = f"/api/uploads/technologies/{filename}"
    return {"url": url, "filename": filename}

# =====================================================================
# WHAT SETS US APART API — About Page Section
# =====================================================================

@api_router.get("/about/what-sets-us-apart", response_model=schemas.WhatSetsUsApartFullResponse)
def get_what_sets_us_apart(db: Session = Depends(get_db)):
    """Public: Get the What Sets Us Apart section content and active items."""
    content = crud.get_wsua_content(db)
    items = crud.get_wsua_items(db, active_only=True)
    return {"content": content, "items": items}

@api_router.put("/about/what-sets-us-apart", response_model=schemas.WhatSetsUsApartContent)
def update_what_sets_us_apart_content(
    data: schemas.WhatSetsUsApartContentCreate,
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    """Admin: Update the main section content (label, heading, description)."""
    return crud.update_wsua_content(db, data)

@api_router.get("/about/what-sets-us-apart/items", response_model=List[schemas.WhatSetsUsApartItem])
def get_what_sets_us_apart_items(db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    """Admin: Get ALL items (including inactive) for dashboard management."""
    return crud.get_wsua_items(db, active_only=False)

@api_router.post("/about/what-sets-us-apart/items", response_model=schemas.WhatSetsUsApartItem)
def create_what_sets_us_apart_item(
    item: schemas.WhatSetsUsApartItemCreate,
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    """Admin: Create a new feature point."""
    return crud.create_wsua_item(db, item)

@api_router.put("/about/what-sets-us-apart/items/{item_id}", response_model=schemas.WhatSetsUsApartItem)
def update_what_sets_us_apart_item(
    item_id: int,
    item: schemas.WhatSetsUsApartItemCreate,
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    """Admin: Update an existing feature point."""
    db_item = crud.update_wsua_item(db, item_id, item)
    if not db_item:
        raise HTTPException(status_code=404, detail="Feature item not found")
    return db_item

@api_router.delete("/about/what-sets-us-apart/items/{item_id}")
def delete_what_sets_us_apart_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    """Admin: Delete a feature point."""
    db_item = crud.delete_wsua_item(db, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Feature item not found")
    return {"message": "Feature item deleted successfully"}


# =====================================================================
# WORK IN ACTION API — Home Page Section
# =====================================================================

@api_router.get("/home/work-in-action", response_model=schemas.WorkInActionFullResponse)
def get_work_in_action(db: Session = Depends(get_db)):
    """Public: Get the Work In Action section content and active items."""
    content = crud.get_work_in_action_content(db)
    items = crud.get_work_in_action_items(db, active_only=True)
    return {"content": content, "items": items}

@api_router.put("/home/work-in-action", response_model=schemas.WorkInActionContent)
def update_work_in_action_content(
    data: schemas.WorkInActionContentCreate,
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    """Admin: Update the main section content (label, heading, description, etc.)."""
    return crud.update_work_in_action_content(db, data)

@api_router.get("/home/work-in-action/items", response_model=List[schemas.WorkInActionItem])
def get_work_in_action_items(db: Session = Depends(get_db), current_user: models.AdminUser = Depends(get_current_active_admin)):
    """Admin: Get ALL items (including inactive) for dashboard management."""
    return crud.get_work_in_action_items(db, active_only=False)

@api_router.post("/home/work-in-action/items", response_model=schemas.WorkInActionItem)
def create_work_in_action_item(
    item: schemas.WorkInActionItemCreate,
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    """Admin: Create a new project reference tag."""
    return crud.create_work_in_action_item(db, item)

@api_router.put("/home/work-in-action/items/{item_id}", response_model=schemas.WorkInActionItem)
def update_work_in_action_item(
    item_id: int,
    item: schemas.WorkInActionItemCreate,
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    """Admin: Update an existing project reference tag."""
    db_item = crud.update_work_in_action_item(db, item_id, item)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@api_router.delete("/home/work-in-action/items/{item_id}")
def delete_work_in_action_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: models.AdminUser = Depends(get_current_active_admin)
):
    """Admin: Delete a project reference tag."""
    db_item = crud.delete_work_in_action_item(db, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted successfully"}


# Include the API router with /api prefix
app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

