from sqlalchemy.orm import Session
import models
import schemas

# Career Positions
def get_career_positions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.CareerPosition).offset(skip).limit(limit).all()

def create_career_position(db: Session, position: schemas.CareerPositionCreate):
    db_position = models.CareerPosition(**position.model_dump())
    db.add(db_position)
    db.commit()
    db.refresh(db_position)
    return db_position

def update_career_position(db: Session, position_id: int, position: schemas.CareerPositionCreate):
    db_position = db.query(models.CareerPosition).filter(models.CareerPosition.id == position_id).first()
    if db_position:
        for key, value in position.model_dump().items():
            setattr(db_position, key, value)
        db.commit()
        db.refresh(db_position)
    return db_position

def delete_career_position(db: Session, position_id: int):
    db_position = db.query(models.CareerPosition).filter(models.CareerPosition.id == position_id).first()
    if db_position:
        db.delete(db_position)
        db.commit()
    return db_position

# Career Applications
def get_career_applications(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.CareerApplication).offset(skip).limit(limit).all()

def create_career_application(db: Session, application: schemas.CareerApplicationCreate):
    db_application = models.CareerApplication(**application.model_dump())
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

def update_application_status(db: Session, application_id: int, status: str):
    db_application = db.query(models.CareerApplication).filter(models.CareerApplication.id == application_id).first()
    if db_application:
        db_application.status = status
        db.commit()
        db.refresh(db_application)
    return db_application

def delete_career_application(db: Session, application_id: int):
    db_application = db.query(models.CareerApplication).filter(models.CareerApplication.id == application_id).first()
    if db_application:
        db.delete(db_application)
        db.commit()
    return db_application

# =====================================================================
# SERVICE MODULE CRUD
# =====================================================================
from sqlalchemy.orm import joinedload

# --- Services ---
def get_all_services(db: Session):
    """Admin: all services ordered by display_order"""
    return db.query(models.Service).order_by(models.Service.display_order.asc()).all()

def get_active_services(db: Session):
    """Public: active services only"""
    return db.query(models.Service).filter(models.Service.is_active == True).order_by(models.Service.display_order.asc()).all()

def get_service_by_slug(db: Session, slug: str):
    """Get single service with all sections and items"""
    return db.query(models.Service).options(
        joinedload(models.Service.sections).joinedload(models.ServiceSection.items)
    ).filter(models.Service.slug == slug).first()

def get_service_by_id(db: Session, service_id: int):
    """Get single service by ID with all sections and items"""
    return db.query(models.Service).options(
        joinedload(models.Service.sections).joinedload(models.ServiceSection.items)
    ).filter(models.Service.id == service_id).first()

def create_service(db: Session, service_data: dict):
    db_service = models.Service(**service_data)
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

def update_service(db: Session, service_id: int, service_data: dict):
    db_service = db.query(models.Service).filter(models.Service.id == service_id).first()
    if not db_service:
        return None
    for key, value in service_data.items():
        if value is not None:
            setattr(db_service, key, value)
    db.commit()
    db.refresh(db_service)
    return db_service

def delete_service(db: Session, service_id: int):
    db_service = db.query(models.Service).filter(models.Service.id == service_id).first()
    if db_service:
        db.delete(db_service)
        db.commit()
    return db_service

def reorder_services(db: Session, ordered_ids: list):
    for idx, sid in enumerate(ordered_ids):
        db.query(models.Service).filter(models.Service.id == sid).update({"display_order": idx + 1})
    db.commit()

# --- Service Sections ---
def create_section(db: Session, service_id: int, section_data: dict):
    db_section = models.ServiceSection(service_id=service_id, **section_data)
    db.add(db_section)
    db.commit()
    db.refresh(db_section)
    return db_section

def update_section(db: Session, section_id: int, section_data: dict):
    db_section = db.query(models.ServiceSection).filter(models.ServiceSection.id == section_id).first()
    if not db_section:
        return None
    for key, value in section_data.items():
        if value is not None:
            setattr(db_section, key, value)
    db.commit()
    db.refresh(db_section)
    return db_section

