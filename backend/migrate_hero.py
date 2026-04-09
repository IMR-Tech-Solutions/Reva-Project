from sqlalchemy import create_engine, text
from database import SQLALCHEMY_DATABASE_URL

def migrate():
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    with engine.connect() as conn:
        print("Migrating home_hero_slides table...")
        try:
            conn.execute(text("ALTER TABLE home_hero_slides ADD COLUMN IF NOT EXISTS media_type VARCHAR(20) DEFAULT 'video'"))
            conn.execute(text("ALTER TABLE home_hero_slides ADD COLUMN IF NOT EXISTS media_url VARCHAR(500)"))
            conn.commit()
            print("Migration successful: added media_type and media_url columns.")
        except Exception as e:
            print(f"Migration error: {e}")

if __name__ == "__main__":
    migrate()
