from sqlalchemy import Column, Integer, String, Text, Boolean, Float, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime

# =====================================================================
# SERVICE MODULE — 3-table architecture
# =====================================================================

class Service(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(150), unique=True, index=True, nullable=False)
    tagline = Column(String(255))
    description = Column(Text)
    icon_name = Column(String(100))
    number = Column(String(10))
    href = Column(String(200))
    tags = Column(JSON, default=list)

    # Hero / Banner
    hero_breadcrumb = Column(String(255))
    hero_title = Column(String(255))
    hero_highlight = Column(String(255))
    hero_description = Column(Text)
    hero_pills = Column(JSON, default=list)
    hero_image = Column(String(500))
    hero_stat_title = Column(String(255))
    hero_stat_text = Column(String(255))
    hero_cta1_text = Column(String(150))
    hero_cta1_link = Column(String(255))
    hero_cta2_text = Column(String(150))
    hero_cta2_link = Column(String(255))

    # Display
    is_active = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)

    # Relationships
    sections = relationship("ServiceSection", back_populates="service", cascade="all, delete-orphan", order_by="ServiceSection.display_order")


class ServiceSection(Base):
    __tablename__ = "service_sections"
    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, ForeignKey("services.id", ondelete="CASCADE"), nullable=False)
    section_key = Column(String(100))
    section_label = Column(String(200))
    title = Column(String(255))
    title_highlight = Column(String(255))
    description = Column(Text)
    image = Column(String(500))
    extra_data = Column(JSON, default=dict)
    display_order = Column(Integer, default=0)

    # Relationships
    service = relationship("Service", back_populates="sections")
    items = relationship("SectionItem", back_populates="section", cascade="all, delete-orphan", order_by="SectionItem.display_order")


class SectionItem(Base):
    __tablename__ = "section_items"
    id = Column(Integer, primary_key=True, index=True)
    section_id = Column(Integer, ForeignKey("service_sections.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255))
    description = Column(Text)
    icon_name = Column(String(100))
    image = Column(String(500))
    step_number = Column(String(10))
    extra_data = Column(JSON, default=dict)
    display_order = Column(Integer, default=0)

    # Relationships
    section = relationship("ServiceSection", back_populates="items")

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    path = Column(String(150), unique=True, index=True)
    herosub = Column(String(255))
    herotitle = Column(String(255))
    paragraph1 = Column(Text)
    paragraph2 = Column(Text)
    img = Column(Text)
    keysubheading = Column(Text)
    features = Column(JSON)
    applications = Column(JSON)
    reactor_types = Column(JSON, default=list)
    stats = Column(JSON, default=list)

class NewsArticle(Base):
    __tablename__ = "news"
    id = Column(Integer, primary_key=True, index=True)
    image = Column(String(500), nullable=True)
    category = Column(String(50))
    title = Column(String(150), nullable=False)
    slug = Column(String(200), unique=True, index=True)
    short_description = Column(Text)
    detailed_description = Column(Text)
    published_date = Column(String(20))

class CareerPosition(Base):
    __tablename__ = "career_positions"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    department = Column(String(100), nullable=False)
    location = Column(String(100))
    type = Column(String(50), default="Full-Time")
    experience = Column(String(50))
    description = Column(Text)
    skills = Column(JSON) # List of strings
    responsibilities = Column(JSON) # List of strings

class CareerApplication(Base):
    __tablename__ = "career_applications"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(20))
    position = Column(String(100))
    experience = Column(String(50))
    resume = Column(String(255))
    appliedDate = Column(String(20), default=lambda: datetime.date.today().isoformat())
    status = Column(String(20), default="Pending")


class AboutContent(Base):
    __tablename__ = "about_contents"
    id = Column(Integer, primary_key=True, index=True)
    # Hero Section
    hero_title = Column(String(255))
    hero_subtitle = Column(String(255))
    hero_description = Column(Text)
    hero_year = Column(String(50))
    hero_image_main = Column(String(500))
    hero_image_sub = Column(String(500))
    highlights = Column(JSON, default=list) # [{label, desc}]
    core_pills = Column(JSON, default=list) # [string]

    # Mission & Vision
    mission_text = Column(Text)
    vision_text = Column(Text)

    # Core Values Section
    values_title = Column(String(255))
    values_description = Column(Text)

    # Why Choose Us Section
    why_us_title = Column(String(255))
    why_us_description = Column(Text)
    why_us_years_excellence = Column(String(50))
    why_us_image = Column(String(500))
    advantages = Column(JSON, default=list) # [string]
    team_title = Column(String(255))
    team_subtitle = Column(Text)

class TeamMember(Base):
    __tablename__ = "team_members"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    role = Column(String(150), nullable=False)
    bio = Column(Text)
    image = Column(String(500))
    linkedin = Column(String(255))
    email = Column(String(150))
    order = Column(Integer, default=0)

class CompanyValueIndicator(Base):
    __tablename__ = "company_value_indicators"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text)
    icon_name = Column(String(100)) # Store react-icon-fi name
    order = Column(Integer, default=0)

