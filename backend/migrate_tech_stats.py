from sqlalchemy import create_engine, text
from database import SQLALCHEMY_DATABASE_URL

def migrate():
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    with engine.connect() as conn:
        print("Migrating technologies table...")
        try:
            # PostgreSQL syntax: JSON column
            # Check if column exists first to be safe
            conn.execute(text("ALTER TABLE technologies ADD COLUMN IF NOT EXISTS stats JSON DEFAULT '[]'"))
            conn.commit()
            print("Migration successful: added 'stats' column to technologies table.")
        except Exception as e:
            print(f"Migration error: {e}")

if __name__ == "__main__":
    migrate()