def delete_section(db: Session, section_id: int):
    db_section = db.query(models.ServiceSection).filter(models.ServiceSection.id == section_id).first()
    if db_section:
        db.delete(db_section)
        db.commit()
    return db_section

def reorder_sections(db: Session, service_id: int, ordered_ids: list):
    for idx, sid in enumerate(ordered_ids):
        db.query(models.ServiceSection).filter(
            models.ServiceSection.id == sid,
            models.ServiceSection.service_id == service_id
        ).update({"display_order": idx + 1})
    db.commit()

# --- Section Items ---
def create_item(db: Session, section_id: int, item_data: dict):
    db_item = models.SectionItem(section_id=section_id, **item_data)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_item(db: Session, item_id: int, item_data: dict):
    db_item = db.query(models.SectionItem).filter(models.SectionItem.id == item_id).first()
    if not db_item:
        return None
    for key, value in item_data.items():
        if value is not None:
            setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_item(db: Session, item_id: int):
    db_item = db.query(models.SectionItem).filter(models.SectionItem.id == item_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item

# Products
def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()

def get_product_by_path(db: Session, path: str):
    return db.query(models.Product).filter(models.Product.path == path).first()

def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, product_id: int, product: schemas.ProductCreate):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if db_product:
        for key, value in product.model_dump().items():
            setattr(db_product, key, value)
        db.commit()
        db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: int):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
    return db_product

def get_news(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.NewsArticle).offset(skip).limit(limit).all()

def create_news(db: Session, news: schemas.NewsCreate):
    db_news = models.NewsArticle(**news.model_dump())
    db.add(db_news)
    db.commit()
    db.refresh(db_news)
    return db_news

def update_news(db: Session, news_id: int, news: schemas.NewsCreate):
    db_news = db.query(models.NewsArticle).filter(models.NewsArticle.id == news_id).first()
    if db_news:
        for key, value in news.model_dump().items():
            setattr(db_news, key, value)
        db.commit()
        db.refresh(db_news)
    return db_news

def delete_news(db: Session, news_id: int):
    db_news = db.query(models.NewsArticle).filter(models.NewsArticle.id == news_id).first()
    if db_news:
        db.delete(db_news)
        db.commit()
    return db_news

def get_messages(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ContactMessage).offset(skip).limit(limit).all()

# Technologies
def get_technologies(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Technology).offset(skip).limit(limit).all()

def get_technology_by_slug(db: Session, slug: str):
    return db.query(models.Technology).filter(models.Technology.slug == slug).first()

def get_technology(db: Session, tech_id: int):
    return db.query(models.Technology).filter(models.Technology.id == tech_id).first()

def create_technology(db: Session, tech: schemas.TechnologyCreate):
    db_tech = models.Technology(**tech.model_dump())
    db.add(db_tech)
    db.commit()
    db.refresh(db_tech)
    return db_tech

def update_technology(db: Session, tech_id: int, tech: schemas.TechnologyCreate):
    db_tech = db.query(models.Technology).filter(models.Technology.id == tech_id).first()
    if db_tech:
        for key, value in tech.model_dump().items():
            setattr(db_tech, key, value)
        db.commit()
        db.refresh(db_tech)
    return db_tech

def delete_technology(db: Session, tech_id: int):
    db_tech = db.query(models.Technology).filter(models.Technology.id == tech_id).first()
    if db_tech:
        db.delete(db_tech)
        db.commit()
    return db_tech

# --- Contact Settings API ---
def get_contact_settings(db: Session):
    return db.query(models.ContactSetting).first()

def update_contact_settings(db: Session, settings: schemas.ContactSettingCreate):
    db_settings = db.query(models.ContactSetting).first()
    if db_settings:
        for key, value in settings.model_dump().items():
            setattr(db_settings, key, value)
        db.commit()
        db.refresh(db_settings)
        return db_settings
    else:
        new_settings = models.ContactSetting(**settings.model_dump())
        db.add(new_settings)
        db.commit()
        db.refresh(new_settings)
        return new_settings

# --- Contact Messages API ---
def create_contact_message(db: Session, message: schemas.ContactMessageCreate):
    db_message = models.ContactMessage(**message.model_dump())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_contact_messages(db: Session):
    return db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).all()

