from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from . import models, schemas, crud
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Infrastructure Systems Manager", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Infrastructure Systems Manager API"}

@app.get("/systems/", response_model=List[schemas.System])
def read_systems(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    systems = crud.get_systems(db, skip=skip, limit=limit)
    return systems

@app.post("/systems/", response_model=schemas.System)
def create_system(system: schemas.SystemCreate, db: Session = Depends(get_db)):
    return crud.create_system(db=db, system=system)

@app.get("/systems/{system_id}", response_model=schemas.System)
def read_system(system_id: int, db: Session = Depends(get_db)):
    db_system = crud.get_system(db, system_id=system_id)
    if db_system is None:
        raise HTTPException(status_code=404, detail="System not found")
    return db_system

@app.put("/systems/{system_id}", response_model=schemas.System)
def update_system(system_id: int, system: schemas.SystemCreate, db: Session = Depends(get_db)):
    return crud.update_system(db=db, system_id=system_id, system=system)

@app.delete("/systems/{system_id}")
def delete_system(system_id: int, db: Session = Depends(get_db)):
    crud.delete_system(db=db, system_id=system_id)
    return {"message": "System deleted successfully"}

@app.get("/resources/", response_model=List[schemas.ComputationalResource])
def read_resources(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    resources = crud.get_resources(db, skip=skip, limit=limit)
    return resources

@app.post("/resources/", response_model=schemas.ComputationalResource)
def create_resource(resource: schemas.ComputationalResourceCreate, db: Session = Depends(get_db)):
    return crud.create_resource(db=db, resource=resource)