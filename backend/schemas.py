from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date, datetime

class FeatureBase(BaseModel):
    title: str
    description: str

# Service Schemas
class ServiceBase(BaseModel):
    title: str
    description: str

class ServiceCreate(ServiceBase):
    pass

class Service(ServiceBase):
    id: int
    class Config:
        from_attributes = True

# Product Schemas
class ProductBase(BaseModel):
    title: str
    path: str
    herosub: Optional[str] = None
    herotitle: Optional[str] = None
    paragraph1: Optional[str] = None
    paragraph2: Optional[str] = None
    img: Optional[str] = None
    keysubheading: Optional[str] = None
    features: List[FeatureBase] = []
    applications: List[str] = []

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    class Config:
        from_attributes = True

# News Schemas
class NewsBase(BaseModel):
    image: Optional[str] = None
    category: Optional[str] = None
    title: str
    slug: Optional[str] = None
    short_description: Optional[str] = None
    detailed_description: Optional[str] = None
    published_date: Optional[str] = None

class NewsCreate(NewsBase):
    pass

class News(NewsBase):
    id: int
    class Config:
        from_attributes = True

# Career Position Schemas
class CareerPositionBase(BaseModel):
    title: str
    department: str
    location: Optional[str] = None
    type: str = "Full-Time"
    experience: Optional[str] = None
    description: Optional[str] = None
    skills: List[str] = []
    responsibilities: List[str] = []

class CareerPositionCreate(CareerPositionBase):
    pass

class CareerPosition(CareerPositionBase):
    id: int
    class Config:
        from_attributes = True

# Career Application Schemas
class CareerApplicationBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    position: Optional[str] = None
    experience: Optional[str] = None
    resume: Optional[str] = None
    appliedDate: Optional[str] = None
    status: str = "Pending"

class CareerApplicationCreate(CareerApplicationBase):
    pass

class CareerApplication(CareerApplicationBase):
    id: int
    class Config:
        from_attributes = True