def mark_message_read(db: Session, message_id: int):
    db_message = db.query(models.ContactMessage).filter(models.ContactMessage.id == message_id).first()
    if db_message:
        db_message.is_read = True
        db.commit()
        db.refresh(db_message)
    return db_message

def delete_contact_message(db: Session, message_id: int):
    db_message = db.query(models.ContactMessage).filter(models.ContactMessage.id == message_id).first()
    if db_message:
        db.delete(db_message)
        db.commit()
    return db_message

# --- About Content CRUD ---
def get_about_content(db: Session):
    return db.query(models.AboutContent).first()

def update_about_content(db: Session, about: schemas.AboutContentCreate):
    db_about = db.query(models.AboutContent).first()
    if db_about:
        for key, value in about.model_dump().items():
            if value is not None:
                setattr(db_about, key, value)
        db.commit()
        db.refresh(db_about)
        return db_about
    else:
        new_about = models.AboutContent(**about.model_dump())
        db.add(new_about)
        db.commit()
        db.refresh(new_about)
        return new_about

# Team Members
def get_team_members(db: Session):
    return db.query(models.TeamMember).order_by(models.TeamMember.order.asc()).all()

def create_team_member(db: Session, member: schemas.TeamMemberCreate):
    db_member = models.TeamMember(**member.model_dump())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member

def update_team_member(db: Session, member_id: int, member: schemas.TeamMemberCreate):
    db_member = db.query(models.TeamMember).filter(models.TeamMember.id == member_id).first()
    if db_member:
        for key, value in member.model_dump().items():
            if value is not None:
                setattr(db_member, key, value)
        db.commit()
        db.refresh(db_member)
        return db_member
    return None

def delete_team_member(db: Session, member_id: int):
    db_member = db.query(models.TeamMember).filter(models.TeamMember.id == member_id).first()
    if db_member:
        db.delete(db_member)
        db.commit()
    return db_member

# Company Values
def get_company_values(db: Session):
    return db.query(models.CompanyValueIndicator).order_by(models.CompanyValueIndicator.order.asc()).all()

def create_company_value(db: Session, val: schemas.ValueIndicatorCreate):
    db_val = models.CompanyValueIndicator(**val.model_dump())
    db.add(db_val)
    db.commit()
    db.refresh(db_val)
    return db_val

def update_company_value(db: Session, val_id: int, val: schemas.ValueIndicatorCreate):
    db_val = db.query(models.CompanyValueIndicator).filter(models.CompanyValueIndicator.id == val_id).first()
    if db_val:
        for key, value in val.model_dump().items():
            if value is not None:
                setattr(db_val, key, value)
        db.commit()
        db.refresh(db_val)
        return db_val
    return None

def delete_company_value(db: Session, val_id: int):
    db_val = db.query(models.CompanyValueIndicator).filter(models.CompanyValueIndicator.id == val_id).first()
    if db_val:
        db.delete(db_val)
        db.commit()
    return db_val

# Differentiators
def get_differentiators(db: Session):
    return db.query(models.DifferentiatorCard).order_by(models.DifferentiatorCard.order.asc()).all()

def create_differentiator(db: Session, diff: schemas.DifferentiatorCreate):
    db_diff = models.DifferentiatorCard(**diff.model_dump())
    db.add(db_diff)
    db.commit()
    db.refresh(db_diff)
    return db_diff

def update_differentiator(db: Session, diff_id: int, diff: schemas.DifferentiatorCreate):
    db_diff = db.query(models.DifferentiatorCard).filter(models.DifferentiatorCard.id == diff_id).first()
    if db_diff:
        for key, value in diff.model_dump().items():
            if value is not None:
                setattr(db_diff, key, value)
        db.commit()
        db.refresh(db_diff)
        return db_diff
    return None

def delete_differentiator(db: Session, diff_id: int):
    db_diff = db.query(models.DifferentiatorCard).filter(models.DifferentiatorCard.id == diff_id).first()
    if db_diff:
        db.delete(db_diff)
        db.commit()
    return db_diff

# --- Testimonials CRUD ---
def get_testimonials(db: Session):
    return db.query(models.Testimonial).order_by(models.Testimonial.order.asc()).all()

