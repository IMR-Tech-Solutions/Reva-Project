import models
from database import engine

print("Initializing database tables...")
models.Base.metadata.create_all(bind=engine)
print("✓ Database tables initialized.")