class DifferentiatorCard(Base):
    __tablename__ = "differentiator_cards"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text)
    icon_name = Column(String(100)) # Store react-icon-fi name
    order = Column(Integer, default=0)

class Technology(Base):
    __tablename__ = "technologies"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    slug = Column(String(150), unique=True, index=True)
    herosub = Column(String(255))
    herotitle = Column(String(255))
    paragraph1 = Column(Text)
    paragraph2 = Column(Text)
    img = Column(Text)
    keysubheading = Column(Text)
    features = Column(JSON)
    stats = Column(JSON, default=list) # List of {label, value}

class ContactSetting(Base):
    __tablename__ = "contact_settings"
    id = Column(Integer, primary_key=True, index=True)
    email_inquiry = Column(String(150))
    phone_primary = Column(String(50))
    address_hq = Column(Text)
    map_link = Column(Text)
    hours_weekday = Column(String(100))
    hours_saturday = Column(String(100))
    hours_sunday = Column(String(100))
    social_linkedin = Column(String(200))
    social_twitter = Column(String(200))
    social_facebook = Column(String(200))
    social_instagram = Column(String(200))
    markets_served = Column(JSON, default=list)

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(150), nullable=False)
    company_name = Column(String(150))
    email = Column(String(150), nullable=False)
    phone = Column(String(50))
    project_type = Column(String(150))
    message_body = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Testimonial(Base):
    __tablename__ = "testimonials"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    role = Column(String(150))
    company = Column(String(150))
    quote = Column(Text, nullable=False)
    rating = Column(Integer, default=5)
    order = Column(Integer, default=0)

class HomeHeroSlide(Base):
    __tablename__ = "home_hero_slides"
    id = Column(Integer, primary_key=True, index=True)
    small_text = Column(String(255))
    heading = Column(String(255))
    sub_text = Column(Text)
    button_text = Column(String(100))
    button_link = Column(String(255))
    media_type = Column(String(20), default="video") # 'image' or 'video'
    media_url = Column(String(500), nullable=True)
    order = Column(Integer, default=0)

class HomeAboutContent(Base):
    __tablename__ = "home_about_contents"
    id = Column(Integer, primary_key=True, index=True)
    label = Column(String(255))
    heading = Column(String(255))
    sub_heading = Column(String(255))
    description = Column(Text)
    highlight_text = Column(Text)
    pillars = Column(JSON, default=list) # List of strings
    stat_year = Column(String(50))
    stat_text = Column(String(255))
    image_main = Column(String(500))
    image_sub = Column(String(500))

class StrategicAdvice(Base):
    __tablename__ = "strategic_advice"
    id = Column(Integer, primary_key=True, index=True)
    label = Column(String(255))
    heading = Column(String(255))
    sub_heading = Column(String(255))
    description = Column(Text)
    features = Column(JSON, default=list) # List of strings
    image = Column(String(500))
    exp_year = Column(String(50))
    exp_text = Column(String(255))

class AdminUser(Base):
    __tablename__ = "admin_users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(150))
    email = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class CareerPageContent(Base):
    __tablename__ = "career_page_contents"
    id = Column(Integer, primary_key=True, index=True)
    hero_title = Column(String(255))
    hero_subtitle = Column(String(255))
    hero_description = Column(Text)
    hero_image = Column(String(500))
    hero_year = Column(String(50))
    # Specs: [{label, value}]
    specs = Column(JSON, default=list) 
    # Benefits: [{icon, text}] (Home page Join Team section)
    benefits = Column(JSON, default=list)
    # Stats (Home page badge)
    total_employees = Column(String(50))
    total_countries = Column(String(50))
    total_roles = Column(String(50))

class LegalContent(Base):
    __tablename__ = "legal_contents"
    # type: 'privacy' or 'terms'
    type = Column(String(50), primary_key=True)
    title = Column(String(255))
    description = Column(Text)
    last_updated = Column(String(100))
    sections = Column(JSON, default=list) # List of {title, content: [para1, para2]}
    contact_email = Column(String(255))
    contact_phone = Column(String(255))
    contact_address = Column(Text)

class SiteSettings(Base):
    __tablename__ = "site_settings"
    id = Column(Integer, primary_key=True, index=True)
    site_name = Column(String(255), default="Reva Process Technologies")
    site_description = Column(Text)
    contact_email = Column(String(255))
    contact_phone = Column(String(255))
    address = Column(Text)
    facebook = Column(String(500))
    twitter = Column(String(500))
    linkedin = Column(String(500))
    instagram = Column(String(500))