def create_testimonial(db: Session, testimonial: schemas.TestimonialCreate):
    db_testimonial = models.Testimonial(**testimonial.model_dump())
    db.add(db_testimonial)
    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial

def update_testimonial(db: Session, testimonial_id: int, testimonial: schemas.TestimonialCreate):
    db_testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == testimonial_id).first()
    if db_testimonial:
        for key, value in testimonial.model_dump().items():
            if value is not None:
                setattr(db_testimonial, key, value)
        db.commit()
        db.refresh(db_testimonial)
        return db_testimonial
    return None

def delete_testimonial(db: Session, testimonial_id: int):
    db_testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == testimonial_id).first()
    if db_testimonial:
        db.delete(db_testimonial)
        db.commit()
    return db_testimonial

# --- Home Hero Slides CRUD ---
def get_home_hero_slides(db: Session):
    return db.query(models.HomeHeroSlide).order_by(models.HomeHeroSlide.order.asc()).all()

def create_home_hero_slide(db: Session, slide: schemas.HomeHeroSlideCreate):
    db_slide = models.HomeHeroSlide(**slide.model_dump())
    db.add(db_slide)
    db.commit()
    db.refresh(db_slide)
    return db_slide

def update_home_hero_slide(db: Session, slide_id: int, slide: schemas.HomeHeroSlideCreate):
    db_slide = db.query(models.HomeHeroSlide).filter(models.HomeHeroSlide.id == slide_id).first()
    if db_slide:
        for key, value in slide.model_dump().items():
            if value is not None:
                setattr(db_slide, key, value)
        db.commit()
        db.refresh(db_slide)
        return db_slide
    return None

def delete_home_hero_slide(db: Session, slide_id: int):
    db_slide = db.query(models.HomeHeroSlide).filter(models.HomeHeroSlide.id == slide_id).first()
    if db_slide:
        db.delete(db_slide)
        db.commit()
    return db_slide

# --- Home About Content CRUD ---
def get_home_about_content(db: Session):
    return db.query(models.HomeAboutContent).first()

def update_home_about_content(db: Session, about: schemas.HomeAboutContentCreate):
    db_about = db.query(models.HomeAboutContent).first()
    if db_about:
        for key, value in about.model_dump().items():
            if value is not None:
                setattr(db_about, key, value)
        db.commit()
        db.refresh(db_about)
        return db_about
    else:
        new_about = models.HomeAboutContent(**about.model_dump())
        db.add(new_about)
        db.commit()
        db.refresh(new_about)
        return new_about

# --- Admin User CRUD ---

def get_user_by_email(db: Session, email: str):
    return db.query(models.AdminUser).filter(models.AdminUser.email == email).first()

def create_admin_user(db: Session, user: schemas.UserCreate):
    from auth_utils import get_password_hash
    hashed_password = get_password_hash(user.password)
    db_user = models.AdminUser(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password,
        is_active=user.is_active,
        is_admin=user.is_admin
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Admin Dashboard Stats
def get_admin_dashboard_stats(db: Session):
    return {
        "total_admins": db.query(models.AdminUser).count(),
        "total_services": db.query(models.Service).count(),
        "total_products": db.query(models.Product).count(),
        "total_technologies": db.query(models.Technology).count(),
        "total_news": db.query(models.NewsArticle).count(),
        "total_applications": db.query(models.CareerApplication).count(),
        "pending_applications": db.query(models.CareerApplication).filter(models.CareerApplication.status == "Pending").count(),
        "total_messages": db.query(models.ContactMessage).count(),
        "unread_messages": db.query(models.ContactMessage).filter(models.ContactMessage.is_read == False).count()
    }

# Career Page Content CRUD
def get_career_content(db: Session):
    content = db.query(models.CareerPageContent).first()
    if not content:
        # Create default if not exists
        content = models.CareerPageContent(
            hero_title="Build Your Career in Process Engineering",
            hero_subtitle="Careers at REVA",
            hero_description="Work on mission-critical refinery projects with a team that treats process engineering like precision manufacturing.",
            hero_year="2014",
            specs=[
                {"label": "Domains", "value": "Refinery · Petrochem"},
                {"label": "Projects", "value": "EPCCM · BEP"},
                {"label": "Locations", "value": "Pune · Mumbai"}
            ],
            benefits=[
                {"text": "45+ Countries"},
                {"text": "Diverse Teams"},
                {"text": "Impactful Projects"},
                {"text": "Career Growth"}
            ],
            total_employees="5000+",
            total_countries="45+",
            total_roles="100+"
        )
        db.add(content)
        db.commit()
        db.refresh(content)
    return content

def update_career_content(db: Session, content_update: schemas.CareerContentCreate):
    db_content = get_career_content(db)
    update_data = content_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_content, key, value)
    db.commit()
    db.refresh(db_content)
    return db_content

