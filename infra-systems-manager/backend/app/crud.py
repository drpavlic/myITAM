from sqlalchemy.orm import Session
from . import models, schemas

def get_system(db: Session, system_id: int):
    return db.query(models.System).filter(models.System.id == system_id).first()

def get_systems(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.System).offset(skip).limit(limit).all()

def create_system(db: Session, system: schemas.SystemCreate):
    db_system = models.System(**system.dict())
    db.add(db_system)
    db.commit()
    db.refresh(db_system)
    return db_system

def update_system(db: Session, system_id: int, system: schemas.SystemCreate):
    db_system = db.query(models.System).filter(models.System.id == system_id).first()
    if db_system:
        for key, value in system.dict().items():
            setattr(db_system, key, value)
        db.commit()
        db.refresh(db_system)
    return db_system

def delete_system(db: Session, system_id: int):
    db_system = db.query(models.System).filter(models.System.id == system_id).first()
    if db_system:
        db.delete(db_system)
        db.commit()
    return db_system

def get_resources(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ComputationalResource).offset(skip).limit(limit).all()

def create_resource(db: Session, resource: schemas.ComputationalResourceCreate):
    db_resource = models.ComputationalResource(**resource.dict())
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource