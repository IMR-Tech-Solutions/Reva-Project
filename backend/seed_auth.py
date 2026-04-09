from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
import schemas
import crud
from auth_utils import get_password_hash

def seed_admin():
    db = SessionLocal()
    try:
        # Check if admin already exists
        admin_email = "admin@reva.com"
        db_admin = crud.get_user_by_email(db, email=admin_email)
        
        if db_admin:
            print(f"Admin with email {admin_email} already exists.")
            return

        print(f"Creating default admin user: {admin_email}")
        
        # Create default admin
        admin_user = schemas.UserCreate(
            email=admin_email,
            full_name="System Admin",
            password="adminpassword123", # User should change this after first login
            is_active=True,
            is_admin=True
        )
        
        crud.create_admin_user(db, admin_user)
        print("✓ Default admin user created successfully.")
        print("Credentials:")
        print(f"  Email: {admin_email}")
        print("  Password: adminpassword123")
        
    except Exception as e:
        print(f"Error seeding admin: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    # Ensure tables are created
    models.Base.metadata.create_all(bind=engine)
    seed_admin()