# --- Strategic Advice CRUD ---
def get_strategic_advice(db: Session):
    return db.query(models.StrategicAdvice).first()

def update_strategic_advice(db: Session, advice: schemas.StrategicAdviceCreate):
    db_advice = db.query(models.StrategicAdvice).first()
    if db_advice:
        for key, value in advice.model_dump().items():
            if value is not None:
                setattr(db_advice, key, value)
        db.commit()
        db.refresh(db_advice)
        return db_advice
    else:
        new_advice = models.StrategicAdvice(**advice.model_dump())
        db.add(new_advice)
        db.commit()
        db.refresh(new_advice)
        return new_advice

# --- Legal Content CRUD ---
def get_legal_content(db: Session, type: str):
    return db.query(models.LegalContent).filter(models.LegalContent.type == type).first()

def update_legal_content(db: Session, type: str, data: schemas.LegalContentCreate):
    db_content = db.query(models.LegalContent).filter(models.LegalContent.type == type).first()
    if db_content:
        update_data = data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_content, key, value)
        db.commit()
        db.refresh(db_content)
        return db_content
    else:
        new_content = models.LegalContent(type=type, **data.model_dump())
        db.add(new_content)
        db.commit()
        db.refresh(new_content)
        return new_content

# --- Site Settings CRUD ---
def get_site_settings(db: Session):
    settings = db.query(models.SiteSettings).first()
    if not settings:
        # Create default settings if not exists
        settings = models.SiteSettings(
            site_name="Reva Process Technologies",
            contact_email="info@reva.com"
        )
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings

def update_site_settings(db: Session, data: schemas.SiteSettingsCreate):
    db_settings = get_site_settings(db)
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_settings, key, value)
    db.commit()
    db.refresh(db_settings)
    return db_settings

# =====================================================================
# WHAT SETS US APART CRUD
# =====================================================================

def get_wsua_content(db: Session):
    content = db.query(models.WhatSetsUsApartContent).first()
    if not content:
        content = models.WhatSetsUsApartContent(
            label="WHY CHOOSE REVA",
            heading="What Sets Us Apart?",
            description="At REVA Process Technologies, we stand out through engineering excellence, execution capabilities, industry expertise, and reliable process solutions tailored to evolving industrial requirements."
        )
        db.add(content)
        db.commit()
        db.refresh(content)
    return content

def update_wsua_content(db: Session, data: schemas.WhatSetsUsApartContentCreate):
    db_content = get_wsua_content(db)
    for key, value in data.model_dump().items():
        if value is not None:
            setattr(db_content, key, value)
    db.commit()
    db.refresh(db_content)
    return db_content

def get_wsua_items(db: Session, active_only: bool = False):
    query = db.query(models.WhatSetsUsApartItem)
    if active_only:
        query = query.filter(models.WhatSetsUsApartItem.is_active == True)
    return query.order_by(models.WhatSetsUsApartItem.order.asc()).all()