# Contact Message Schemas
class ContactMessageBase(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    date: Optional[str] = None
    is_read: bool = False

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessage(ContactMessageBase):
    id: int
    class Config:
        from_attributes = True

# About Section Schemas
class AboutSectionBase(BaseModel):
    title: str
    content: str

class AboutSectionCreate(AboutSectionBase):
    pass

class AboutSection(AboutSectionBase):
    id: int
    class Config:
        from_attributes = True

# Technology Schemas

class TechnologyBase(BaseModel):
    title: str
    slug: str
    herosub: Optional[str] = None
    herotitle: Optional[str] = None
    paragraph1: Optional[str] = None
    paragraph2: Optional[str] = None
    img: Optional[str] = None
    keysubheading: Optional[str] = None
    features: List[FeatureBase] = []

class TechnologyCreate(TechnologyBase):
    pass

class Technology(TechnologyBase):
    id: int
    class Config:
        from_attributes = True

# Contact Setting Schemas
class ContactSettingBase(BaseModel):
    email_inquiry: Optional[str] = None
    phone_primary: Optional[str] = None
    address_hq: Optional[str] = None
    map_link: Optional[str] = None
    hours_weekday: Optional[str] = None
    hours_saturday: Optional[str] = None
    hours_sunday: Optional[str] = None
    social_linkedin: Optional[str] = None
    social_twitter: Optional[str] = None
    social_facebook: Optional[str] = None
    social_instagram: Optional[str] = None
    markets_served: List[str] = []

class ContactSettingCreate(ContactSettingBase):
    pass

class ContactSetting(ContactSettingBase):
    id: int
    class Config:
        from_attributes = True

# Contact Message Schemas
class ContactMessageBase(BaseModel):
    full_name: str
    company_name: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    project_type: Optional[str] = None
    message_body: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessage(ContactMessageBase):
    id: int
    is_read: bool
    created_at: datetime
    class Config:
        from_attributes = True

# --- About Schemas ---

class TeamMemberBase(BaseModel):
    name: str
    role: str
    bio: Optional[str] = None
    image: Optional[str] = None
    linkedin: Optional[str] = None
    email: Optional[str] = None
    order: int = 0

class TeamMemberCreate(TeamMemberBase):
    pass

class TeamMember(TeamMemberBase):
    id: int
    class Config:
        from_attributes = True

class ValueIndicatorBase(BaseModel):
    title: str
    description: Optional[str] = None
    icon_name: Optional[str] = None
    order: int = 0

class ValueIndicatorCreate(ValueIndicatorBase):
    pass

class ValueIndicator(ValueIndicatorBase):
    id: int
    class Config:
        from_attributes = True

class DifferentiatorBase(BaseModel):
    title: str
    description: Optional[str] = None
    icon_name: Optional[str] = None
    order: int = 0

class DifferentiatorCreate(DifferentiatorBase):
    pass

class Differentiator(DifferentiatorBase):
    id: int
    class Config:
        from_attributes = True

class AboutContentBase(BaseModel):
    hero_title: Optional[str] = None
    hero_subtitle: Optional[str] = None
    hero_description: Optional[str] = None
    hero_year: Optional[str] = None
    hero_image_main: Optional[str] = None
    hero_image_sub: Optional[str] = None
    highlights: List[dict] = []
    core_pills: List[str] = []
    mission_text: Optional[str] = None
    vision_text: Optional[str] = None
    values_title: Optional[str] = None
    values_description: Optional[str] = None
    why_us_title: Optional[str] = None
    why_us_description: Optional[str] = None
    why_us_years_excellence: Optional[str] = None
    why_us_image: Optional[str] = None
    advantages: List[str] = []
    team_title: Optional[str] = None
    team_subtitle: Optional[str] = None

class AboutContentCreate(AboutContentBase):
    pass

class AboutContent(AboutContentBase):
    id: int
    class Config:
        from_attributes = True

# --- Testimonial Schemas ---

class TestimonialBase(BaseModel):
    name: str
    role: Optional[str] = None
    company: Optional[str] = None
    quote: str
    rating: int = 5
    order: int = 0

class TestimonialCreate(TestimonialBase):
    pass

class Testimonial(TestimonialBase):
    id: int
    class Config:
        from_attributes = True

# Combined About Response for public frontend
class AboutFullResponse(BaseModel) :
    content: AboutContent
    team: List[TeamMember]
    values: List[ValueIndicator]
    differentiators: List[Differentiator]
    testimonials: List[Testimonial]

# Home Hero Schemas
class HomeHeroSlideBase(BaseModel):
    small_text: Optional[str] = None
    heading: str
    sub_text: Optional[str] = None
    button_text: Optional[str] = None
    button_link: Optional[str] = None
    media_type: str = "video"
    media_url: Optional[str] = None
    order: int = 0

class HomeHeroSlideCreate(HomeHeroSlideBase):
    pass

class HomeHeroSlide(HomeHeroSlideBase):
    id: int
    class Config:
        from_attributes = True

# Home About Schemas
class HomeAboutContentBase(BaseModel):
    label: Optional[str] = None
    heading: Optional[str] = None
    sub_heading: Optional[str] = None
    description: Optional[str] = None
    highlight_text: Optional[str] = None
    pillars: List[str] = []
    stat_year: Optional[str] = None
    stat_text: Optional[str] = None
    image_main: Optional[str] = None
    image_sub: Optional[str] = None

class HomeAboutContentCreate(HomeAboutContentBase):
    pass

class HomeAboutContent(HomeAboutContentBase):
    id: int
    class Config:
        from_attributes = True

# Strategic Advice Schemas
class StrategicAdviceBase(BaseModel):
    label: Optional[str] = None
    heading: Optional[str] = None
    sub_heading: Optional[str] = None
    description: Optional[str] = None
    features: List[str] = []
    image: Optional[str] = None
    exp_year: Optional[str] = None
    exp_text: Optional[str] = None

class StrategicAdviceCreate(StrategicAdviceBase):
    pass

class StrategicAdvice(StrategicAdviceBase):
    id: int
    class Config:
        from_attributes = True

# --- Auth Schemas ---

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True
    is_admin: bool = True

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserRead

class TokenData(BaseModel):
    email: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Career Page Content Schemas
class CareerContentBase(BaseModel):
    hero_title: Optional[str] = None
    hero_subtitle: Optional[str] = None
    hero_description: Optional[str] = None
    hero_image: Optional[str] = None
    hero_year: Optional[str] = None
    specs: List[dict] = []
    benefits: List[dict] = []
    total_employees: Optional[str] = None
    total_countries: Optional[str] = None
    total_roles: Optional[str] = None

class CareerContentCreate(CareerContentBase):
    pass

class CareerContent(CareerContentBase):
    id: int
    class Config:
        from_attributes = True

# Admin Dashboard Schemas
class AdminDashboardStats(BaseModel):
    total_admins: int
    total_services: int
    total_products: int
    total_technologies: int
    total_news: int
    total_applications: int
    pending_applications: int
    total_messages: int
    unread_messages: int

# Legal Content Schemas
class LegalContentBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    last_updated: Optional[str] = None
    sections: List[dict] = []
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    contact_address: Optional[str] = None

class LegalContentCreate(LegalContentBase):
    pass

class LegalContent(LegalContentBase):
    type: str
    class Config:
        from_attributes = True

# Site Settings Schemas
class SiteSettingsBase(BaseModel):
    site_name: Optional[str] = None
    site_description: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    address: Optional[str] = None
    facebook: Optional[str] = None
    twitter: Optional[str] = None
    linkedin: Optional[str] = None
    instagram: Optional[str] = None

class SiteSettingsCreate(SiteSettingsBase):
    pass

class SiteSettings(SiteSettingsBase):
    id: int
    class Config:
        from_attributes = True