def create_wsua_item(db: Session, item: schemas.WhatSetsUsApartItemCreate):
    db_item = models.WhatSetsUsApartItem(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_wsua_item(db: Session, item_id: int, item: schemas.WhatSetsUsApartItemCreate):
    db_item = db.query(models.WhatSetsUsApartItem).filter(models.WhatSetsUsApartItem.id == item_id).first()
    if db_item:
        for key, value in item.model_dump().items():
            if value is not None:
                setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
        return db_item
    return None

def delete_wsua_item(db: Session, item_id: int):
    db_item = db.query(models.WhatSetsUsApartItem).filter(models.WhatSetsUsApartItem.id == item_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item

# =====================================================================
# WORK IN ACTION CRUD
# =====================================================================

def get_work_in_action_content(db: Session):
    content = db.query(models.WorkInActionContent).first()
    if not content:
        content = models.WorkInActionContent(
            label="Our Projects In Action",
            heading1="Proven credentials.",
            heading2="Real-world delivery.",
            description="Documented project references across India and international markets — covering basic & detailed engineering, process design, FEED, and supply of key equipment for leading public and private sector clients.",
            image="./hero3.png",
            scope_title="Scope Coverage",
            scope_content="Basic & Detailed Engineering · FEED · Process Design · Key Equipment Supply · Site Execution",
            stats=[
                {"number": 2014, "suffix": "", "label": "Established", "color": "text-primary"},
                {"number": 50, "suffix": "+", "label": "Projects Delivered", "color": "text-secondary"},
                {"number": 10, "suffix": "+", "label": "Countries Served", "color": "text-accent"}
            ]
        )
        db.add(content)
        db.commit()
        db.refresh(content)
    return content

def update_work_in_action_content(db: Session, data: schemas.WorkInActionContentCreate):
    db_content = get_work_in_action_content(db)
    for key, value in data.model_dump().items():
        if value is not None:
            setattr(db_content, key, value)
    db.commit()
    db.refresh(db_content)
    return db_content

def get_work_in_action_items(db: Session, active_only: bool = False):
    query = db.query(models.WorkInActionItem)
    if active_only:
        query = query.filter(models.WorkInActionItem.is_active == True)
    return query.order_by(models.WorkInActionItem.order.asc()).all()

def create_work_in_action_item(db: Session, item: schemas.WorkInActionItemCreate):
    db_item = models.WorkInActionItem(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_work_in_action_item(db: Session, item_id: int, item: schemas.WorkInActionItemCreate):
    db_item = db.query(models.WorkInActionItem).filter(models.WorkInActionItem.id == item_id).first()
    if db_item:
        for key, value in item.model_dump().items():
            if value is not None:
                setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
        return db_item
    return None

def delete_work_in_action_item(db: Session, item_id: int):
    db_item = db.query(models.WorkInActionItem).filter(models.WorkInActionItem.id == item_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item

# =====================================================================
# BIOREMEDIATION CRUD
# =====================================================================

def get_bioremediation_content(db: Session):
    content = db.query(models.BioremediationContent).first()
    if not content:
        content = models.BioremediationContent()
        db.add(content)
        db.commit()
        db.refresh(content)
    return content

def update_bioremediation_content(db: Session, data: schemas.BioremediationContentCreate):
    db_content = get_bioremediation_content(db)
    for key, value in data.model_dump().items():
        if value is not None:
            setattr(db_content, key, value)
    db.commit()
    db.refresh(db_content)
    return db_content

# --- Generic Item CRUD (works for all bioremediation item tables) ---

def get_bio_items(db: Session, model_class, active_only: bool = False):
    query = db.query(model_class)
    if active_only:
        query = query.filter(model_class.is_active == True)
    return query.order_by(model_class.order.asc()).all()

def create_bio_item(db: Session, model_class, item_data: dict):
    # Filter item_data to only include keys that exist in the model
    model_columns = {c.name for c in model_class.__table__.columns}
    filtered_data = {k: v for k, v in item_data.items() if k in model_columns}
    
    db_item = model_class(**filtered_data)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_bio_item(db: Session, model_class, item_id: int, item_data: dict):
    db_item = db.query(model_class).filter(model_class.id == item_id).first()
    if not db_item:
        return None
    
    # Filter item_data to only include keys that exist in the model
    model_columns = {c.name for c in model_class.__table__.columns}
    
    for key, value in item_data.items():
        if key in model_columns and value is not None:
            setattr(db_item, key, value)
    
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_bio_item(db: Session, model_class, item_id: int):
    db_item = db.query(model_class).filter(model_class.id == item_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item

